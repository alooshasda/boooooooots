
const { Message } = require("discord.js");
const db = require(`pro.db`);

module.exports = {
    name: "dreact",
    aliases: ["dreact"],
    description: "A simple react command.",
 

    run: async (client, message) => {
        try {
        const args = message.content.split(" ")
        const Channel = args[1];
        
        if (!message.member.permissions.has("ADMINISTRATOR")) return;
        
        if (!Channel) return message.reply({ content: "**⛔️ - Please put an ID **" });
        

const data = {
    Channel_Id: Channel
};
db.delete(`RoomInfo_${Channel}`, data);

        message.reply({ content: "**✅ - Done successfully **" }); 
}catch {x => 0}
    }
}
