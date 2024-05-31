import { Router } from 'express'

import { UserController } from '../controller/user-controller.js'
import { SessionsController } from '../controller/sessions-controller.js'
import { ImageController } from '../controller/image-controller.js'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate.js'
import { uploads } from '../config/upload.js'

const routes = Router()

const createUser = new UserController()
const sessionsUser = new SessionsController()
const imageCreate = new ImageController()

// Users
routes.post('/users', createUser.create)

// Images
routes.post(
  '/images',
  ensureAuthenticate,
  uploads.single('image'),
  imageCreate.create,
)

routes.get('/image', ensureAuthenticate, imageCreate.list)

// Sessions
routes.post('/sessions', sessionsUser.create)
export { routes }
