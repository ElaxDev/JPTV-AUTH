# JPTV-AUTH

 An user authentication bot for the [JPTV Club](https://jptv.club/) Discord server, but works with any [Unit3D](https://github.com/HDInnovations/UNIT3D-Community-Edition) private torrent tracker.

## Setup

  1. Run `npm install` in the bot's root folder.
  2. Edit the .env file and fill the corresponding data:

    NODE_ENV=production
    TOKEN=YOUR TOKEN GOES HERE
    PREFIX=YOUR PREFIX GOES HERE

  3. Configure the keys.js file in the db folder.
  4. Use `npm run start` to start the bot.
  5. After joining the bot to the Discord server create a role named "User", which is the one the authenticated users will have, so it should have the permission to use all the channels the authenticated users should read and write into.
  6. Change the permission of the "everyone" role so new users can't be able to see the channels authenticated users should, but they are able to read and type in the channel they are going to authenticate in.

## Usage
 
 1. Type `<prefix>authenticate` for example: `j!authenticate`. The bot will send a DM to the user and is going to ask for the username in the site.
 2. Send your site username within the next 60 seconds, if you fail to do so the bot will let you know it by sending you a message and you will have to start the process from the begginning.
 3. After sending the username it will ask for your PID.
 4. Send your PID.
 5. If all the information is correct it will let you access the server.
