import jwt from 'jsonwebtoken'
import { auth as authConfig } from '../config/auth.js'
import { AppError } from '../utils/app-error.js'

export function ensureAuthenticate(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token não informado', 401)
  }

  const [_, token] = authHeader.split(' ')

  try {
    const { sub: userId } = jwt.verify(token, authConfig.jwt.secret)

    req.user = {
      id: Number(userId),
    }

    return next()
  } catch (error) {
    throw new AppError('JWT token inválido', 401)
  }
}
