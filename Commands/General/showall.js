module.exports = {
  name: "showall", // هنا اسم الامر
  run: (client, message, args) => {
    if (message.author.bot || !message.guild) return;
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.react("❌");
    let everyone = message.guild.roles.cache.find(
      (hyper) => hyper.name === "@everyone"
    );
    message.guild.channels.cache.forEach((channel) => {
      channel.permissionOverwrites
        ?.create(everyone, { VIEW_CHANNEL: true })
        .then(() => {});
    });
    message.react("✅");
  },
};
