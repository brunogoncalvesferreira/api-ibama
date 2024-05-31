import { sql } from '../database/db.js'
import { AppError } from '../utils/app-error.js'
import { hash } from 'bcrypt'
import { randomUUID } from 'node:crypto'

export class UserController {
  async create(req, res) {
    const id = randomUUID()
    const { name, email, password } = req.body

    const checkUserExist = await sql`select * from users where email = ${email}`

    if (checkUserExist.length > 0) {
      throw new AppError('Este e-mail já está em uso', 400)
    }

    const passwordHash = await hash(password, 8)

    await sql`
      insert into users (id, name, email, password) 
      values (${id}, ${name}, ${email}, ${passwordHash})
    `

    return res.status(201).json({ message: 'Usuário criado com sucesso!' })
  }
}
