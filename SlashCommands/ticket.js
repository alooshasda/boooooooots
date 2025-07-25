const db = require("pro.db");
const Discord = require("discord.js");

module.exports = {
  name: "ticket",
  description: "🎙〡Join To Voice Channel..",
  type: `CHAT_INPUT`,
  options: [
    {
      name: "category",
      type: `CHANNEL`,
      description: "🎙〡Voice channel mention to Join..",
      required: true,
    },
    {
      name: "image",
      type: `STRING`,
      description: "🎙〡Voice channel mention to Join..",
      required: true,
    },
    {
      name: "role",
      type: `ROLE`,
      description: "🎙〡Voice channel mention to Join..",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    try {
      const Category = interaction.options.getChannel("category");
      const Image = interaction.options.getString("image");
      const Role = interaction.options.getRole("role");
      const Cat = Category.id;
      if (!interaction.member.permissions.has("ADMINISTRATOR")) return;
      db.set(`ticket_data_${interaction.guild.id}`, {
        category: Cat,
        image: Image,
        role: Role.id,
      });

      const Row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Ticket")
          .setStyle("SECONDARY")
          .setCustomId("Tic")
          .setEmoji("✉️")
      );
      interaction.channel.send({ files: [Image], components: [Row] });
      interaction.reply({ content: `Done`, ephemeral: true });
    } catch (e) {
      console.log(e);
    }
  },
};
