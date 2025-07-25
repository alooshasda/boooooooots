module.exports = {
  name: "roleremove", // هنا اسم الامر
  run: async (client, message) => {
    let args = message.content.split(" ");
    let Removed = message.guild.roles.cache.find((role) => role.id === args[1]);
    if (!Removed) {
      message.reply({ content: "**♨️ - Please Specify Role ID**" });
      return;
    }
    let Members = 0;
    for (const member of message.guild.members.cache) {
      if (member[1].roles.cache.has(Removed.id)) {
        try {
          await member[1].roles.remove(Removed);
          Members++;
        } catch (error) {
          console.error(error);
        }
      }
    }
    message.reply({
      content: `Removed the role **${Removed.name}** from **${Members}** member(s).`,
    });
  },
};
