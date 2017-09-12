const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

var prefix = config.prefix;

var servers = {};

client.on('ready', () => {
  console.log('Bot connected!');
  console.log('--------------------------------------------------------------------');
  console.log('Bot made by: JDJZ');
  console.log('');
  console.log('After this, the bot will log which commands were ran.');
  console.log('--------------------------------------------------------------------');
  console.log('');
  client.user.setPresence({ game: { name: config.prefix + "help | " + client.users.size + " users", type: 0 } });
});

const embed = {
  "color": 2403824,
  "footer": {
    "icon_url": "https://cdn.discordapp.com/avatars/349348109878296578/5fc6dba9b9b435dde997f3e9f18daa27.png",
    "text": "Wolf | Help Menu"
  },
  "author": {
    "name": "Wolf | Help Menu",
    "url": "https://discordapp.com",
    "icon_url": "https://cdn.discordapp.com/avatars/349348109878296578/5fc6dba9b9b435dde997f3e9f18daa27.png"
  },
  "fields": [
    {
      "name": config.prefix + "help",
      "value": "This will list all the commands!   ‍      ‍      ‍      ‍      ‍      ‍   ",
      "inline": true
    },
    {
      "name": config.prefix + "ping",
      "value": "This will ping the bot.",
      "inline": true
    },
    {
      "name": config.prefix + "say",
      "value": "This will make the bot say something.",
      "inline": true
    },
    {
      "name": config.prefix + "prune",
      "value": "***This will delete 100 messages! Be careful when using this command! There is no way to role it back!***",
      "inline": true
    },
    {
      "name": config.prefix + "invite",
      "value": "Gives an invite like for you to add me!",
      "inline": true
    },
    {
      "name": config.prefix + "play",
      "value": "Gives an invite like for you to add my brother, Wolf Music!",
      "inline": true
    },
  ]
};

function play(connection, message){
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[1], {filter: "audioonly"}));

  server.queue.shift();

  server.dispatcher.on ("end", function() {
    if(server.queue[2]) play(connection, message);
    else connection.disconnect();
  });

}

client.on('guildCreate', (guild) =>  {
    guild.channels.find("name", "general").send(`Thanks for adding me to your server! To get started please use #help. I am still in beta. Once I am out of beta, I will become online 24/7! If you need help, please message my owner <@173656340223229952>.
-Wolf :smiley:`)
  client.user.setPresence({ game: { name: config.prefix + "help | " + client.users.size + " users", type: 0 } });
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'logs');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
  client.user.setPresence({ game: { name: config.prefix + "help | " + client.users.size + " users", type: 0 } });
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'logs');
  if (!channel) return;
  channel.send(`${member} left the server. :sob:`);
  client.user.setPresence({ game: { name: config.prefix + "help | " + client.users.size + " users", type: 0 } });
});

client.on('message', message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(" ").slice(1);

  //Commands are from here on.

  if (command === 'prune'){
    message.delete();
    let messagecount = parseInt(100);
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    console.log("Ran prune command! | " + message.author.username + "#" + message.author.discriminator);

    message.channel.send("***Deleted past messages!***").then( m => m.delete(5000));
  }

  if (command === 'say') {
    message.delete();
    if (args.join(" ") === "")
    {
      message.channel.send(`${message.author}, Please put a valid message.`).then( m => m.delete(6000));
      console.log(message.author.username + "#" + message.author.discriminator + " did not put a valid message.");

    }else {
      message.channel.send(args.join(" "));
      console.log("Ran say command. The message said - \"" + args.join(" ") + "\" " + "| "+ message.author.username + "#" + message.author.discriminator);
    }
  }

  if (command === 'help') {
    message.delete();
    message.author.send({ embed } );
    console.log("Ran command help. | " + message.author.username + "#" + message.author.discriminator);
  }

  if (command === 'ping') {
    message.delete();
    message.channel.send(':ping_pong: pong').then( m => m.delete(7000));
    console.log("Ran command ping. | " + message.author.username + "#" + message.author.discriminator);
  }

  if (command === 'play') {
    message.delete();
    message.channel.send("This bot can not play music. Please add my brother, Wolf Music, to allow you play music. Add link: https://goo.gl/fzJXxJ");
    console.log("Ran command play. | " + message.author.username + "#" + message.author.discriminator);
  }
  if (command === 'invite') {
    message.delete();
    message.channel.send("I am sorry, I can not join invite links. You must add me to your server. Add me here: https://goo.gl/YuxTrH")


  }



});


client.login(config.token);
