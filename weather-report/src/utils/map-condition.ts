export function mapConditionPTtoEN(conditionPT: string): string {
  const conditionMap: { [key: string]: string } = {
    'Céu limpo': 'clear',
    'Principalmente limpo': 'mainlyClear',
    'Parcialmente nublado': 'partiallyCloudy',
    Nublado: 'cloudy',
    Nevoeiro: 'fog',
    'Nevoeiro com geada': 'rimeFog',
    'Garoa fraca': 'lightDrizzle',
    'Garoa moderada': 'drizzle',
    'Garoa pesada': 'heavyDrizzle',
    'Chuva fraca': 'lightRain',
    'Chuva moderada': 'rain',
    'Chuva pesada': 'heavyRain',
    'Neve fraca': 'lightSnow',
    'Neve moderada': 'snow',
    'Neve pesada': 'heavySnow',
    'Pancadas de chuva fracas': 'lightShowers',
    'Pancadas de chuva moderadas': 'showers',
    'Pancadas de chuva pesadas': 'heavyShowers',
    Tempestade: 'thunderstorm',
    'Tempestade fraca com granizo': 'lightThunderstormWithHail',
    'Tempestade forte com granizo': 'thunderstormWithHail',
  };
  return conditionMap[conditionPT] || conditionPT;
}

export function mapConditionENtoPT(conditionEN: string): string {
  const conditionMap: { [key: string]: string } = {
    clear: 'Céu limpo',
    mainlyClear: 'Principalmente limpo',
    partiallyCloudy: 'Parcialmente nublado',
    cloudy: 'Nublado',
    fog: 'Nevoeiro',
    rimeFog: 'Nevoeiro com geada',
    lightDrizzle: 'Garoa fraca',
    drizzle: 'Garoa moderada',
    heavyDrizzle: 'Garoa pesada',
    lightRain: 'Chuva fraca',
    rain: 'Chuva moderada',
    heavyRain: 'Chuva pesada',
    lightSnow: 'Neve fraca',
    snow: 'Neve moderada',
    heavySnow: 'Neve pesada',
    lightShowers: 'Pancadas de chuva fracas',
    showers: 'Pancadas de chuva moderadas',
    heavyShowers: 'Pancadas de chuva pesadas',
    thunderstorm: 'Tempestade',
    lightThunderstormWithHail: 'Tempestade fraca com granizo',
    thunderstormWithHail: 'Tempestade forte com granizo',
  };
  return conditionMap[conditionEN] || conditionEN;
}
