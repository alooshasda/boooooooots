const Discord = require(`discord.js`);
module.exports = {
    name: `send`,
    run: async (client, interaction) => {
            const Args = interaction.content.split(' ');
            if (!interaction.member.permissions.has(`ADMINISTRATOR`)) return;
            let user = interaction.mentions.members.first() || interaction.guild.members.cache.get(Args[1])
            if(!user)return interaction.react(`❎`)
            if(user.user.bot) return await interaction.react(`❎`)
            let Message = interaction.content.split(" ").slice(2).join(' ')
            if(!Message) return await interaction.react(`❎`)
            await user.send({ content : `${Message}`});
            await interaction.react(`✅`)
        
    }
}