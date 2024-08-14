 // Conectar ao servidor Socket.io
 const res = document.getElementById("res")
 const socket = io();

 // Referências aos elementos do DOM
 const form = document.getElementById('form');
 const input = document.getElementById('input');
 const messages = document.getElementById('messages');
 const name = prompt("Qual seu username");
 
 const urlParams = new URLSearchParams(window.location.search);
 const products = urlParams.get(name) 

 
 // Lidar com envio de mensagem
 form.addEventListener('submit', (e) => {
     e.preventDefault();
     if (input.value) {
         const msg = input.value;
         const data = {
             msg,
             name
         }
         socket.emit('mensagem', data);
         input.value = '';
     }
 });

 // Lidar com recebimento de mensagem
 socket.on('mensagem', data => {
    const isMe = data.name === name;
    
    const messageClass = isMe ? 'bg-primary' : 'bg-danger';
    if (messageClass == "bg-danger"){
      res.innerHTML += `
    <div id = "card" class="card ${messageClass}">
           <div class="card-body" id="res1">
           <div class="card-header">
            ${data.name}
           </div>
             ${data.msg}
           </div>
         </div>`
    }else{
      res.innerHTML += `
    <div id = "card" class="card ${messageClass}">
           <div class="card-body" id="res1">
           <div class="card-header">
            VOCÊ
           </div>
             ${data.msg}
           </div>
         </div>`
    }
    
         
    window.scrollTo(0, document.body.scrollHeight);
    console.log(data);
    console.log(data.msg);
 });