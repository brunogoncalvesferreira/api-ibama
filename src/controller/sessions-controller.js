import { auth as authConfig } from '../config/auth.js'
import { sql } from '../database/db.js'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { AppError } from '../utils/app-error.js'

export class SessionsController {
  async create(req, res) {
    const { email, password } = req.body

    const users = await sql`select * from users where email = ${email}`

    const user = users[0]

    if (!users) {
      throw new AppError('E-mail ou senha inválidos', 401)
    }

    const passwordHash = await compare(password, user.password)

    if (!passwordHash) {
      throw new AppError('E-mail ou senha inválidos', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = jwt.sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 15 * 60 * 1000,
    })

    delete user.password

    return res.status(200).json({ user })
  }
}
