import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const token = authHeader?.split(' ')[1]
    jwt.verify(token as unknown as string, config.token as unknown as string)
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'unauthorized' })
  }
}

export default authMiddleware
