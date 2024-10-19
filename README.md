[English](README.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [日本語](README.ja.md)

# ChatApp

## 🚀 Overview

**ChatApp** is a real-time messaging platform built using **Spring Boot** and **MongoDB**, designed to provide smooth, real-time communication with WebSocket support. The app features user authentication, email verification, password reset, and chat room creation, making it a robust solution for any chat-related application.

### Key Features
- 🌐 Real-time messaging powered by WebSockets.
- 🗂️ Backend built with Spring Boot and MongoDB for persistence.
- 🔑 User authentication with email verification and password reset functionalities.
- 📱 Responsive design suitable for both desktop and mobile platforms.
- 🛠️ Simple but powerful chat room creation and management.

---

## 🛠️ Tech Stack

- **Backend**: Spring Boot, MongoDB
- **WebSocket**: For real-time communication
- **Frontend**: HTML, CSS, JavaScript
- **Authentication**: Spring Security (BCrypt for password hashing, Email verification)
- **Build Tool**: Maven

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Git**: [Install Git](https://git-scm.com/downloads)
- **Java 17 or higher**: [Download here](https://www.oracle.com/java/technologies/downloads/)
- **Maven**: [Install Maven](https://maven.apache.org/install.html)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community) and make sure it's running.

---

## ⚙️ Installation & Setup

To set up and run the application locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/lyfe691/ChatApp.git
    cd ChatApp
    ```

2. **Set up environment variables**:
    - Create and configure the `.env` file with your email credentials for sending verification and password reset emails:
      ```bash
      MAIL_USERNAME=<your_email>
      MAIL_PASSWORD=<your_password>
      ```

3. **Install the necessary dependencies**:
    Make sure you have Maven installed.
    ```bash
    mvn install
    ```

4. **Run the application**:
    ```bash
    mvn spring-boot:run
    ```

5. **Access the app**:
    Open your browser and go to `http://localhost:8080`.

> **Note**  
> To connect to the app from other devices within your network, you'll need to access it via `http://<your-ip>:8080`. Additionally, you must replace all instances of `localhost` in the backend code with your IP address.

---

## 🖥️ Usage

Once the application is running:

1. **Sign up**: Create an account to start using the chat features. You will receive an email to verify your account.
2. **Log in**: Once verified, log in to the app.
3. **Create/Join a chat room**: You can either create your own chat room or join an existing one.
4. **Start chatting**: Send and receive messages in real time! (in your network)

---

## 🛡️ Security

This app uses **Spring Security** with the following features:
- Password encryption with BCrypt.
- Email verification for new user registration.
- Password reset via email token.

---

## 🤝 Contributing

I welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
## 📈 Project Roadmap

Planned features and improvements:
- 🎨 **Custom user avatars**.
- 🔔 **Push notifications** for incoming messages.
- 🌐 **Multilingual support**.
- 🔞 **Censoring**

Stay tuned for more updates!

---

## 📬 Contact

For any inquiries or feedback, feel free to reach out via my [Website](https://yanissebastianzuercher.ch/#contact).
