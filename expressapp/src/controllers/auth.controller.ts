import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'
import config from '../config'
import { UserDTO } from '../dto/user.dto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const hash = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: UserDTO = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }
    const newUser = new User({ email, password: hash(password as string) })
    await newUser.save()

    const token = jwt.sign({ email }, config.token as unknown as string, { expiresIn: '1h' })
    res.json({ token, email: newUser.email })
  } catch (error) {
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: UserDTO = req.body
    console.log(email)
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' })
    }
    const isPasswordCorrect = bcrypt.compareSync(`${password}${config.pepper}`, user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: 'Unauthorized' })
    }

    const token = jwt.sign({ email }, config.token as unknown as string, { expiresIn: '1h' })
    res.json({ token, email: user.email })
  } catch (error) {
    next(error)
  }
}
