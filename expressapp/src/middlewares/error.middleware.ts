import { Response, Request, NextFunction } from 'express'

interface Error {
  name: string
  message: string
  status?: number
  stack?: string
}
const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500
  const message = error.message || 'Ops!! something went wrong'
  res.status(status).json({ status, message })
  next()
}

export default errorMiddleware
