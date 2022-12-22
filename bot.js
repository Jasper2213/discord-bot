require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client();

let prefix = ";";

const token = process.env.TOKEN;
client.login(token);

client.on('ready', () => {
    console.log("Connected!")

    client.user.setActivity(" ", {type: "PLAYING"})

});

client.on('message', async (receivedMessage) => {
     // Prevent bot from responding to its own messages
    if (receivedMessage.author !== client.user)
    {
        if (receivedMessage.content.startsWith(prefix))
        {
            await processCommand(receivedMessage);
        }
        else if (receivedMessage.content.toLowerCase() === "thanks derry" || receivedMessage.content.toLowerCase() === "thank you derry")
        {
            receivedMessage.channel.send("You're welcome!");
        }
    }
});

async function processCommand(receivedMessage) {
    const fullCommand = receivedMessage.content.substr(1);    // Remove the prefix
    const splitCommand = fullCommand.split(" ");           // Split the message up in to pieces for each space
    const primaryCommand = splitCommand[0];                        // The first word directly after the prefix is the command
    const commandArguments = splitCommand.slice(1);                // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand);
    console.log("From:", receivedMessage.author.username + "#" + receivedMessage.author.discriminator);
    console.log("Arguments: " + commandArguments);                 // There may not be any arguments

    if (primaryCommand === "restart")
    {
        restart(receivedMessage);
    }
    else if (primaryCommand === "help")
    {
        helpCommand(receivedMessage);
    }
    else if (primaryCommand === "compliment")
    {
        giveCompliment(receivedMessage);
    }
    else if (primaryCommand === "clear")
    {
        await clearChat(receivedMessage, commandArguments);
    }
    else if (primaryCommand === "ping")
    {
        await ping(receivedMessage);
    }
    else if (primaryCommand === "8ball")
    {
        eight_ball(receivedMessage, commandArguments);
    }
    else if (primaryCommand === "annoy")
    {
        annoySomeone(receivedMessage, commandArguments);
    }
    else if (primaryCommand === "prefix")
    {
        setPrefix(receivedMessage, commandArguments);
    }
    else
    {
        receivedMessage.channel.send("What's that command lmao, type `" + prefix + "help` to get some help");
    }
}

function annoySomeone(receivedMessage, commandArguments) {
    const user = commandArguments[0];
    const amount = commandArguments[1];

    if (amount < 100)
    {
        if (amount !== "")
        {
            for (let i = 0; i < amount; i++)
            {
                receivedMessage.channel.send("Hi" + user);
            }
        }
        else
        {
            for (let i = 0; i < 5; i++)
            {
                receivedMessage.channel.send("Hi" + user);
            }
        }
    }
    else
    {
        receivedMessage.channel.send("Kleiner getal aub");
    }
}

function restart(receivedMessage) {
    receivedMessage.channel.send("I can't do that yet...");
}

function helpCommand(receivedMessage) {
    const possibleCommands = {
        "help": "Get help for all the commands",
        "clear [amount]":  "Clear [amount] messages",
        "ping": "ping the server",
        "8ball [question]": "Ask advice from the great and mighty 8ball!",
        "annoy [user][amount]": "Ping the user a certain amount of times",
        "compliment": "Get Derry to send you a compliment",
        "prefix": "Update prefix"
    };

    receivedMessage.channel.send("You need help huh? I guess you're in luck, here are the commands!");

    let output = "```";
    for (const command in possibleCommands)
    {
        output += command + " => " + possibleCommands[command] + "\n";
    }

    output += "```";

    receivedMessage.channel.send(output);
}

function giveCompliment(receivedMessage) {
    const compliments = [
        "You look beautiful today :)",
        "Looking gooddddd " + receivedMessage.author.toString(),
        "You're the best!",
        "Remember to love yourself! Whatever you think, you're pretty **af**",
        "Look into the mirror, and smile. See how beautiful you are and keep that thought.",
        "I love your outfit!",
        "You're very much appreciated.",
        "You do matter. Don't let anyone else let you think otherwise.",
        "You're more loved than you think :)",
        "No matter what, things will work out eventually.",
        "Be you. Always.",
        "Hey sexy :)"
    ];

    const index = Math.floor(Math.random() * compliments.length - 1);
    receivedMessage.channel.send(compliments[index]);
}

async function clearChat(receivedMessage, commandArguments) {
    const amount = commandArguments[0];

    if (!amount) {
        receivedMessage.channel.send("Please fill in a number!");
    }
    else if (isNaN(amount)) {
        receivedMessage.channel.send("That isn't a number dumbass");
    }
    else if (amount > 100) {
        receivedMessage.channel.send("The amount shouldn't be bigger than 100!");
    }
    else if (amount < 1) {
        receivedMessage.channel.send("The amount should be more than 1!");
    }
    else {
        await receivedMessage.channel.messages.fetch({limit: amount + 1})
            .then(messages => {
                messages.forEach(message => {
                    message.delete()
                        .catch(() => receivedMessage.channel.send("Cannot clear more messages."));
                });
            })
            .then(() => receivedMessage.channel.send(amount + " messages have been cleared!"));
    }
}

async function ping(receivedMessage) {
    const now = Date.now();
    await receivedMessage.channel.send("pong lmao");

    receivedMessage.channel.send("jk lol, your ping is " + (receivedMessage.createdTimestamp - now) + "ms");
}

function eight_ball(receivedMessage, commandArguments) {
    const reply = Math.floor(Math.random() * 4);
    let output = null;

    if (!commandArguments[0])
    {
        output = "Please ask a question.";
    }
    else
    {
        switch (reply)
        {
            case 0:
                output = "Yes";
                break;

            case 1:
                output = "Maybe";
                break;

            case 2:
                output = "No";
                break;

            case 3:
                output = "Try again";
                break;
        }
    }

    receivedMessage.channel.send(output);
}

function setPrefix(receivedMessage, commandArguments) {
    if (commandArguments[0]) {
        prefix = commandArguments[0];
        receivedMessage.channel.send("Prefix updated! New prefix is now: **" + prefix + "**");
    }
    else {
        receivedMessage.channel.send("Please provide a new prefix.");
    }
}