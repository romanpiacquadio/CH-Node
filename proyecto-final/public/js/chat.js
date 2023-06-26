const socket = io();

let user;
let chatBox = document.getElementById('chatBox');

Swal.fire({
    title: 'Log In',
    input: 'text',
    text: 'Enter your e-mail address',
    inputValidator:  (value) => {
        return !value && 'You need to type your e-mail'
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
}).then( result => {
    user = result.value;
    socket.emit('authenticated', user);
});

chatBox.addEventListener( 'keyup', e => {
    if(e.key === 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', {
              user, 
              message: chatBox.value
            })
            chatBox.value="";
        }
    }
});

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
      messages += `${message.user} dice: ${message.message}<br>`
    });
    log.innerHTML = messages;
});

socket.on('newUserConnected', data => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmationButton: false,
      timer:3000,
      title: `${data} se ha unido al chat`,
      icon: 'success'
    })
});
