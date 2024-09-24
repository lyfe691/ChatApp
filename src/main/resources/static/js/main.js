// WebSocket related code
let stompClient = null;
let currentRoom = null;
let currentSubscription = null;
const MAX_ROOM_NAME_LENGTH = 20;

const chatBox = document.getElementById('chatBox');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const roomInput = document.getElementById('roomInput');
const roomList = document.getElementById('rooms');
const currentRoomDisplay = document.getElementById('currentRoomDisplay'); // To display the current room name
const username = /*[[${username}]]*/ '';

const socket = new SockJS('/chat');
stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);

    stompClient.subscribe('/topic/rooms', function(roomsMessage) {
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
}, function(error) {
    console.error('Connection failed: ' + error);
    alert('WebSocket connection failed. Please refresh the page.');
});

function createOrJoinRoom() {
    const room = roomInput.value.trim();

    if (room.length > MAX_ROOM_NAME_LENGTH) {
        alert(`Room name cannot exceed ${MAX_ROOM_NAME_LENGTH} characters.`);
        return;
    }

    if (room) {
        joinRoom(room);
    }
}

function joinRoom(room) {
    if (currentSubscription !== null) {
        currentSubscription.unsubscribe();
    }

    currentRoom = room;

    currentSubscription = stompClient.subscribe('/topic/' + room, function(messageOutput) {
        const message = JSON.parse(messageOutput.body);
        displayMessage(message);
    });

    stompClient.send("/app/joinRoom", {}, room);

    currentRoomDisplay.style.display = 'block';
    currentRoomDisplay.textContent = `Current Room: ${room}`;

    chatBox.style.display = 'block';
    messageForm.style.display = 'flex';
    chatBox.innerHTML = ''; // Clear chat box

    fetch(`/chat/history/${room}`)
        .then(response => response.json())
        .then(messages => {
            messages.forEach(message => {
                displayMessage(message);
            });
        });
}

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message && currentRoom) {
        stompClient.send("/app/sendMessage", {}, JSON.stringify({
            'sender': username,
            'content': message,
            'timestamp': new Date().toISOString(),
            'room': currentRoom
        }));
        messageInput.value = '';
    }
});

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message received';

    const usernameElement = document.createElement('strong');
    usernameElement.className = 'message-username';
    usernameElement.innerText = message.sender + ': ';

    const contentElement = document.createElement('div');
    contentElement.className = 'message-content';

    const maxLength = 100;
    const messageContent = message.content;

    if (messageContent.length > maxLength) {
        const truncatedText = messageContent.substring(0, maxLength);
        const fullText = messageContent;

        const truncatedElement = document.createElement('span');
        truncatedElement.className = 'truncated-message';
        truncatedElement.innerText = truncatedText + '...';

        const fullMessageElement = document.createElement('span');
        fullMessageElement.className = 'full-message';
        fullMessageElement.innerText = fullText;
        fullMessageElement.style.display = 'none';

        const showMoreElement = document.createElement('span');
        showMoreElement.className = 'show-more';
        showMoreElement.innerText = 'Show more';

        const showLessElement = document.createElement('span');
        showLessElement.className = 'show-less';
        showLessElement.innerText = ' Show less';
        showLessElement.style.display = 'none';

        showMoreElement.onclick = function() {
            truncatedElement.style.display = 'none';
            showMoreElement.style.display = 'none';
            fullMessageElement.style.display = 'inline';
            showLessElement.style.display = 'inline';
        };

        showLessElement.onclick = function() {
            truncatedElement.style.display = 'inline';
            showMoreElement.style.display = 'inline';
            fullMessageElement.style.display = 'none';
            showLessElement.style.display = 'none';
        };

        contentElement.appendChild(truncatedElement);
        contentElement.appendChild(fullMessageElement);
        contentElement.appendChild(showMoreElement);
        contentElement.appendChild(showLessElement);
    } else {
        contentElement.innerText = messageContent;
    }

    messageElement.appendChild(usernameElement);
    messageElement.appendChild(contentElement);

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
