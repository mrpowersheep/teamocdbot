const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const bot = new Discord.Client({ disableEveryone: false });

bot.on("ready", () => {
  console.log("Ready");
  bot.user.setGame(config.status);
});

bot.on("guildCreate", guild => {
  let defaultChannel = "";
  guild.channels.forEach(channel => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });

  defaultChannel.send(``, {});
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}mail`) {
    if (message.channel.id === config.mailchannel) {
      let channel = bot.channels.get(config.inboxchannel);
      let dMessage = args.join(" ").slice(0);
      if (dMessage.length < 1)
        return message.reply("You must supply a message!");

      channel.send(`${message.author} sent some mail: **${dMessage}**`);

      message.author.send(
        `Yo, ${message.author} you have sent your mail, you will get reply here soon!`
      );
    }
  }
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}reply`) {
    if (message.channel.id === config.inboxchannel) {
      let user =
        message.guild.member(message.mentions.users.first()) ||
        message.guild.members.get(args[0]);

      if (!user)
        return message.channel.send("Mention user to send reply back to them!");
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.reply("You can't use that command!");
      let dMessage = args.join(" ").slice(22);
      if (dMessage.length < 1)
        return message.reply("You must supply a message!");

      user.send(
        `${message.author} A moderator replied to your message: **${dMessage}**`
      );

      message.channel.send(`Replied to ${user}`);
    }
  }

let channel2 = bot.channels.get(config.announcementchannel);
  let aMessage = args.join(" ").slice(0);
  
if (cmd === `${prefix}announcement`) { 
 if (message.member.roles.some(role => role.name === 'Admin')) {
       
   } else {
       message.channel.send("You do not have sufficient permissions to run this command!");
   return;
   }
  if (aMessage.length < 1)
        return message.reply("You must supply a message");
  channel2.send(`@everyone **NEW ANNOUNCEMENT:** ${aMessage}`);
  
  

}
})

             
        

bot.login(config.token);

{
  bot.login(config.token);
}
