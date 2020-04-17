import express from 'express'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('hello')
})

const PORT = 3003

app.listen(PORT, () => {
  console.log('server running on port:', PORT)
})