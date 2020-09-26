const fs = require("fs");
var commands = {};
var helps = {};

fs.readdir("./commands/", (error, files) => {
    if(error) console.error(error);
    let jsfiles = files.filter(file => file.split(".").pop() === "js");

    if(jsfiles.length <= 0) {
        return console.log("There is no commands to load!");
    }
    console.log(`Loading ${jsfiles.length} files!`);

    jsfiles.forEach((file, i) => {
        let props = require(`../commands/${file}`);
        console.log(`${i + 1}: ${file} loaded!`);
        commands[props.config.name] = props;
        helps[props.config.name] = props.config.help;
    });
});

module.exports.get_commands = {
    "commands": commands,
    "helps": helps
};