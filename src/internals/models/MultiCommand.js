module.exports = class MultiCommand {
    constructor({
        name,
        description, 
        sub_commands
    }) {
        this._name = name;
        this._usage = "[sub-command] [..args]";
        this._description = description;
        this._sub_commands = sub_commands;
    }

    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get usage() {
        return this._usage;
    }
    get sub_commands() {
        return this._sub_commands;
    }

    async execute(message, [option, ...args]) {
        if(!option) return message.channel.send(`Options for this are: ${this.sub_commands.join(", ")}`)
        if(!this.sub_commands.includes(option)) return message.channel.send(`That option does not exist. Avaliable options are: ${this.sub_commands.join(", ")}`);
        let path = `../../commands/${this.name}/${option}`;
        let sub_command = require(path);
        if(!args) return message.channel.send(`Usage for ${option}.\nUsage: \`${message.client.prefix}${option} ${sub_command.usage}\`\nExample: \`${message.client.prefix}${option} ${sub_command.example}\`\nDescription: \`${sub_command.description}\``);
        return sub_command.execute(message, args)
    }
};