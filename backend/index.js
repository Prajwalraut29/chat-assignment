const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors:{
    origin:'https://chat-assignment.vercel.app/',
    methods :["GET","POST"]
  },
})

io.on('connection',(socket)=>{
  console.log(`user connected ${socket.id}`);
  socket.on('send-message',(message)=>{
    // broadcast the recevied message to all the connected user 
    io.emit('recieved-message',message)

  })
  socket.on('disconnect',()=>{
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT,()=>{
  console.log(`Server running at ${PORT}`);
})