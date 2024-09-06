let stompClient = null;
let currentRoom = null;

const chatBox = document.getElementById('chatBox');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const roomInput = document.getElementById('roomInput');
const roomList = document.getElementById('rooms');

const socket = new SockJS('/chat');
stompClient = Stomp.over(socket);

stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);

    stompClient.subscribe('/topic/rooms', function (roomsMessage) {
        const rooms = JSON.parse(roomsMessage.body);
        roomList.innerHTML = '';
        rooms.forEach(room => {
            const roomElement = document.createElement('div');
            roomElement.className = 'room';
            roomElement.textContent = room;
            roomElement.onclick = () => joinRoom(room);
            roomList.appendChild(roomElement);
        });
    });

    fetch('/rooms').then(response => response.json()).then(rooms => {
        rooms.forEach(room => {
            const roomElement = document.createElement('div');
            roomElement.className = 'room';
            roomElement.textContent = room;
            roomElement.onclick = () => joinRoom(room);
            roomList.appendChild(roomElement);
        });
    });
}, function (error) {
    console.error('Connection failed: ' + error);
    alert('WebSocket connection failed. Please refresh the page.');
});

function createOrJoinRoom() {
    const room = roomInput.value.trim();
    if (room) {
        joinRoom(room);
    }
}

function joinRoom(room) {
    currentRoom = room;

    stompClient.subscribe('/topic/' + room, function (messageOutput) {
        const message = JSON.parse(messageOutput.body);
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<strong>${message.sender}:</strong> ${message.content}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    stompClient.send("/app/joinRoom", {}, room);
    chatBox.style.display = 'block';
    messageForm.style.display = 'flex';
    chatBox.innerHTML = '';
}

messageForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message && currentRoom) {
        stompClient.send("/app/sendMessage", {}, JSON.stringify({
            'sender': 'User',
            'content': message,
            'timestamp': new Date().toISOString()
        }));
        messageInput.value = '';
    }
});
