<h1 align="center">
π€ Playzone Bot
</h1>

<div align="center">

Music bot application for discord using node.js + TypeScript, with support from [discord.js](https://discord.js.org) library and [discord-player](https://discord-player.js.org).

![](https://img.shields.io/badge/release-v1.0.0-52a49a)
![](https://img.shields.io/badge/yarn-%3E%3D%208.19.1-blue)
![](https://img.shields.io/badge/node-%3E%3D%2018.9.0-green)

[discord.js](https://discord.js.org/) Β· [discord-player](https://discord-player.js.org) Β· [@discordjs/opus](https://github.com/discordjs/opus) Β· [ffmpeg](https://ffmpeg.org)

</div>

<h2>ποΈ Index</h2>

- [π Technologies](#-technologies)
- [β¨ Features](#-features)
- [π Environment](#-environment)
- [β¨οΈ Commands](#οΈ-commands)
- [π¦ Install](#-install)
- [π¨ Build](#-build)
- [π Links](#-links)
- [π License](#-license)

## π Technologies

- π‘ TypeScript
- π€ discord.js
- π discord-player

## β¨ Features

- π₯ Play music from YouTube
- π΅ Play music from Spotify
- π§ Play music from SoundCloud

## π Environment

π Create **environment** variables .env file and add the keys TOKEN - will be the [value](https://discord.com/developers/applications) of your API key - and CLIENT_ID - will be your application ID

```bash
TOKEN=your_key
CLIENT_ID=your_id
```

## β¨οΈ Commands

π All commands available in playzone bot

|      **Name**      |           **Description**            | **Options** |
| :----------------: | :----------------------------------: | :---------: |
|     **/exit**      |  Kick the bot from the channel! π   |             |
|     **/help**      |      Show list of commands! π       |             |
|     **/pause**     |     Pauses the current song! βΈοΈ      |             |
| **/play playlist** |         Plays a playlist! π΅         |   \<url>    |
|   **/play song**   |       Plays a single song! π΅        |   \<url>    |
|  **/play search**  |  Searchs for a song and play it! π΅  |  \<query>   |
|     **/queue**     | Show first 10 songs in the queue! π |             |
|    **/resume**     |     Resumes the current song! π΅     |             |
|     **/skip**      |      Skips the current song! β­οΈ      |             |

## π¦ Install

π Install the dependencies and **start** the project

```bash
npm install
npm run dev
```

## π¨ Build

π **Build** the application for **production**

```bash
npm run build
```

## π Links

- [Discord js](https://discord.js.org)
- [Discord Player](https://discord-player.js.org)
- [Discord js Opus](https://github.com/discordjs/opus)
- [Github](https://github.com/andersonsrocha)
- [LinkedIn](https://www.linkedin.com/in/anderson-silva-a40926192)

## π License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.
