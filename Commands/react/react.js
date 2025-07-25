"use strict";
const { Client, Message } = require("discord.js");
const db = require("pro.db");

module.exports = {
    name: "react",
    aliases: ["react"],
    description: "A simple react command.",
    
    run: async (client, message) => {
        try {
            const args = message.content.split(" ");

            const ChannelId = args[1];
            const Emoji1 = args[2];
            const Emoji2 = args[3];

            const channel = message.guild.channels.cache.find((c) => c.id === ChannelId || c.name === ChannelId || c.id === `<#${ChannelId}>`);
            if (!message.member.permissions.has("ADMINISTRATOR")) return;

            if (!channel) return message.reply({ content: "**⛔️ - Please select channel id and then the emojis **" });

            db.set(`RoomInfo_${channel.id}`, {
                Channel_Id: channel.id,
                Emoji1_Id: Emoji1,
                Emoji2_Id: Emoji2
            });

            message.reply({ content: "**✅ - Done successfully**" });
        } catch (e) {
            console.log(e);
        }
    }
};
