# Simple Discord bot coded in JavaScript

## Setting up
To start, run the 
```bash
$ npm install
```
command to install the necessary packages.

To set up the bot, simply create a .env file in the same folder.
<br>
In this file, put `TOKEN=token_here` (without "" or similar)

Example: TOKEN=abc123

## Running the bot
To run the bot, simply run
```bash
$ npm start
```
in a terminal and the server will start. Whenever you make changes to the server, it will automatically restart, thanks to the `nodemon` package. A message `Connected` will show when the bot is connected.

## Prefix
Default prefix: `;` <br>
To change the prefix, change the line 
```js
let prefix = ";";
```
to a prefix of your choice.

## Commands
- `Help`
  - Get a simple overview of these commands.
- `Compliment`
  - Get the bot to give you a compliment to brighten up your day! 
- `Clear [amount]`
  - Clear previous messages.
- `Ping`
  - Will ping server in the future, now just returns `pong`. 
- `8ball`
  - Ask the great and mighty 8-ball a question, and it will reply with either `yes`, `no`, `maybe` or `try again`. 
- `Annoy [user] [amount]`
  - Annoy a user by pinging them for [amount] times. Tag the user in the command to annoy the right user!
- `Prefix`
  - Change the prefix used by the bot.