[English](README.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Español](README.es.md) | [日本語](README.ja.md)

# ChatApp

## 🚀 概要

**ChatApp**は、**Spring Boot**と**MongoDB**を使用した実時間メッセージプラットフォームです。WebSocketの支援により、滑らかな実時間通信を実現します。ユーザー認証、メール確認、パスワードリセット、チャットルームの作成などの機能を兼ね備えた、チャット用アプリに有用な、高機能な解決策です。

### 主な機能
- 🌐 WebSocketによる実時間メッセージング
- 🿴 Spring BootとMongoDBを使用したバックエンドシステム
- 🔑 ユーザー認証、メール確認、パスワードリセット機能
- 📱 デスクトップとモバイルプラットフォーム用のレスポンシブデザイン
- 🛠️ 簡単ながらも強力なチャットルームの作成と管理

---

## 🛠️ 技術スタック

- **バックエンド**: Spring Boot, MongoDB
- **WebSocket**: 実時間通信用
- **フロントエンド**: HTML, CSS, JavaScript
- **認証**: Spring Security (BCryptでパスワードをハッシング、メール確認)
- **ビルドツール**: Maven

---

## 📋 必要な環境

開始する前に、以下がローカルマシンにインストールされている事を確認してください:

- **Git**: [Gitをインストール](https://git-scm.com/downloads)
- **Java 17以上**: [ここからダウンロード](https://www.oracle.com/java/technologies/downloads/)
- **Maven**: [Mavenをインストール](https://maven.apache.org/install.html)
- **MongoDB**: [MongoDBをインストール](https://www.mongodb.com/try/download/community) し、それが起動している事を確認

---

## ⚙️ インストールと設定

ローカルでアプリを設定して起動するために、次のステップを実行してください:

1. **リポジトリをクローン**:
    ```bash
    git clone https://github.com/lyfe691/ChatApp.git
    cd ChatApp
    ```

2. **環境変数を設定**:
    - メール確認やパスワードリセットメールを送信するための`.env`ファイルを作成して設定します:
      ```bash
      MAIL_USERNAME=<your_email>
      MAIL_PASSWORD=<your_password>
      ```

3. **必要な依存関係をインストール**:
    Mavenがインストールされている事を確認してください。
    ```bash
    mvn install
    ```

4. **アプリを起動**:
    ```bash
    mvn spring-boot:run
    ```

5. **アプにアクセス**:
    ブラウザを開き、`http://localhost:8080`にアクセスします。

> **注意**  
> ネットワーク内の他のデバイスからアプに接続するには、`http://<your-ip>:8080`を使用する必要があります。また、バックエンドコード中の`localhost`の全ての出現をあなたのIPアドレスに置き換える必要があります。

---

## 🖥️ 使い方

アプリが起動したら:

1. **サインアップ**: アカウントを作成してチャット機能を使い始めます。メールで確認リンクを受信します。
2. **ログイン**: 確認後、アプにログインします。
3. **チャットルームを作成/参加**: 自分のチャットルームを作成するか、既存のものに参加することができます。
4. **チャット開始**: 実時間でメッセージを送受信します（同じネットワーク内）

---

## 🛡️ セキュリティ

このアプは**Spring Security**を使用した次のセキュリティ機能を有しています:
- BCryptを使用したパスワードの暗号化
- 新規登録用メール確認
- メールトークンを使用したパスワードリセット

---

## 🤝 貢献

貢献を歓迎します！貢献するには:

1. リポジトリをフォークします。
2. 新しいブランチを作成します（`git checkout -b feature-branch`）。
3. 変更をコミットします（`git commit -m 'Add feature'`）。
4. ブランチにプッシュします（`git push origin feature-branch`）。
5. プルリクエストを開いてください。

---

## 📜 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細については[LICENSE](LICENSE)ファイルをご覧ください。

---
## 📈 プロジェクトロードマップ

予定された機能や改善:
- 🎭 **カスタムユーザーアバター**
- 📢 **メッセージのプッシュ通知**
- 🌐 **多言語支援**
- 🌞 **センサーリング**

更新をお楽しみに！

---

## 🛍️ コンタクト

いかなご意見やフィードバックがあれば、私の[Website](https://yanissebastianzuercher.ch/#contact)からお気軽にお問い合わせください。