"""API Flask para buscar dados meteorológicos da API Open-Meteo."""
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import datetime
from datetime import datetime as dt

app = Flask(__name__)
CORS(app)

def get_coordinates(city_name: str, lang: str = "en"):
    """Busca latitude e longitude para a cidade informada."""
    url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {"name": city_name, "count": 1, "language": lang, "format": "json"}
    
    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        if not data.get("results"):
            raise ValueError(f"Cidade '{city_name}' não encontrada.")
            
        return data["results"][0]
    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro na conexão com serviço de geocodificação: {e}")

def interpret_wmo_code(code):
    """Traduz o código WMO numérico para texto legível."""
    codes = {
        0: "Céu limpo", 1: "Principalmente limpo", 2: "Parcialmente nublado", 3: "Encoberto",
        45: "Névoa", 48: "Névoa com geada",
        51: "Garoa leve", 53: "Garoa moderada", 55: "Garoa densa",
        61: "Chuva fraca", 63: "Chuva moderada", 65: "Chuva forte",
        71: "Neve fraca", 73: "Neve moderada", 75: "Neve forte",
        80: "Pancadas de chuva leves", 81: "Pancadas de chuva moderadas", 82: "Pancadas de chuva violentas",
        95: "Tempestade: Leve ou moderada", 96: "Tempestade com granizo leve", 99: "Tempestade com granizo forte"
    }
    return codes.get(code, "Condição desconhecida")

def get_weather_data(lat, lon, timezone):
    """Busca os dados meteorológicos completos."""
    url = "https://api.open-meteo.com/v1/forecast"
    
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", 
                    "is_day", "weather_code", "pressure_msl", "wind_speed_10m"],
        "hourly": ["temperature_2m", "weather_code", "visibility"],
        "daily": ["temperature_2m_max", "temperature_2m_min", "uv_index_max", "weather_code"],
        "timezone": timezone, 
        "forecast_days": 8 
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro ao buscar dados do tempo: {e}")

def build_weather_response(city_name, country, state, w_data):
    """Constrói a resposta com os dados formatados."""
    current = w_data["current"]
    daily = w_data["daily"]
    hourly = w_data["hourly"]
    
    current_hour_index = datetime.datetime.now().hour
    vis_km = hourly['visibility'][current_hour_index] / 1000
    
    # Dados atuais
    current_data = {
        "condition": interpret_wmo_code(current['weather_code']),
        "temperature": current['temperature_2m'],
        "feelsLike": current['apparent_temperature'],
        "minTemperature": daily['temperature_2m_min'][0],
        "maxTemperature": daily['temperature_2m_max'][0],
        "windSpeed": current['wind_speed_10m'],
        "humidity": current['relative_humidity_2m'],
        "pressure": current['pressure_msl'],
        "visibility": round(vis_km, 2),
        "uvIndex": daily['uv_index_max'][0],
    }
    
    # Previsão dos próximos 7 dias
    forecast_7days = []
    for i in range(1, 8):
        date_str = daily['time'][i]
        date_obj = dt.strptime(date_str, '%Y-%m-%d')
        formatted_date = date_obj.strftime('%d/%m')
        
        forecast_7days.append({
            "date": formatted_date,
            "condition": interpret_wmo_code(daily['weather_code'][i]),
            "minTemperature": daily['temperature_2m_min'][i],
            "maxTemperature": daily['temperature_2m_max'][i],
        })
    
    # Previsão hora a hora (hoje)
    hourly_result = []
    today_str = daily['time'][0]

    for i, time_str in enumerate(hourly['time']):
        if time_str.startswith(today_str):
            # Trim seconds if present, keep HH:MM
            hour_only = time_str.split('T')[1][:5]
            temp = hourly['temperature_2m'][i]
            code = hourly['weather_code'][i]
            hourly_result.append({
                "time": hour_only,
                "temperature": temp,
                "condition": interpret_wmo_code(code),
            })
    
    return {
        "name": city_name,
        "country": country,
        "state": state,
        "current": current_data,
        "forecast7days": forecast_7days,
        "hourly": hourly_result,
    }

@app.route('/api/weather/<city_name>', methods=['GET'])
def get_weather(city_name):
    """Endpoint para buscar dados meteorológicos de uma cidade."""
    try:
        state = request.args.get('state', '')
        lang = request.args.get('lang', 'en')
        
        geo_data = get_coordinates(city_name=city_name, lang=lang)
        lat = geo_data["latitude"]
        lon = geo_data["longitude"]
        actual_city_name = geo_data["name"]
        country = geo_data.get("country", "")
        timezone = geo_data.get("timezone", "auto")
        
        w_data = get_weather_data(lat, lon, timezone)
        
        response = build_weather_response(actual_city_name, country, state, w_data)
        
        return jsonify(response), 200
    
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Endpoint de health check."""
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)