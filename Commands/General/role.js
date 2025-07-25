module.exports = {
  name: "role", // هنا اسم الامر
  aliases: ["رول", "give"],
  run: (client, message, args) => {
    if (message.author.bot) return;
    const a1rgs = message.content.split(" ");
    const command = a1rgs[0].toLowerCase();
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.react("❌");
    if (a1rgs.length < 3) return message.react("❌");
    const memberArg = a1rgs[1];
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.find(
        (member) =>
          member.id === memberArg ||
          member.user.tag === memberArg ||
          member.user.username === memberArg
      );
    if (!user) return message.react("❌");
    const roleArg = a1rgs[2];
    const role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.find(
        (r) =>
          r.name === roleArg || r.id === roleArg || `<@&${roleArg}>` === roleArg
      );
    if (!role) return message.react("❌");
    if (
      message.member.roles.highest.position <= role.position &&
      message.guild.ownerId !== message.member.id
    ) {
      return message.react("❌");
    }
    if (user.roles.cache.has(role.id)) {
      user.roles.remove(role.id);
    } else {
      user.roles.add(role.id);
    }
    return message.react("✅");
  },
};
