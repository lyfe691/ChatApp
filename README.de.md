[English](README.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [日本語](README.ja.md)

# ChatApp

## 🚀 Übersicht

**ChatApp** ist eine Echtzeit-Messaging-Plattform, die mit **Spring Boot** und **MongoDB** entwickelt wurde und reibungslose, Echtzeit-Kommunikation mit WebSocket-Unterstützung bietet. Die App verfügt über Benutzer-Authentifizierung, E-Mail-Verifizierung, Passwortzurücksetzung und Chatraum-Erstellung, was sie zu einer robusten Lösung für jede chatbezogene Anwendung macht.

### Hauptfunktionen
- 🌐 Echtzeit-Messaging mit WebSockets.
- 🗂️ Backend basierend auf Spring Boot und MongoDB zur Speicherung.
- 🔑 Benutzer-Authentifizierung mit E-Mail-Verifizierung und Passwortzurücksetzungsfunktion.
- 📱 Responsives Design für Desktop- und Mobilplattformen geeignet.
- 🛠️ Einfache, aber leistungsstarke Erstellung und Verwaltung von Chaträumen.

---

## 🛠️ Tech Stack

- **Backend**: Spring Boot, MongoDB
- **WebSocket**: Für Echtzeit-Kommunikation
- **Frontend**: HTML, CSS, JavaScript
- **Authentifizierung**: Spring Security (BCrypt für Passwort-Hashing, E-Mail-Verifizierung)
- **Build-Tool**: Maven

---

## 📋 Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass die folgenden Programme auf Ihrem lokalen Rechner installiert sind:

- **Git**: [Git installieren](https://git-scm.com/downloads)
- **Java 17 oder höher**: [Hier herunterladen](https://www.oracle.com/java/technologies/downloads/)
- **Maven**: [Maven installieren](https://maven.apache.org/install.html)
- **MongoDB**: [MongoDB installieren](https://www.mongodb.com/try/download/community) und sicherstellen, dass es läuft.

---

## ⚙️ Installation & Einrichtung

Um die Anwendung lokal einzurichten und auszuführen, folgen Sie diesen Schritten:

1. **Repository klonen**:
    ```bash
    git clone https://github.com/lyfe691/ChatApp.git
    cd ChatApp
    ```

2. **Umgebungsvariablen einrichten**:
    - Erstellen und konfigurieren Sie die `.env` Datei mit Ihren E-Mail-Zugangsdaten, um Verifizierungs- und Passwortzurücksetzungs-E-Mails zu senden:
      ```bash
      MAIL_USERNAME=<your_email>
      MAIL_PASSWORD=<your_password>
      ```

3. **Erforderliche Abhängigkeiten installieren**:
    Stellen Sie sicher, dass Maven installiert ist.
    ```bash
    mvn install
    ```

4. **Anwendung ausführen**:
    ```bash
    mvn spring-boot:run
    ```

5. **Auf die App zugreifen**:
    Öffnen Sie Ihren Browser und gehen Sie zu `http://localhost:8080`.

> **Hinweis**  
> Um von anderen Geräten innerhalb Ihres Netzwerks auf die App zuzugreifen, müssen Sie auf `http://<your-ip>:8080` zugreifen. Zusätzlich müssen Sie alle Vorkommen von `localhost` im Backend-Code durch Ihre IP-Adresse ersetzen.

---

## 🖥️ Nutzung

Sobald die Anwendung läuft:

1. **Registrieren**: Erstellen Sie ein Konto, um die Chat-Funktionen zu nutzen. Sie erhalten eine E-Mail zur Bestätigung Ihres Kontos.
2. **Anmelden**: Nach der Bestätigung melden Sie sich in der App an.
3. **Chatraum erstellen/beitreten**: Sie können entweder Ihren eigenen Chatraum erstellen oder einem bestehenden beitreten.
4. **Chat starten**: Senden und empfangen Sie Nachrichten in Echtzeit! (in Ihrem Netzwerk)

---

## 🛡️ Sicherheit

Diese App verwendet **Spring Security** mit den folgenden Funktionen:
- Passwortverschlüsselung mit BCrypt.
- E-Mail-Verifizierung für neue Benutzerregistrierungen.
- Passwortzurücksetzung per E-Mail-Token.

---

## 🤝 Beitrag leisten

Beiträge sind willkommen! So können Sie beitragen:

1. Forken Sie das Repository.
2. Erstellen Sie einen neuen Branch (`git checkout -b feature-branch`).
3. Committen Sie Ihre Änderungen (`git commit -m 'Add feature'`).
4. Pushen Sie den Branch (`git push origin feature-branch`).
5. Öffnen Sie einen Pull-Request.

---

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.

---
## 📈 Projekt-Roadmap

Geplante Funktionen und Verbesserungen:
- 🎨 **Benutzerdefinierte Avatare**.
- 🔔 **Push-Benachrichtigungen** für eingehende Nachrichten.
- 🌐 **Mehrsprachige Unterstützung**.
- 🔞 **Zensur**

Bleiben Sie für weitere Updates dran!

---

## 📬 Kontakt

Für Anfragen oder Feedback können Sie sich gerne über meine [Website](https://yanissebastianzuercher.ch/#contact) melden.