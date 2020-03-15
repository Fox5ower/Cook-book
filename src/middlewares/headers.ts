import { Request, Response } from 'express'

const headers = (req: Request, res: Response, next: any) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, access-token, access-control-allow-headers'
  )
  res.header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS')
  next()
}

export default headers
