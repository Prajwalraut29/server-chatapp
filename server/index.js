const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')
const PORT = 'https://client-chatappp.vercel.app/'
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors:{
    origin:'https://client-chatappp.vercel.app/',
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

server.listen(PORT,()=>{
  console.log(`Server running at ${PORT}`);
})