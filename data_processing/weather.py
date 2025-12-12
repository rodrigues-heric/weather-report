"""Módulo para buscar e processar dados meteorológicos usando a API Open-Meteo."""

import requests
import datetime
from datetime import datetime as dt

def get_coordinates(city_name):
    """Busca latitude e longitude para a cidade informada."""
    url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {"name": city_name, "count": 1, "language": "pt", "format": "json"}
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        if not data.get("results"):
            raise ValueError(f"Cidade '{city_name}' não encontrada.")
            
        return data["results"][0]
    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro na conexão com serviço de geocodificação: {e}")

def interpret_wmo_code(code):
    """
    Traduz o código WMO numérico para texto legível.

    Códigos baseados na documentação WMO.
    """
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
        "daily": ["temperature_2m_max", "temperature_2m_min", "uv_index_max"],
        "timezone": timezone, 
        "forecast_days": 8 
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro ao buscar dados do tempo: {e}")

def main():
    city = input("Digite o nome da cidade: ")
    
    try:
        geo_data = get_coordinates(city)
        lat = geo_data["latitude"]
        lon = geo_data["longitude"]
        city_name = geo_data["name"]
        country = geo_data.get("country", "")
        timezone = geo_data.get("timezone", "auto")

        print(f"\n--- Buscando dados para {city_name}, {country} ---\n")

        w_data = get_weather_data(lat, lon, timezone)
        
        current = w_data["current"]
        daily = w_data["daily"]
        hourly = w_data["hourly"]
        
        print("## DADOS ATUAIS ##")
        print(f"Tempo agora: {interpret_wmo_code(current['weather_code'])}")
        print(f"Temperatura: {current['temperature_2m']}°C")
        print(f"Sensação Térmica: {current['apparent_temperature']}°C")
        print(f"Mínima de hoje: {daily['temperature_2m_min'][0]}°C")
        print(f"Máxima de hoje: {daily['temperature_2m_max'][0]}°C")
        print(f"Vento: {current['wind_speed_10m']} km/h")
        print(f"Umidade: {current['relative_humidity_2m']}%")
        print(f"Pressão Atmosférica: {current['pressure_msl']} hPa")
        print(f"Índice UV Máx (Hoje): {daily['uv_index_max'][0]}")
        
        # A API Open-Meteo fornece visibilidade no array horário. 
        # Pegamos a visibilidade da hora atual aproximada.
        current_hour_index = datetime.datetime.now().hour
        vis_km = hourly['visibility'][current_hour_index] / 1000
        print(f"Visibilidade: {vis_km} km")

        print("-" * 40)
        
        print("## PREVISÃO PRÓXIMOS 7 DIAS (Mín / Máx) ##")
        for i in range(1, 8):
            date_str = daily['time'][i]
            date_obj = dt.strptime(date_str, '%Y-%m-%d')
            formatted_date = date_obj.strftime('%d/%m')
            
            min_temp = daily['temperature_2m_min'][i]
            max_temp = daily['temperature_2m_max'][i]
            print(f"{formatted_date}: Min {min_temp}°C | Max {max_temp}°C")

        print("-" * 40)

        print("## PREVISÃO HORA A HORA (HOJE) ##")
        today_str = daily['time'][0]
        
        print(f"{'HORA':<10} | {'TEMP':<10} | {'CONDIÇÃO'}")
        
        for i, time_str in enumerate(hourly['time']):
            if time_str.startswith(today_str):
                hour_only = time_str.split('T')[1]
                temp = hourly['temperature_2m'][i]
                code = hourly['weather_code'][i]
                print(f"{hour_only:<10} | {temp:>5} °C | {interpret_wmo_code(code)}")

    except Exception as error:
        print(f"\n❌ OCORREU UM ERRO FATAL: {error}")

if __name__ == "__main__":
    main()