const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

let connectedClients = []
io.on('connection', (socket) => {
  connectedClients = [...connectedClients, socket]

  socket.on('disconnect', () => {
    connectedClients = connectedClients.filter((client) => client !== socket)
  })
})

app.use(cors())
app.use(bodyParser.json({ limit: '10mb', extended: true }))

http.listen(4000)

app.get('/open', (req, res) => {
  const { url, index } = req.query

  if (connectedClients.length) {
    connectedClients.forEach((client) => {
      client.emit('open', { index })
    })
  }
  res.redirect(url)
})
