const express = require("express");
const http = require("http");
const cors = require('cors');
const { Server } = require("socket.io")

// Inicializar o Express e o servidor HTTP
const app = express();

const serverHttp = http.createServer(app);

app.use(cors())
// Configurar o Socket.io para usar o servidor HTTP
const io = new Server(serverHttp);

//dados simulados
let message = [
  {
    id: 1, conteudo: 'olá mundo'
  },
  {
    id:2, conteudo: 'como voce está'
  },
]

app.use(express.json());

app.get('/api/mensagens', (req, res) => {
    res.json(message);     
  });
app.get('/api/mensagens/:id', (req, res) => {
    const mensagem = message.find(m => m.id === parseInt(req.params.id));
    if (mensagem) {
        res.json(mensagem);
    } else {
        res.status(404).send('Mensagem não encontrada');
    }
});
app.post('/api/mensagens', (req, res) => {
  const novoId = mensagens.length > 0 ? mensagens[mensagens.length - 1].id + 1 : 1;
  const novaMensagem = {
      id: novoId,
      conteudo: req.body.conteudo,
  };
  mensagens.push(novaMensagem);
  io.emit('nova-mensagem', novaMensagem); // Emite um evento para todos os clientes conectados
  res.status(201).json(novaMensagem);
});

app.delete('/api/mensagens/:id', (req, res) => {
  const index = mensagens.findIndex(m => m.id === parseInt(req.params.id));
  if (index !== -1) {
      const [mensagemRemovida] = mensagens.splice(index, 1);
      io.emit('mensagem-deletada', mensagemRemovida); // Emite um evento para todos os clientes conectados
      res.json(mensagemRemovida);
  } else {
      res.status(404).send('Mensagem não encontrada');
  }
});

// Configuração do Socket.IO
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('disconnect', () => {
      console.log('Cliente desconectado');
  });
});

serverHttp.listen(3000, () => {
    console.log('Servidor Socket.io está ouvindo na porta 3000');
  });

