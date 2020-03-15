import { Request, Response } from 'express'

const logger = (req: Request, res: Response, next: any) => {
  console.log(`Request logged: ${(req.method, req.path)}`)
  next()
}

export default logger
