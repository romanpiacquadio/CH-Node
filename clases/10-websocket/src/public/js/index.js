const socket = io();

socket.emit('message', 'hola a todos, esto es un mensaje desde el front')

socket.on('evento_socket_individual', data => {
  console.log(data)
});

socket.on('evento_todos_menos_actual', data => {
  console.log(data);
});

socket.on('evento_todos', data => {
  console.log(data);
});