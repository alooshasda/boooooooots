const { MessageEmbed } = require(`discord.js`);
const Data = require(`pro.db`);
module.exports = {
  name: "unmute", // هنا اسم الامر
  aliases: ["معفو", "تكلم"],
  run: async (client, message) => {
    // - غير الامر عادي اذا حب تخليه من غير برفكس شيل برفكس
    const permission = message.member.permissions.has("MUTE_MEMBERS");
    if (!permission) {
      return message.react("❌");
    }
    // get the mentioned user or the user who sent the message
    let member = message.mentions.members.first();
    if (!member) return message.react("❌");
    // get the role by its ID

    let role = member.guild.roles.cache.find((role) => role.name === "tmute"); // - هنا ايدي الرتبه اللي شخص راح ياخده
    // add the role
    member.roles.remove(role).then(() => {
      message.react("✅");
    });
    await Data.delete(`Muted_Member_${member.id}`);
  },
};
