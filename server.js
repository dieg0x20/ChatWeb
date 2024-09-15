const express = require("express");
const http = require("http");
const cors = require('cors');
const socketIo = require("socket.io");
const chatRoutes = require('./routes/chatRoutes');
const socketEvents = require('./socket/socketEvents'); // Não está sendo usado aqui

const app = express();
const serverHttp = http.createServer(app);
const io = socketIo(serverHttp);

app.use(cors());
app.use(express.json());
app.use('/api/chats', chatRoutes);

// Configuração dos eventos do Socket.IO
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  // A lógica para manipular eventos pode estar aqui
  if (socketEvents) {
    socketEvents(socket, io); // Supondo que socketEvents seja uma função
  }

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

serverHttp.listen(3000, () => {
  console.log('Servidor Socket.io está ouvindo na porta 3000');
});































