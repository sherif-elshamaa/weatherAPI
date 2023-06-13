import { Request, Response, NextFunction } from 'express'
import config from '../config'
import axios from 'axios'
import NodeCache from 'node-cache'

// Set cache TTL to 30 minutes
const cache = new NodeCache({ stdTTL: 1800 })

export const getWeather = async (req: Request, res: Response, next: NextFunction) => {
  const { city } = req.params
  const cacheKey = `weather:${city}`

  const cachedWeather = cache.get(cacheKey)
  if (cachedWeather) {
    console.log('cashed')
    return res.json(cachedWeather)
  }

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${config.weatherkey}&q=${city}`
    )
    const weatherData = response.data

    cache.set(cacheKey, weatherData)

    res.json(weatherData)
  } catch (error) {
    next(error)
  }
}
