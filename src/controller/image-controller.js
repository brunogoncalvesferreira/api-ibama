import { sql } from '../database/db.js'
import { randomUUID } from 'node:crypto'
import { storageFirebase } from '../config/firebase.js'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
export class ImageController {
  async create(req, res) {
    const imageId = randomUUID()
    const file = req.file

    // Config para salvar imagens no firebase
    const storageRef = ref(storageFirebase, `images/${Date.now()}`)
    await uploadBytes(storageRef, file.buffer, {
      contentType: file.mimetype,
    })
    const filenameURL = await getDownloadURL(storageRef)

    await sql`
      insert into images (id, url) 
      values (${imageId}, ${filenameURL})
    `

    return res.status(201).json({ message: 'Imagem criada com sucesso!' })
  }

  async list(req, res) {
    const images = await sql`select * from images order by created_at desc`

    return res.status(200).json(images)
  }
}
