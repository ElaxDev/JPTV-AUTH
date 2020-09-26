const Discord = require('discord.js');
require('dotenv').config();
const PREFIX = process.env.PREFIX;
const TOKEN = process.env.TOKEN;
const bot = new Discord.Client({
  disableEveryone: false
});

var command_finder = require('./managers/commands_finder.js');
var commands = command_finder.get_commands.commands;

function run_command(bot, message, command, args) {
  if (!command.startsWith(PREFIX)) return;
  let commandName = command.slice(2);
  if (commandName in commands) {
    commands[commandName].run(bot, message, args);
  }
}

bot.on('ready', async () => {
  console.log(`${bot.user.username} is ready!\n`);
});

bot.on('message', async message => {
  if (message.author.bot) return;

  let messageArray = message.content.split(' ');
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  run_command(bot, message, command, args);
});

bot.login(TOKEN);
