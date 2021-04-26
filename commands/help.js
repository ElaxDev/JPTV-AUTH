var command_finder = require("../managers/commands_finder.js");
module.exports.run = async (bot, message, args) => {
  // TODO
  let helps = command_finder.get_commands.helps;
  if (!args[0]) {
    let description = "You need to write the command you want help with!\n" +
    "Example: `>help [command]`\n\nCommands List:\n";
    Object.keys(helps).forEach((key, i) => {
      description = description + `${i+1}) ${key[0].toUpperCase() +  
        key.slice(1)}\n`;
    });
    
    return message.channel.send({
      embed: {
        title: "Usage",
        color: 4644404,
        description: description
      }
    });
  }
  console.log(helps[args[0]]);
  return message.channel.send({
    embed: {
      title: `Help:`,
      color: 4644404,
      description: helps[args[0]]
    }
  });
};

module.exports.config = {
  name: "help",
  help: "Shows this message\n\nUsage:`>help [command]`"
};
