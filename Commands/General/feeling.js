const db = require(`pro.db`)
module.exports = {
    name: "feeling",
    run: async (Client, interaction, args) => {
          const Args = interaction.content.split(' ');
          if (!interaction.member.permissions.has(`ADMINISTRATOR`)) return;
          const Channel = interaction.mentions.channels.first() || interaction.guild.channels.cache.find(channel => channel.id === Args[1] || channel.name === Args.slice(1).join(" "));
          if (!Channel) return interaction.reply({ content: '**⛔️ - Please add channel id **' });
          db.push(`Channel_Feed_${interaction.guild.id}`, Channel.id);
          await interaction.react(`✅`)
        if(!db.get(`Line`)) return interaction.reply({ content : `**⛔️ - Plese Set Line **`})
    }
}
