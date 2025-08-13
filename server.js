import express from 'express'
import compression from 'compression'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(compression())
const dist = path.join(__dirname, 'dist')
app.use(express.static(dist))

app.get('*', (_, res) => res.sendFile(path.join(dist, 'index.html')))
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`FE running on http://localhost:${port}`))
