let { Permissions, Util } = require("discord.js");

module.exports = {
  name: "addemojis",
  description: "To add emojis in one go ",
  usage: "/addemojis emojis: <emojis>",
  options: [
    {
      name: "emojis",
      description: "emojis you want to add",
      required: true,
      type: "STRING",
    },
  ],
  run: async (client, inter) => {
    if (!inter.member.permissions.has("ADMINISTRATOR"))
      return inter.reply(`** 😕 You don't have permission **`);

    const emojis = inter.options
      .getString("emojis")
      .match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
    if (!emojis) {
      return await inter.reply({
        content: `🙄 No vaild emojis provived`,
        ephemeral: true,
      });
    }
    let emojisArra = [];
    emojis.forEach((emote) => {
      let emoji = Util.parseEmoji(emote);
      if (emoji.id) {
        const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
          emoji.animated ? "gif" : "png"
        }`;
        inter.guild.emojis
          .create(`${Link}`, `${emoji.name}`)
          .then((em) => {
            emojisArra.push(em.toString());
            if (emojis.length == emojisArra.length) {
              inter.reply({
                content: `**[ ${emojisArra
                  .map((e) => e)
                  .join(",")} ] Done add emojis to server **`,
              });
              emojisArra = [];
            }
          })
          .catch((error) => {
            inter.reply({
              content: `Ann Error , Try Again .`,
              ephemeral: true,
            });
            console.log(error);
          });
      }
    });
  },
};
