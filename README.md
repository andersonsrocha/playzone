<h1 align="center">
🤖 Playzone Bot
</h1>

<div align="center">

![](https://img.shields.io/badge/release-v1.0.0-52a49a)
![](https://img.shields.io/badge/yarn-%3E%3D%208.19.1-blue)
![](https://img.shields.io/badge/node-%3E%3D%2018.9.0-green)

</div>

- [📄 About](#-about)
- [🚀 Technologies](#-technologies)
- [✨ Features](#-features)
- [📑 Environment](#-environment)
- [⌨️ Commands](#️-commands)
- [📦 Install](#-install)
- [🔨 Build](#-build)
- [🔗 Links](#-links)
- [📝 License](#-license)

## 📄 About

📝 Music bot application for discord using node.js + TypeScript, with support from [discord.js](https://discord.js.org) library and [discord-player](https://discord-player.js.org).

## 🚀 Technologies

- 💡 **TypeScript**
- 🤖 **discord.js**
- 🔊 **discord-player**

## ✨ Features

- 🔥 **Play music from YouTube**
- 🎵 **Play music from Spotify**
- 🎧 **Play music from SoundCloud**

## 📑 Environment

📝 Create **environment** variables .env file and add the keys TOKEN - will be the [value](https://discord.com/developers/applications) of your API key - and CLIENT_ID - will be your application ID

```bash
TOKEN=your_key
CLIENT_ID=your_id
```

## ⌨️ Commands

📝 All commands available in playzone bot

|      **Name**      |           **Description**            | **Options** |
| :----------------: | :----------------------------------: | :---------: |
|     **/exit**      |  Kick the bot from the channel! 🔇   |             |
|     **/help**      |      Show list of commands! 📋       |             |
|     **/pause**     |     Pauses the current song! ⏸️      |             |
| **/play playlist** |         Plays a playlist! 🎵         |   \<url>    |
|   **/play song**   |       Plays a single song! 🎵        |   \<url>    |
|  **/play search**  |  Searchs for a song and play it! 🎵  |  \<query>   |
|     **/queue**     | Show first 10 songs in the queue! 📋 |             |
|    **/resume**     |     Resumes the current song! 🎵     |             |
|     **/skip**      |      Skips the current song! ⏭️      |             |

## 📦 Install

📝 Install the dependencies and **start** the project

```bash
npm install
npm run dev
```

## 🔨 Build

📝 **Build** the application for **production**

```bash
npm run build
```

## 🔗 Links

- [Discord js](https://discord.js.org)
- [Discord Player](https://discord-player.js.org)
- [Github](https://github.com/andersonsrocha)
- [LinkedIn](https://www.linkedin.com/in/anderson-silva-a40926192)

## 📝 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.
