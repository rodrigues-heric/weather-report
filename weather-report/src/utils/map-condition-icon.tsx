import type { JSX } from "react"
import { Sun, SunMedium, CloudSun, Cloudy, CloudFog, CloudSnow, CloudDrizzle, CloudRain, CloudHail} from "lucide-react"


export const conditionIconMap: { [key: string]: JSX.Element } = {
  clear: <Sun size={64} className='animate-pulse text-yellow-400' />,
  mainlyClear: (
    <SunMedium size={64} className='animate-pulse text-yellow-500' />
  ),
  partiallyCloudy: (
    <CloudSun size={64} className='animate-pulse text-yellow-600' />
  ),
  cloudy: <Cloudy size={64} className='animate-pulse text-gray-400' />,
  fog: <CloudFog size={64} className='animate-pulse text-gray-300' />,

  rimeFog: <CloudSnow size={64} className='animate-pulse text-gray-400' />,
  lightDrizzle: (
    <CloudDrizzle size={64} className='animate-pulse text-blue-400' />
  ),
  drizzle: <CloudDrizzle size={64} className='animate-pulse text-blue-400' />,
  heavyDrizzle: (
    <CloudDrizzle size={64} className='animate-pulse text-blue-400' />
  ),
  lightRain: <CloudRain size={64} className='animate-pulse text-blue-500' />,
  rain: <CloudRain size={64} className='animate-pulse text-blue-500' />,
  heavyRain: <CloudRain size={64} className='animate-pulse text-blue-500' />,
  lightSnow: <CloudSnow size={64} className='animate-pulse text-gray-400' />,
  snow: <CloudSnow size={64} className='animate-pulse text-gray-400' />,
  heavySnow: <CloudSnow size={64} className='animate-pulse text-gray-400' />,
  lightShowers: <CloudRain size={64} className='animate-pulse text-blue-500' />,
  showers: <CloudRain size={64} className='animate-pulse text-blue-500' />,
  heavyShowers: <CloudRain size={64} className='animate-pulse text-blue-500' />,
  thunderstorm: <CloudRain size={64} className='animate-pulse text-blue-500' />,
  lightThunderstormWithHail: (
    <CloudHail size={64} className='animate-pulse text-cyan-500' />
  ),
  thunderstormWithHail: (
    <CloudHail size={64} className='animate-pulse text-cyan-500' />
  ),
};