// -------------- WebSocket & STOMP Client Setup --------------

let stompClient = null;
let currentRoom = null;
let currentSubscription = null;
const MAX_ROOM_NAME_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 1500;

const chatBox = document.getElementById('chatBox');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const roomInput = document.getElementById('roomInput');
const roomList = document.getElementById('rooms');
const currentRoomDisplay = document.getElementById('currentRoomDisplay');
const createdRoomContainer = document.getElementById('createdRoomContainer');
const username = /*[[${username}]]*/ ''; // call username

const socket = new SockJS('/chat');
stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);

    // Subscribe to the room list
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

    // Fetch rooms on initial connection
    fetch('/rooms').then(response => response.json()).then(rooms => {
        roomList.innerHTML = '';
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

// -------------- Room Creation and Joining --------------

function createOrJoinRoom() {
    const room = roomInput.value.trim();

    if (room.length > MAX_ROOM_NAME_LENGTH) {
        showErrorPopup(`Room name cannot exceed ${MAX_ROOM_NAME_LENGTH} characters.`);
        return;
    }

    if (room) {
        fetch('/create-room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                roomName: room
            }),
        })
            .then(response => response.text())
            .then(result => {
                if (result === 'Room created successfully!') {
                    joinRoom(room);
                    showSuccessPopup(result);
                    displayUserCreatedRoom();
                } else if (result === 'Room exists. You are now joining it.') {
                    joinRoom(room);
                    showSuccessPopup(result);
                } else {
                    showErrorPopup(result);
                }
            })
            .catch(error => {
                console.error('Error creating room:', error);
                showErrorPopup('Error creating room. Please try again.');
            });
    }
}

function joinRoom(room) {
    if (currentSubscription !== null) {
        currentSubscription.unsubscribe();
    }

    currentRoom = room;

    currentSubscription = stompClient.subscribe('/topic/' + room, function(messageOutput) {
        const message = JSON.parse(messageOutput.body);

        if (message.message && message.message.includes("has been deleted")) {
            showErrorPopup(message.message);
            currentSubscription.unsubscribe();
            currentRoomDisplay.style.display = 'none';
            chatBox.style.display = 'none';
            messageForm.style.display = 'none';
            currentRoom = null;
        } else {
            displayMessage(message);
        }
    });

    stompClient.send("/app/joinRoom", {}, room);

    currentRoomDisplay.style.display = 'block';
    currentRoomDisplay.textContent = `Current Room: ${room}`;

    chatBox.style.display = 'block';
    messageForm.style.display = 'flex';
    chatBox.innerHTML = '';

    fetch(`/chat/history/${room}`)
        .then(response => response.json())
        .then(messages => {
            messages.forEach(message => {
                displayMessage(message);
            });
        });
}

// -------------- Message Handling --------------

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const message = messageInput.value.trim();

    if (message.length > MAX_MESSAGE_LENGTH) {
        showErrorPopup(`Message length cannot exceed ${MAX_MESSAGE_LENGTH} characters.`);
        return;
    }

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

// -------------- Room Deletion --------------

function deleteRoom(roomName) {
    if (confirm(`Are you sure you want to delete the room "${roomName}"?`)) {
        stompClient.send(`/app/deleteRoom/${roomName}`, {}, JSON.stringify({
            message: `The room "${roomName}" has been deleted.`,
            room: roomName
        }));

        fetch('/delete-room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting room');
                }
                return response.text();
            })
            .then(result => {
                showSuccessPopup(result);

                if (currentSubscription !== null) {
                    currentSubscription.unsubscribe();
                }

                currentRoom = null;
                currentRoomDisplay.style.display = 'none';
                chatBox.style.display = 'none';
                messageForm.style.display = 'none';
                createdRoomContainer.style.display = 'none';

                fetchRooms();
            })
            .catch(error => {
                console.error('Error deleting room:', error);
                showErrorPopup('Refresh the page to apply changes.');
            });
    }
}

// -------------- User-Created Room Display --------------

function displayUserCreatedRoom() {
    fetch('/user-room')
        .then(response => response.text())
        .then(room => {
            const createdRoomElement = document.getElementById('createdRoom');

            if (room !== "No room created.") {
                createdRoomContainer.style.display = 'block';
                createdRoomElement.innerHTML = `
                    <div class="created-room">
                        ${room}
                        <button onclick="deleteRoom('${room}')">
                            <i data-feather="trash-2"></i>
                        </button>
                    </div>
                `;
                feather.replace();
            } else {
                createdRoomContainer.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching user room:', error);
        });
}

// -------------- Fetch Rooms --------------

function fetchRooms() {
    fetch('/rooms')
        .then(response => response.json())
        .then(rooms => {
            roomList.innerHTML = '';
            rooms.forEach(room => {
                if (room !== currentRoom) {
                    const roomElement = document.createElement('div');
                    roomElement.className = 'room';
                    roomElement.textContent = room;
                    roomElement.onclick = () => joinRoom(room);
                    roomList.appendChild(roomElement);
                }
            });
        });
}

// -------------- Popup Notifications --------------

function showErrorPopup(message) {
    const errorPopup = document.getElementById('errorPopup');
    const errorMessage = errorPopup.querySelector('.popup-message');
    errorMessage.textContent = message;
    errorPopup.style.display = 'block';
    errorPopup.style.opacity = '1';

    setTimeout(() => {
        errorPopup.style.opacity = '0';
        setTimeout(() => {
            errorPopup.style.display = 'none';
        }, 400);
    }, 3000);
}

function showSuccessPopup(message) {
    const successPopup = document.getElementById('successPopup');
    const successMessage = successPopup.querySelector('.popup-message');
    successMessage.textContent = message;
    successPopup.style.display = 'block';
    successPopup.style.opacity = '1';

    setTimeout(() => {
        successPopup.style.opacity = '0';
        setTimeout(() => {
            successPopup.style.display = 'none';
        }, 400);
    }, 3000);
}

// -------------- Initial Setup --------------

displayUserCreatedRoom();
fetchRooms();
