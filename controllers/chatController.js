let messages = [
  {
    id: 1, conteudo: 'olá mundo'
  },
  {
    id: 2, conteudo: 'como você está'
  },
];

// Define a função readMessage
exports.readMessage = (req, res) => {
    res.json(messages);     
};

