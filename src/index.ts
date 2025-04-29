import express from 'express'
import dotenv from 'dotenv'
import { ExpressAdapter } from 'ask-sdk-express-adapter'
import { skill } from './service/skill'

dotenv.config()
const app = express()
const local = process.env.NODE_ENV == 'dev'
const adapter = new ExpressAdapter(skill, !local, !local)
app.post('/', adapter.getRequestHandlers())

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})
