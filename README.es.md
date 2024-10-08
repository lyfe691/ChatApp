[English](README.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [日本語](README.ja.md)

# ChatApp

## 🚀 Descripción General

**ChatApp** es una plataforma de mensajería en tiempo real construida con **Spring Boot** y **MongoDB**, diseñada para proporcionar una comunicación fluida y en tiempo real con soporte para WebSocket. La aplicación cuenta con autenticación de usuarios, verificación de correo electrónico, restablecimiento de contraseñas y creación de salas de chat, lo que la convierte en una solución robusta para cualquier aplicación de chat.

### Funcionalidades Clave
- 🌐 Mensajería en tiempo real impulsada por WebSockets.
- 🗂️ Backend construido con Spring Boot y MongoDB para persistencia.
- 🔑 Autenticación de usuarios con verificación de correo electrónico y restablecimiento de contraseñas.
- 📱 Diseño responsive adecuado para plataformas de escritorio y móviles.
- 🛠️ Creación y gestión de salas de chat sencilla pero poderosa.

---

## 🛠️ Stack Tecnológico

- **Backend**: Spring Boot, MongoDB
- **WebSocket**: Para comunicación en tiempo real
- **Frontend**: HTML, CSS, JavaScript
- **Autenticación**: Spring Security (BCrypt para hashing de contraseñas, verificación por correo electrónico)
- **Herramienta de Build**: Maven

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener los siguientes elementos instalados en tu máquina local:

- **Git**: [Instalar Git](https://git-scm.com/downloads)
- **Java 17 o superior**: [Descargar aquí](https://www.oracle.com/java/technologies/downloads/)
- **Maven**: [Instalar Maven](https://maven.apache.org/install.html)
- **MongoDB**: [Instalar MongoDB](https://www.mongodb.com/try/download/community) y asegúrate de que esté en funcionamiento.

---

## ⚙️ Instalación y Configuración

Para configurar y ejecutar la aplicación localmente, sigue estos pasos:

1. **Clonar el repositorio**:
    ```bash
    git clone https://github.com/lyfe691/ChatApp.git
    cd ChatApp
    ```

2. **Configurar las variables de entorno**:
    - Crea y configura el archivo `.env` con tus credenciales de correo electrónico para enviar correos electrónicos de verificación y restablecimiento de contraseña:
      ```bash
      MAIL_USERNAME=<tu_correo>
      MAIL_PASSWORD=<tu_contraseña>
      ```

3. **Instalar las dependencias necesarias**:
    Asegúrate de que Maven esté instalado.
    ```bash
    mvn install
    ```

4. **Ejecutar la aplicación**:
    ```bash
    mvn spring-boot:run
    ```

5. **Acceder a la aplicación**:
    Abre tu navegador y ve a `http://localhost:8080`.

> **Nota**  
> Para acceder a la aplicación desde otros dispositivos dentro de tu red, deberás acceder mediante `http://<tu-ip>:8080`. Además, debes reemplazar todas las instancias de `localhost` en el código backend con tu dirección IP.

---

## 🖥️ Uso

Una vez que la aplicación esté en funcionamiento:

1. **Registrarse**: Crea una cuenta para empezar a utilizar las funciones de chat. Recibirás un correo electrónico para verificar tu cuenta.
2. **Iniciar sesión**: Una vez verificado, inicia sesión en la aplicación.
3. **Crear/Unirse a una sala de chat**: Puedes crear tu propia sala de chat o unirte a una existente.
4. **Comenzar a chatear**: ¡Envía y recibe mensajes en tiempo real! (en tu red)

---

## 🛡️ Seguridad

Esta aplicación utiliza **Spring Security** con las siguientes características:
- Encriptación de contraseñas con BCrypt.
- Verificación por correo electrónico para nuevas registraciones de usuarios.
- Restablecimiento de contraseña mediante un token por correo electrónico.

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Para contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-branch`).
3. Haz commit de tus cambios (`git commit -m 'Add feature'`).
4. Push a la rama (`git push origin feature-branch`).
5. Abre un pull request.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---
## 📈 Roadmap del Proyecto

Características y mejoras previstas:
- 🎨 **Avatares personalizados para los usuarios**.
- 🔔 **Notificaciones push** para mensajes entrantes.
- 🌐 **Soporte multilingüe**.
- 🔞 **Censura**

¡Mantente atento para más actualizaciones!

---

## 📬 Contacto

Para cualquier consulta o comentario, no dudes en ponerte en contacto a través de mi [Sitio Web](https://yanissebastianzuercher.ch/#contact).