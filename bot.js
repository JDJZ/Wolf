const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const YTDL = require('ytdl-core');


var prefix = config.prefix;

var servers = {};


const yt_api_key = config.yt_api_key

client.on('ready', () => {
  console.log('Bot connected!');
  console.log('');
  client.user.setPresence({ game: { name: config.prefix + "help | " + client.users.size + " users", type: 0 } });
});

//Help embed
const embed = {
  "color": 2403824,
  "footer": {
    "text": "Wolf Music | Help Menu"
  },
  "author": {
    "name": "Wolf Music | Help Menu",
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
      "name": config.prefix + "play",
      "value": "This will make the bot say something.",
      "inline": true
    },
    {
      "name": config.prefix + "clear",
      "value": "This will clear the queue.",
      "inline": true
    },
    {
      "name": config.prefix + "skip",
      "value": "This will force skip the current song playing.",
      "inline": true
    },
    {
      "name": config.prefix + "np",
      "value": "This will show the current song playing.",
      "inline": true
    },
    {
      "name": config.prefix + "disconnect",
      "value": "Force the music bot to leave the voice channel.",
      "inline": true
    },
    {
      "name": config.prefix + "invite",
      "value": "Gives an invite like for you to add me!",
      "inline": true
    },
  ]
};


function play(connection, message){
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

  server.queue.shift();

  server.dispatcher.on ("end", function() {
    if(server.queue[0]) play(connection, message);
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

  var args = message.content.substring(config.prefix.length).split(" ");

  switch (args[0].toLowerCase()) {
  case "play":
    message.delete();
    if (!args[1]) {
      message.channel.send("Please provide a link.");
      return;
    }

    if(!message.member.voiceChannel){
      message.channel.send("You must be in a voice channel.");
      return;
    }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
      queue: []

    }

    var server = servers[message.guild.id];

    server.queue.push(args[1]);


    if(!message.guild.voiceChannel) message.member.voiceChannel.join().then(function(connection) {
      play(connection, message)
    });

  break;

  case "help":
    message.delete();
    message.author.send({ embed } );

  break;

  case "invite":
  message.delete();
  message.channel.send("I am sorry, I can not join invite links. You must add me to your server. Add me here: https://goo.gl/fzJXxJ")
  break;

  case "ping":
  message.delete();
  message.channel.send(':ping_pong: pong').then( m => m.delete(7000));
  break;

  case "clear":
  message.delete();
    var server = servers[message.guild.id];

    if(messgae.guild.voiceConnection) message.guild.voiceConnection.disconnect();
  break;


}

});



client.login(config.token);
