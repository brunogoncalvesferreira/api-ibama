import { sql } from '../database/db.js'
import { AppError } from '../utils/app-error.js'

export class UserValidatedController {
  async index(req, res) {
    const { user } = req

    console.log(user)

    const checkUserExist = await sql`select * from users where id = ${user.id}`

    console.log(checkUserExist)

    if (checkUserExist.length === 0) {
      throw new AppError('Não autorizado', 401)
    }

    return res.status(200).json()
  }
}
