import multer from 'multer'

const uploads = multer({
  storage: multer.memoryStorage(),
})

export { uploads }
