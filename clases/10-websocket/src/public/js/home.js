const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('textbox');
const log = document.getElementById('log');

// input.addEventListener('keyup', e => {
//   const {key} = e;
//   e.target.value = "";
//   socket.emit('message1', key);

// })

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(e);
  console.log(input.value);
  socket.emit('message1', input.value);
  input.value = "";
})

socket.on('log', data => {
  log.innerHTML += data;
})