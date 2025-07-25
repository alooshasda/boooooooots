const db = require(`pro.db`)
module.exports = {
    name: "embedcolor",
    run: async (Client, interaction, args) => {
        const Args = interaction.content.split(` `)
        const Color = Args[1];
        if(!interaction.member.permissions.has(`ADMINISTRATOR`)) return;
        if (!Color || !isNaN(parseInt(Args))) return await interaction.reply({ content: `**⛔️ - Please put color title**` });
        await db.set(`Guild_Color = ${interaction.guild.id}`, `#${Color}`)
        await interaction.reply({ content: `**✅ - Done successfully **` })
    }
}