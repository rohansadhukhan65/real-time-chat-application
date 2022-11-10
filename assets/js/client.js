const socket = io('http://localhost:3000')

// Getting elements
const form = document.getElementById('msg-form')
const msg_input = document.getElementById('msg-input')
const msg_container = document.querySelector('.container')

const user_name = prompt("Enter Name :")

// message appender function 
const appender = (message, position) => {
     const msgElem = document.createElement('div')
     msgElem.innerText = message;
     msgElem.classList.add('messege');
     msgElem.classList.add(position);
     msg_container.append(msgElem);
}

// when form submits .....
form.addEventListener('submit', (e) => {
     e.preventDefault();
     const myMsg = msg_input.value;
     appender(`You : ${myMsg}`, 'right');
     socket.emit('send', myMsg);
     msg_input.value = '';
})



// this event send and hit the server socket event .....
socket.emit('new-user-joined', user_name)



// listen when server hit user-joined event and broadcast to all users .....
socket.on('user-joined', data => {
     appender(`${data} Joined The Chat !` , 'left')
})



// listemn when server recive some ones message .....
socket.on('recive', data => {
     appender(`${data.name} : ${data.messege} `, 'left')
})