const socket = io('http://localhost:8000',{transports: ['websocket']});

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msgInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('/sound + images/msg.mp3');
var audioNew = new Audio('/sound + images/secnew.mp3');


const append = (message , position) =>{
messageElement = document.createElement('div');
messageElement.innerText = message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position == 'right'){
audio.play();
}
else{
    audioNew.play();
}
}

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
     socket.emit('send',message);
     messageInput.value =''
})

const userName = prompt("enter your name to Join");
socket.emit('new-user-joined',userName);

socket.on('user-joined', data =>{
append(`${userName} joined the chat`, 'right')
})

socket.on('receive', data =>{
    append(`${data.userName}: ${data.message}`, 'left')
})

 socket.on('left', userName =>{
     append(`${data.userName} left the chat`,'left')
 })
