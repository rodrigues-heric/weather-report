package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type CityMessage struct {
	CityName string `json:"city_name"`
	UserID   string `json:"user_id"`
}

type Forecast struct {
	Date           string  `bson:"date"`
	Condition      string  `bson:"condition"`
	MinTemperature float64 `bson:"minTemperature"`
	MaxTemperature float64 `bson:"maxTemperature"`
}

type Hourly struct {
	Time      string  `bson:"time"`
	Condition string  `bson:"condition"`
	Temperature float64 `bson:"temperature"`
}

type CityDocument struct {
	Name         string     `bson:"name"`
	State        string     `bson:"state"`
	Country      string     `bson:"country"`
	Temperature  float64    `bson:"temperature"`
	Condition    string     `bson:"condition"`
	MinTemperature float64  `bson:"minTemperature"`
	MaxTemperature float64  `bson:"maxTemperature"`
	FeelsLike    float64    `bson:"feelsLike"`
	Humidity     int        `bson:"humidity"`
	Pressure     float64    `bson:"pressure"`
	Visibility   float64    `bson:"visibility"`
	WindSpeed    float64    `bson:"windSpeed"`
	UVIndex      float64    `bson:"uvIndex"`
	CreatedAt    time.Time  `bson:"createdAt,omitempty"`
	UpdatedAt    time.Time  `bson:"updatedAt,omitempty"`
	Forecast     []Forecast `bson:"forecast,omitempty"`
	Hourly       []Hourly   `bson:"hourly,omitempty"`
	Sunrise      string     `bson:"sunrise,omitempty"`
	Sunset       string     `bson:"sunset,omitempty"`
}

func main() {
	rabbitConn, err := amqp.Dial("amqp://guest:guest@rabbitmq:5672/")
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %v", err)
	}
	defer rabbitConn.Close()

	ch, err := rabbitConn.Channel()
	if err != nil {
		log.Fatalf("Failed to open a channel: %v", err)
	}
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"favorite_cities", // name
		false,             // durable
		false,             // delete when unused
		false,             // exclusive
		false,             // no-wait
		nil,               // arguments
	)
	if err != nil {
		log.Fatalf("Failed to declare a queue: %v", err)
	}

	// Connect to MongoDB
	mongoClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://root:rootpassword@mongo:27017"))
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer func() {
		if err = mongoClient.Disconnect(context.TODO()); err != nil {
			log.Fatalf("Failed to disconnect MongoDB: %v", err)
		}
	}()

	collection := mongoClient.Database("meu_banco_teste").Collection("cities")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	if err != nil {
		log.Fatalf("Failed to register a consumer: %v", err)
	}

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			var msg CityMessage
			if err := json.Unmarshal(d.Body, &msg); err != nil {
				log.Printf("Error unmarshaling message: %v", err)
				continue
			}
			log.Printf("Received a message: %s", msg.CityName)

			// Start fetching weather data periodically
			go fetchWeatherPeriodically(msg.CityName, collection)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}

func fetchWeatherPeriodically(cityName string, collection *mongo.Collection) {
	// Do an immediate fetch when starting, then schedule periodic fetches
	log.Printf("Starting periodic fetch for %s", cityName)
	data, err := fetchWeatherData(cityName)
	if err != nil {
		log.Printf("Initial fetch error for %s: %v", cityName, err)
	} else {
		if err := upsertCityDocument(collection, data); err != nil {
			log.Printf("Error upserting initial weather data: %v", err)
		} else {
			log.Printf("Upserted initial weather data for %s", cityName)
		}
	}

	ticker := time.NewTicker(1 * time.Hour) 
	defer ticker.Stop()

	for range ticker.C {
		log.Printf("Fetching periodic weather for %s", cityName)
		data, err := fetchWeatherData(cityName)
		if err != nil {
			log.Printf("Error fetching weather for %s: %v", cityName, err)
			continue
		}
		if err := upsertCityDocument(collection, data); err != nil {
			log.Printf("Error upserting weather data: %v", err)
		} else {
			log.Printf("Upserted weather data for %s", cityName)
		}
	}
}

func fetchWeatherData(cityName string) (*CityDocument, error) {
	// Fetch coordinates
	coordURL := fmt.Sprintf("https://geocoding-api.open-meteo.com/v1/search?name=%s&count=1&format=json", url.QueryEscape(cityName))
	resp, err := http.Get(coordURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var coordResp struct {
		Results []struct {
			Latitude  float64 `json:"latitude"`
			Longitude float64 `json:"longitude"`
			Country   string  `json:"country"`
			Admin1    string  `json:"admin1"`
		} `json:"results"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&coordResp); err != nil {
		return nil, err
	}
	if len(coordResp.Results) == 0 {
		return nil, fmt.Errorf("city not found")
	}
	lat := coordResp.Results[0].Latitude
	lon := coordResp.Results[0].Longitude
	country := coordResp.Results[0].Country
	admin1 := coordResp.Results[0].Admin1

	// Fetch weather data: include current_weather, hourly and daily parameters to populate City schema
	weatherURL := fmt.Sprintf("https://api.open-meteo.com/v1/forecast?latitude=%f&longitude=%f&current_weather=true&hourly=temperature_2m,relativehumidity_2m,pressure_msl,visibility,windspeed_10m,weathercode,uv_index&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&timezone=auto", lat, lon)
	resp, err = http.Get(weatherURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("weather API returned status %d", resp.StatusCode)
	}

	var weatherResp struct {
		CurrentWeather struct {
			Temperature float64 `json:"temperature"`
			WeatherCode int     `json:"weathercode"`
			Time        string  `json:"time"`
			Windspeed   float64 `json:"windspeed"`
		} `json:"current_weather"`
		Hourly struct {
			Time                 []string  `json:"time"`
			Temperature2m        []float64 `json:"temperature_2m"`
			RelativeHumidity2m   []float64 `json:"relativehumidity_2m"`
			PressureMsl          []float64 `json:"pressure_msl"`
			Visibility           []float64 `json:"visibility"`
			Windspeed10m         []float64 `json:"windspeed_10m"`
			Weathercode          []int     `json:"weathercode"`
			UVIndex              []float64 `json:"uv_index"`
		} `json:"hourly"`
		Daily struct {
			Time               []string  `json:"time"`
			Temperature2mMax   []float64 `json:"temperature_2m_max"`
			Temperature2mMin   []float64 `json:"temperature_2m_min"`
			Weathercode        []int     `json:"weathercode"`
			Sunrise            []string  `json:"sunrise"`
			Sunset             []string  `json:"sunset"`
		} `json:"daily"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&weatherResp); err != nil {
		return nil, err
	}

	// Find index in hourly that matches current time
	idx := -1
	curTime := weatherResp.CurrentWeather.Time
	for i, t := range weatherResp.Hourly.Time {
		if t == curTime {
			idx = i
			break
		}
	}

	var humidity int
	var pressure, visibility, windSpeed, uvIndex float64
	if idx >= 0 {
		if idx < len(weatherResp.Hourly.RelativeHumidity2m) {
			humidity = int(weatherResp.Hourly.RelativeHumidity2m[idx])
		}
		if idx < len(weatherResp.Hourly.PressureMsl) {
			pressure = weatherResp.Hourly.PressureMsl[idx]
		}
		if idx < len(weatherResp.Hourly.Visibility) {
			visibility = weatherResp.Hourly.Visibility[idx]
		}
		if idx < len(weatherResp.Hourly.Windspeed10m) {
			windSpeed = weatherResp.Hourly.Windspeed10m[idx]
		}
		if idx < len(weatherResp.Hourly.UVIndex) {
			uvIndex = weatherResp.Hourly.UVIndex[idx]
		}
	}

	condition := interpretWMOCode(weatherResp.CurrentWeather.WeatherCode)

	// Build forecast array
	forecasts := make([]Forecast, 0, len(weatherResp.Daily.Time))
	for i, d := range weatherResp.Daily.Time {
		var minT, maxT float64
		if i < len(weatherResp.Daily.Temperature2mMin) {
			minT = weatherResp.Daily.Temperature2mMin[i]
		}
		if i < len(weatherResp.Daily.Temperature2mMax) {
			maxT = weatherResp.Daily.Temperature2mMax[i]
		}
		var cond string
		if i < len(weatherResp.Daily.Weathercode) {
			cond = interpretWMOCode(weatherResp.Daily.Weathercode[i])
		}
		forecasts = append(forecasts, Forecast{
			Date:           d,
			Condition:      cond,
			MinTemperature: minT,
			MaxTemperature: maxT,
		})
	}

	// Build hourly array (limit to first 24 entries to avoid huge docs)
	hourly := make([]Hourly, 0)
	limit := 24
	if len(weatherResp.Hourly.Time) < limit {
		limit = len(weatherResp.Hourly.Time)
	}
	for i := 0; i < limit; i++ {
		temp := 0.0
		if i < len(weatherResp.Hourly.Temperature2m) {
			temp = weatherResp.Hourly.Temperature2m[i]
		}
		cond := ""
		if i < len(weatherResp.Hourly.Weathercode) {
			cond = interpretWMOCode(weatherResp.Hourly.Weathercode[i])
		}
		hourly = append(hourly, Hourly{
			Time:        weatherResp.Hourly.Time[i],
			Condition:   cond,
			Temperature: temp,
		})
	}

	// Determine min/max temperature from daily arrays for today's index 0
	var minTemperature, maxTemperature float64
	if len(weatherResp.Daily.Temperature2mMin) > 0 {
		minTemperature = weatherResp.Daily.Temperature2mMin[0]
	}
	if len(weatherResp.Daily.Temperature2mMax) > 0 {
		maxTemperature = weatherResp.Daily.Temperature2mMax[0]
	}

	return &CityDocument{
		Name:          cityName,
		State:         admin1,
		Country:       country,
		Temperature:   weatherResp.CurrentWeather.Temperature,
		Condition:     condition,
		MinTemperature: minTemperature,
		MaxTemperature: maxTemperature,
		FeelsLike:     weatherResp.CurrentWeather.Temperature,
		Humidity:      humidity,
		Pressure:      pressure,
		Visibility:    visibility,
		WindSpeed:     windSpeed,
		UVIndex:       uvIndex,
		Forecast:      forecasts,
		Hourly:        hourly,
		Sunrise:       func() string { if len(weatherResp.Daily.Sunrise) > 0 { return weatherResp.Daily.Sunrise[0] }; return "" }(),
		Sunset:        func() string { if len(weatherResp.Daily.Sunset) > 0 { return weatherResp.Daily.Sunset[0] }; return "" }(),
	}, nil
}

func upsertCityDocument(collection *mongo.Collection, doc *CityDocument) error {
	now := time.Now()
	filter := bson.M{"name": doc.Name}
	update := bson.M{
		"$set": bson.M{
			"state": doc.State,
			"country": doc.Country,
			"temperature": doc.Temperature,
			"condition": doc.Condition,
			"minTemperature": doc.MinTemperature,
			"maxTemperature": doc.MaxTemperature,
			"feelsLike": doc.FeelsLike,
			"humidity": doc.Humidity,
			"pressure": doc.Pressure,
			"visibility": doc.Visibility,
			"windSpeed": doc.WindSpeed,
			"uvIndex": doc.UVIndex,
			"forecast": doc.Forecast,
			"hourly": doc.Hourly,
			"sunrise": doc.Sunrise,
			"sunset": doc.Sunset,
			"updatedAt": now,
		},
		"$setOnInsert": bson.M{
			"createdAt": now,
		},
	}
	opts := options.Update().SetUpsert(true)
	_, err := collection.UpdateOne(context.TODO(), filter, update, opts)
	return err
}

func interpretWMOCode(code int) string {
	codes := map[int]string{
		0: "Céu limpo", 1: "Principalmente limpo", 2: "Parcialmente nublado", 3: "Encoberto",
		45: "Névoa", 48: "Névoa com geada",
		51: "Garoa leve", 53: "Garoa moderada", 55: "Garoa densa",
		61: "Chuva fraca", 63: "Chuva moderada", 65: "Chuva forte",
		71: "Neve fraca", 73: "Neve moderada", 75: "Neve forte",
		80: "Pancadas de chuva leves", 81: "Pancadas de chuva moderadas", 82: "Pancadas de chuva violentas",
		95: "Tempestade: Leve ou moderada", 96: "Tempestade com granizo leve", 99: "Tempestade com granizo forte",
	}
	if desc, ok := codes[code]; ok {
		return desc
	}
	return "Condição desconhecida"
}