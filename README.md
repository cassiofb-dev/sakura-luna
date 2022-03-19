<h1 align="center">
  Sakura Luna
</h1>

<h4 align="center">Sakura Luna Discord Bot</h4>

<p align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#using">Using</a> •
  <a href="#structure">Structure</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

## About

Sakura Luna is discord bot for promiving interactions between people and promoving art.

## Features

* Command Handler
  * All commands in ``src/commands`` folder are handled by default
  * All commands will also be published to discord API on start
  * Bult-in Commands:
    * ``ping``
    * ``custom-reply``
    * ``balance``
    * ``transfer``
    * ``pat``
    * ``hug``
    * ``kiss``
    * ``gif``
    * ``define``
    * ``art``
    * ``user-art``
    * ``guild-config``
    * ``usercard``
    * ``leaderboard``
    * ``giveaway``
* Events Handler
  * All events in ``src/events`` folder are handled by default
  * Bult-in Events:
    * ``interactionCreate``
    * ``messageCreate``
* Database
  * Bult-in database implementation
  * MONGODB is used because of excellent free tier
  * mongoose is used to model the data schema
* Level UP System
  * Experience will be granted to users that send messages on a server, with time they will level up
  * Bult-in implementation uses log2 function so the amount of messages needed will always double
* Custom Reply System
  * Users with Custom Reply Manager role will be granted permissions to manage bot custom replies
* Currency System
  * On first saved in database users will be granted 10 currencies
  * Users can transfer currency to another user
* Third party apis
  * Urban dictionary for definitions
  * Tenor for searching gifs
* Cross server Arts
* Guild Custom Config

## Using

To run this project you will need:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)

From your terminal run the commands:

```bash
git clone https://github.com/cassiofb-dev/sakura-luna

cd sakura-luna

npm i
```

Now make a ``.env`` file in the root folder with the variables needed in the ``config.js`` file.

After that run the command:

```bash
npm start
```

## Structure

* src - project source code folder
  * commands - all commands goes here
  * core - core things to run commands and events the heart of the project
    * apis - third party apis for searching medias like images, gifs and text or more
    * classes - classes declarations
    * database - all database implementation goes here
      * custom-reply - custom reply data modeling and services
      * guild-user - guild user data modeling and services
    * features - bot features
    * handlers - core handlers (commands, events and authorization)
  * events - all events goes here
  * config.js - bot configuration defined in .env file
  * main.js - main file, starts bot
* .env - env files (secrets)
* .gitignore - git doesn't track
* package.json - project package configuration, script and dependencies

```txt
📦src
 ┣ 📂commands
 ┃ ┣ 📜art.js
 ┃ ┣ 📜balance.js
 ┃ ┣ 📜custom-reply.js
 ┃ ┣ 📜define.js
 ┃ ┣ 📜gif.js
 ┃ ┣ 📜giveaway.js
 ┃ ┣ 📜guild-config.js
 ┃ ┣ 📜hug.js
 ┃ ┣ 📜kiss.js
 ┃ ┣ 📜leaderboard.js
 ┃ ┣ 📜pat.js
 ┃ ┣ 📜ping.js
 ┃ ┣ 📜transfer.js
 ┃ ┣ 📜user-art.js
 ┃ ┗ 📜usercard.js
 ┣ 📂core
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📜tenor.js
 ┃ ┃ ┗ 📜urban-dictionary.js
 ┃ ┣ 📂classes
 ┃ ┃ ┣ 📜command.js
 ┃ ┃ ┣ 📜discord-bot.js
 ┃ ┃ ┣ 📜embed-message.js
 ┃ ┃ ┗ 📜event.js
 ┃ ┣ 📂database
 ┃ ┃ ┣ 📂custom-reply
 ┃ ┃ ┃ ┣ 📜custom-repliy.js
 ┃ ┃ ┃ ┣ 📜custom-reply.model.js
 ┃ ┃ ┃ ┗ 📜custom-reply.service.js
 ┃ ┃ ┣ 📂guild-config
 ┃ ┃ ┃ ┣ 📜guild-config.js
 ┃ ┃ ┃ ┣ 📜guild-config.model.js
 ┃ ┃ ┃ ┗ 📜guild-config.service.js
 ┃ ┃ ┣ 📂guild-user
 ┃ ┃ ┃ ┣ 📜guild-user.js
 ┃ ┃ ┃ ┣ 📜guild-user.model.js
 ┃ ┃ ┃ ┗ 📜guild-user.service.js
 ┃ ┃ ┣ 📂user-art
 ┃ ┃ ┃ ┣ 📜user-art.js
 ┃ ┃ ┃ ┣ 📜user-art.model.js
 ┃ ┃ ┃ ┗ 📜user-art.service.js
 ┃ ┃ ┗ 📜database.js
 ┃ ┣ 📂features
 ┃ ┃ ┣ 📜currency-system.js
 ┃ ┃ ┣ 📜custom-reply-system.js
 ┃ ┃ ┣ 📜guild-config-system.js
 ┃ ┃ ┣ 📜level-up-system.js
 ┃ ┃ ┣ 📜media-system.js
 ┃ ┃ ┣ 📜user-art-system.js
 ┃ ┃ ┗ 📜user-system.js
 ┃ ┗ 📂handlers
 ┃ ┃ ┣ 📜authorization.handler.js
 ┃ ┃ ┣ 📜command.handler.js
 ┃ ┃ ┗ 📜event.handler.js
 ┣ 📂events
 ┃ ┣ 📜guild-member-add.dev
 ┃ ┣ 📜interaction-create.js
 ┃ ┗ 📜message-create.js
 ┣ 📜config.js
 ┗ 📜main.js
```

## Credits

This project uses the following open source projects:

* [Node.js](https://github.com/nodejs/node)
* [Discord.js](https://github.com/discordjs/discord.js)
* [dotenv](https://github.com/motdotla/dotenv)
* [mongoose](https://github.com/Automattic/mongoose)

## License

MIT

---

> [My website](https://cassiofernando.netlify.app/) &nbsp;&middot;&nbsp;
> GitHub [@cassiofb-dev](https://github.com/cassiofb-dev) &nbsp;&middot;&nbsp;
> Twitter [@cassiofb_dev](https://twitter.com/cassiofb_dev)
