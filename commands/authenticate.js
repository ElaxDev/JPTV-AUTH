const db = require('../db/database');

module.exports.run = async (bot, message, args) => {
  let author = message.author;
  let member = message.member;
  let guild = message.guild;
  let username;
  let PID;

  memberRole = await member.roles.cache.find(role => role.name.toLowerCase() === 'user');

  if(memberRole !== undefined) {
    return message.reply(`you are already a User!`);
  }

  message.reply(`check your Dm's!`);

  async function awaitMsgs() {
      const filter = msg => msg.content;
      var msgs = await author.dmChannel.awaitMessages(filter,
        { time: 60000, max: 1, errors: ["time"] }
      ).then(collected => collected.map(msg => msg.content).join(" "));
      return msgs;
  }

  await author.send({
    embed: {
      color: 4281702,
      description: 'Please send your site username:'
    }
  });

  try {
    username = await awaitMsgs();
  } catch (error) {
    return author.send({
      embed: {
        color: 15417396,
        description: "You didn't answer in the time limit!"
      }
    });
  }

  await author.send({
    embed: {
      color: 4281702,
      description: 'Now send your user PID:'
    }
  });
  try {
    PID = await awaitMsgs();
    } catch (error) {
    return author.send({
      embed: {
        color: 15417396,
        description: "You didn't answer in the time limit!"
      }
    });
  }

  const user = await db.query(
    `SELECT * FROM users WHERE 
    username = '${username}' AND passkey = '${PID}'`);

  if(user.length) {
    let role = await guild.roles.cache
    .find(role => role.name === 'User');
    if (role !== undefined) {
      await member.roles.add(role);
      await message.member.setNickname(user[0].username);
    } else {
      role = await guild.roles.create({
          data: {
          name: 'User',
          mentionable: false
        }
      }).catch(() => {
        author.send({
          embed: {
            color: 15417396,
            description: "I couldn't create the role necessary to give you permissions to access the server"
          }
        });
      });
      try {
        await member.roles.add(role);
      } catch (DiscordAPIError) {
        return author.send("An error ocurred, this probably means I don't have the neccessary permissions to give you a role, contact the server administrator.")
      }
      if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')){
        return console.log(`I don't have permission to change users nickname, 
        please give me a role with the "MANAGE NICKNAMES" permission`);
      } else {
        await message.member.setNickname(user[0].username);
      }
    }
    return author.send({
      embed: {
        color: 4281702,
        description: 'You can now access the server!'
      }
    });
  }
  return author.send({
    embed: {
      title: 'Authentication failed!',
      color: 15417396,
      description: 'The authentication failed, check your credentials and try again'
    }
  });
};

module.exports.config = {
  name: 'authenticate',
  help: 'Authenticates you in the server proving that you are part of the tracker.'
};
