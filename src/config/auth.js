import 'dotenv/config'

const { JWT_SECRET } = process.env

const auth = {
  jwt: {
    secret: JWT_SECRET,
    expiresIn: '1h',
  },
}

export { auth }
