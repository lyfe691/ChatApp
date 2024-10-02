
# User Tasks

# Sprint 1

## ID: 1 - Zugriff auf GitHub-Versionen
- **User Task**: Sicherstellen, dass das GitHub-Repository ordnungsgemäss für die Versionierung der ChatApp eingerichtet ist.
  - Commiten und Pushen der neuesten stabilen Version auf GitHub.

## ID: 2 - Nachrichten senden und empfangen
- **User Task**: Implementieren des Nachrichtenversands und Empfangs im **ChatController** und Aktualisierung des **MessageRepository**.
  - WebSocket-Logik in **WebSocketConfig** hinzufügen, um Echtzeitkommunikation zu ermöglichen.
  - **Message**-Modell modifizieren, um Benutzernachrichten und Zeitstempel zu verarbeiten.

## ID: 2.1 - Textfeld für Nachrichten
- **User Task**: Implementieren des Nachrichteneingabefeldes in **index.html**.
  - Ein Formular für die Nachrichteneingabe und eine Schaltfläche zum Senden der Nachrichten erstellen.
  - Eingaben vom Formular an **ChatController** senden, um WebSocket-Nachrichten zu verschicken.

## ID: 2.2 - Chatverlauf anzeigen
- **User Task**: Chatverlauf in **ChatController** implementieren, um Nachrichten in **MessageRepository** zu speichern.
  - Vergangene Nachrichten in **index.html** anzeigen, wenn ein Benutzer die Seite aktualisiert.

## ID: 2.3 - Benutzernamen anzeigen
- **User Task**: **index.html** so modifizieren, dass der Name des Gesprächspartners angezeigt wird.
  - Sicherstellen, dass **main.js** die Benutzernamen aus **Backend** abruft und an das Frontend weiterleitet.

## ID: 3 - Klare UI für Chats
- **User Task**: Eine einfache und intuitive Benutzeroberfläche für das Chatfenster in **main.css** erstellen.
  - Responsives Layout für Chatfenster in **index.html** implementieren.

## ID: 3.2 - Kompatibilität mit Mobilgeräten
- **User Task**: Sicherstellen, dass das UI in **index.html** responsiv ist.
  - Mobilspezifisches Styling in **main.css** hinzufügen, um die Benutzererfahrung auf Mobilgeräten zu verbessern.

## ID: 4 - Benutzeranmeldung
- **User Task**: Login-Funktionalität in **AuthController** und **User** implementieren.
  - Benutzer können sich mit E-Mail, Passwort und Benutzername anmelden.
  - Anmeldeformular und Logik in **login.html** und **main.js** hinzufügen.

## ID: 5 - Benutzerregistrierung
- **User Task**: Benutzerregistrierung in **register.html** mit Validierungslogik in **AuthController** implementieren.
  - Eingabefelder validieren und sicherstellen, dass der Benutzer in **UserService** erstellt wird.
  - E-Mail-Bestätigungslogik und Token-Generierung in **AuthController** implementieren.

## ID: 6 - Erstellen und Wechseln von Chats
- **User Task**: Logik in **ChatController** implementieren, um mehrere Chaträume zu verwalten.
  - Frontend in **index.html** und **main.js** aktualisieren, um zwischen Räumen zu wechseln.
  - Eine Benutzeroberfläche für die Raumverwaltung in **main.css** erstellen.

## ID: 7 - Einzigartige Benutzernamen
- **User Task**: Logik in **UserRepository** hinzufügen, um doppelte Benutzernamen zu überprüfen und eine Fehlermeldung anzuzeigen, wenn der Benutzername bereits existiert.

## ID: 8 - Passwort-Hashing
- **User Task**: Passwort-Hashing in **WebSecurityConfig** implementieren, bevor das Passwort in der Datenbank gespeichert wird.
  - **BCryptPasswordEncoder** zum Hashen der Passwörter verwenden.

# Sprint 2

## ID: 9 - Passwort zurücksetzen
- **User Task**: Passwort-zurücksetzen-Funktionalität in **AuthController** mithilfe des **PasswordResetTokenRepository** implementieren.
  - Passwort-Zurücksetzungs-E-Mail mithilfe von **EmailService** erstellen.
  - **reset-password.html** hinzufügen, um das Eingabeformular für die Passwortzurücksetzung zu verarbeiten.

## ID: 10 - Nachrichtenlänge begrenzen
- **User Task**: Zeichenlimit (1500) für Nachrichten in **main.js** hinzufügen.
  - "Mehr anzeigen"-Schaltfläche für längere Nachrichten in **index.html** umsetzen.

## ID: 11 - Rauminfo anzeigen
- **User Task**: Die Benutzeroberfläche in **index.html** aktualisieren, um anzuzeigen, in welchem Raum sich der Benutzer befindet.

## ID: 12 - Raumbegrenzung
- **User Task**: Sicherstellen, dass jeder Benutzer nur einen Raum in **ChatController** erstellen kann.
  - Fehlerbehandlung in **main.js** und Frontend-Nachrichten für Überschreiten der Raumlimits hinzufügen.

# Sprint 3

## ID: 13 - Chat löschen
- **User Task**: Löschfunktion für Chats im **ChatController** implementieren.
  - Sicherstellen, dass der Chat aus **MessageRepository** entfernt und das UI in **main.js** aktualisiert wird.

## ID: 14 - E-Mail-Validierung
- **User Task**: E-Mail-Validierung in **AuthController** implementieren.
  - Sicherstellen, dass die E-Mail-Bestätigung über **EmailService** gesendet und im Frontend verarbeitet wird.

## ID: 15 - Passwort bei Registrierung bestätigen
- **User Task**: Passwortbestätigungsfeld in **register.html** hinzufügen.
  - Passwortbestätigung in **AuthController** validieren, bevor der Benutzer erstellt wird.

## ID: 16 - Hilfe-Modal
- **User Task**: Hilfe-Modal in **helpModal.js** implementieren und die notwendigen Frontend-Elemente in **index.html** hinzufügen.

## ID: 17 - Einstellungen ändern
- **User Task**: Logik in **AuthController** implementieren, um Benutzern das Ändern ihrer E-Mail und ihres Passworts zu ermöglichen.
  - Einstellungs-Modal in **settingsModal.js** und **index.html** für das UI erstellen.
