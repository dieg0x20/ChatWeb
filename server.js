const express = require("express");
const http = require("http");
const { Server } = require("socket.io")

// Inicializar o Express e o servidor HTTP
const app = express();
const serverHttp = http.createServer(app);

// Configurar o Socket.io para usar o servidor HTTP
const io = new Server(serverHttp);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  });

  io.on('connection', (socket) => {
      console.log('Novo usuário conectado');
    
      // Lidar com evento de mensagem recebida
      socket.on('mensagem', (mensagem) => {
        console.log('Mensagem recebida:', mensagem);
        
        // Enviar a mensagem para todos os clientes, incluindo o remetente
        io.emit('mensagem',mensagem);
      });
    
      // Lidar com evento de desconexão
      socket.on('disconnect', () => {
        console.log('Usuário desconectado');
      });
    });

serverHttp.listen(3000, () => {
    console.log('Servidor Socket.io está ouvindo na porta 3000');
  });

