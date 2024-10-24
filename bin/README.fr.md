[English](README.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [日本語](README.ja.md)

# ChatApp

## 🚀 Aperçu

**ChatApp** est une plateforme de messagerie en temps réel construite avec **Spring Boot** et **MongoDB**, conçue pour offrir une communication fluide en temps réel avec le support WebSocket. L'application propose l'authentification des utilisateurs, la vérification par e-mail, la réinitialisation de mot de passe et la création de salons de discussion, en faisant une solution robuste pour toute application de chat.

### Fonctionnalités principales
- 🌐 Messagerie en temps réel avec WebSockets.
- 🗂️ Backend basé sur Spring Boot et MongoDB pour la persistance.
- 🔑 Authentification des utilisateurs avec vérification par e-mail et réinitialisation de mot de passe.
- 📱 Design responsive adapté aux plateformes de bureau et mobiles.
- 🛠️ Création et gestion de salons de discussion simple mais puissante.

---

## 🛠️ Stack Technique

- **Backend**: Spring Boot, MongoDB
- **WebSocket**: Pour la communication en temps réel
- **Frontend**: HTML, CSS, JavaScript
- **Authentification**: Spring Security (BCrypt pour le hachage des mots de passe, vérification par e-mail)
- **Outil de Build**: Maven

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine locale :

- **Git**: [Installer Git](https://git-scm.com/downloads)
- **Java 17 ou supérieur**: [Télécharger ici](https://www.oracle.com/java/technologies/downloads/)
- **Maven**: [Installer Maven](https://maven.apache.org/install.html)
- **MongoDB**: [Installer MongoDB](https://www.mongodb.com/try/download/community) et assurez-vous qu'il soit en cours d'exécution.

---

## ⚙️ Installation & Configuration

Pour configurer et exécuter l'application localement, suivez ces étapes :

1. **Cloner le dépôt** :
    ```bash
    git clone https://github.com/lyfe691/ChatApp.git
    cd ChatApp
    ```

2. **Configurer les variables d'environnement** :
    - Créez et configurez le fichier `.env` avec vos identifiants de messagerie pour l'envoi des e-mails de vérification et de réinitialisation de mot de passe :
      ```bash
      MAIL_USERNAME=<votre_email>
      MAIL_PASSWORD=<votre_mot_de_passe>
      ```

3. **Installer les dépendances nécessaires** :
    Assurez-vous que Maven est installé.
    ```bash
    mvn install
    ```

4. **Exécuter l'application** :
    ```bash
    mvn spring-boot:run
    ```

5. **Accéder à l'application** :
    Ouvrez votre navigateur et rendez-vous sur `http://localhost:8080`.

> **Remarque**  
> Pour accéder à l'application depuis d'autres appareils au sein de votre réseau, vous devrez utiliser `http://<votre-ip>:8080`. De plus, vous devez remplacer toutes les occurrences de `localhost` dans le code backend par votre adresse IP.

---

## 🖥️ Utilisation

Une fois l'application lancée :

1. **Inscription** : Créez un compte pour commencer à utiliser les fonctionnalités de chat. Vous recevrez un e-mail pour vérifier votre compte.
2. **Connexion** : Une fois vérifié, connectez-vous à l'application.
3. **Créer/Rejoindre un salon de discussion** : Vous pouvez soit créer votre propre salon de discussion, soit rejoindre un salon existant.
4. **Commencer à discuter** : Envoyez et recevez des messages en temps réel ! (dans votre réseau)

---

## 🛡️ Sécurité

Cette application utilise **Spring Security** avec les fonctionnalités suivantes :
- Chiffrement des mots de passe avec BCrypt.
- Vérification par e-mail pour les nouvelles inscriptions d'utilisateurs.
- Réinitialisation de mot de passe via un jeton par e-mail.

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le dépôt.
2. Créez une nouvelle branche (`git checkout -b feature-branch`).
3. Committez vos modifications (`git commit -m 'Add feature'`).
4. Poussez la branche (`git push origin feature-branch`).
5. Ouvrez une pull request.

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---
## 📈 Roadmap du Projet

Fonctionnalités et améliorations prévues :
- 🎨 **Avatars personnalisés pour les utilisateurs**.
- 🔔 **Notifications push** pour les messages entrants.
- 🌐 **Support multilingue**.
- 🔞 **Censure**

Restez à l'écoute pour plus de mises à jour !

---

## 📬 Contact

Pour toute question ou commentaire, n'hésitez pas à me contacter via mon [Site Web](https://yanissebastianzuercher.ch/#contact).