const { MessageEmbed } = require(`discord.js`);
const ms = require(`ms`);
const Data = require("pro.db");
module.exports = {
  name: `ميوت`,
  aliases: [`mute`],
  run: async (client, message) => {
    const permission = message.member.permissions.has("MUTE_MEMBERS");
    if (!permission) {
      return message.react("❌");
    }
    let args = message.content.split(" ").slice(2).join(" ");
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    var time = args[2];
    if (!time) time = "24h";
    const guilds = message.guild.members.me.permissions.has("MANAGE_ROLES");
    if (!member) return message.react("❌");
    if (member.id === message.member.id) return message.react("❌");
    if (message.member.roles.highest.position < member.roles.highest.position)
      return message.react("❌");
    if (!guilds) return message.react("❌");
    let muteRole = message.guild.roles.cache.find(
      (role) => role.name == "tmute"
    );
    if (!muteRole) {
      message.guild.roles
        .create({
          name: "tmute",
        })
        .then((createRole) => {
          message.guild.channels.cache
            .filter((c) => c.type == "GUILD_TEXT")
            .forEach((c) => {
              c.permissionOverwrites.edit(createRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
              });
            });
          message.react("❌");
        });
    } else {
      message.guild.members.cache.get(member.id)?.roles.add(muteRole);
      message.react("✅");

      Data.set(`Muted_Member_${member.id}`, ms(time));
    }
  },
};
