import jwt from 'jsonwebtoken'
import { auth as authConfig } from '../config/auth.js'
import { AppError } from '../utils/app-error.js'

export function ensureAuthenticate(req, res, next) {
  const authHeader = req.headers

  console.log(authHeader)

  if (!authHeader.cookie) {
    throw new AppError('JWT token não informado', 401)
  }

  const [_, token] = authHeader.cookie.split('token=')

  try {
    const { sub: userId } = jwt.verify(token, authConfig.jwt.secret)

    req.user = {
      id: userId,
    }

    return next()
  } catch (error) {
    throw new AppError('JWT token inválido', 401)
  }
}
