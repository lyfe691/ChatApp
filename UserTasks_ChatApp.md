
# Sprint 1
## ID: 1 - Access GitHub Versions
- **User Task**: Ensure the GitHub repository is set up with proper version control for the ChatApp.
  - Commit and push latest stable build to GitHub.

## ID: 2 - Send and Receive Messages
- **User Task**: Implement message sending and receiving in **ChatController** and update the **MessageRepository**.
  - Add WebSocket logic in **WebSocketConfig** for real-time communication.
  - Modify **Message** model to handle user messages and timestamps.

## ID: 2.1 - Text Field for Messages
- **User Task**: Implement the message input field in **index.html**.
  - Create a form for message input and a button to submit messages in **main.js** to handle sending logic.
  - Bind input from the form to send WebSocket messages via **ChatController**.

## ID: 2.3 - Display Usernames
- **User Task**: Modify **index.html** to display the conversation partner's name.
  - Ensure that the **ChatController** fetches the user names from **UserRepository** and passes them to the frontend.

## ID: 3 - Clear UI for Chats
- **User Task**: Create a simple and intuitive UI for the chat window in **main.css** and **style.css**.
  - Implement responsive layout for chat windows in **index.html**.

## ID: 3.2 - Mobile Compatibility
- **User Task**: Ensure that the chat window and message bubbles in **index.html** are responsive.
  - Add mobile-specific styling in **style.css** for improved mobile user experience.

## ID: 4 - User Login
- **User Task**: Implement login functionality in **LoginController** and **UserRepository**.
  - Ensure users can log in using email, password, and username.
  - Add login form and logic in **login.html** and **main.js**.

## ID: 5 - User Registration
- **User Task**: Implement user registration in **AuthController** with validation logic in **register.html**.
  - Validate input fields and ensure user creation in **UserService**.

## ID: 6 - Create and Switch Chats
- **User Task**: Implement logic in **ChatController** to handle multiple chat rooms.
  - Update the frontend in **index.html** and **main.js** to switch between rooms.

## ID: 7 - Unique Usernames
- **User Task**: Add logic in **UserRepository** to check for duplicate usernames and display an error if a user already exists.

## ID: 8 - Password Hashing
- **User Task**: Implement password hashing in **UserService** before saving to the database.
  - Use **BCryptPasswordEncoder** for hashing passwords.

# Sprint 2
## ID: 2.2 - Chat History
- **User Task**: Implement chat history in **ChatController** to persist messages in **MessageRepository**.
  - Display past messages in **index.html** when a user refreshes the page.

## ID: 3.1 - Message Bubbles
- **User Task**: Create message bubble designs in **main.css** and **style.css**.
  - Implement frontend display in **index.html** for message bubbles.

## ID: 9 - Password Reset
- **User Task**: Implement password reset logic in **AuthController** using **PasswordResetTokenRepository**.
  - Create password reset email using **EmailService**.
  - Add **reset-password.html** to handle password reset form input.

## ID: 10 - Limit Message Length
- **User Task**: Add a character limit (700) for messages in **main.js**.
  - Display "show more" button for longer messages.

## ID: 11 - Display Room Info
- **User Task**: Update the UI in **index.html** to clearly display the room the user is in.

## ID: 12 - Limit Room Creation
- **User Task**: Ensure that each user can only create one room in **ChatController**.
  - Add error handling logic in **ChatService** and frontend messages for exceeding room limits.

# Sprint 3
## ID: 13 - Delete Chat
- **User Task**: Implement delete chat functionality in **ChatController**.
  - Ensure that the chat is removed from **MessageRepository** and the UI updates in **main.js**.

## ID: 14 - Email Validation
- **User Task**: Implement email validation in **AuthController** with regex validation.
  - Ensure email confirmation is sent via **EmailService** and handled on the frontend.

## ID: 15 - Confirm Password on Registration
- **User Task**: Add password confirmation field in **register.html**.
  - Validate password confirmation in **AuthController** before creating the user.

## ID: 16 - Help Modal
- **User Task**: Implement a help modal in **helpModal.js** and add the necessary frontend elements in **index.html**.

# Sprint 4
## ID: 17 - Change Settings
- **User Task**: Implement logic in **AuthController** to allow users to change their email and password.
  - Create a settings modal in **settingsModal.js** and **settings.html** for the UI.

## ID: 18 - Password Security
- **User Task**: Implement password strength criteria using regex in **AuthController**.
  - Ensure frontend validation in **register.html** for password strength (length, special characters).

## ID: 19 - App Logo and Unique Name
- **User Task**: Add the app's logo in **assets/icon.png**.
  - Set the app's name in **application.properties**.
