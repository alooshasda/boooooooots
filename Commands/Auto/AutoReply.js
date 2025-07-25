const { MessageEmbed, MessageActionRow, MessageButton , Message, Client} =
  require("discord.js");

module.exports = {
    name: "addreply",
    aliases: ["إضافة"],
    description: "A simple ping command.",
    category: "Informations",
    example: ["1"],
    run: async (Client, Message) => {
        if(!Message.member.permissions.has(`ADMINISTRATOR`)) return

      
        const Embed = new MessageEmbed()
            .setDescription(`**Click the Add\nAuto Reply button**`)
        const Bu = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId(`Auto_Reply`)
                .setStyle(`SECONDARY`)
                .setLabel(`Add`)
        )
        await Message.reply({ embeds: [Embed], components: [Bu] })
    }
}