const db = require("pro.db");
module.exports = {
  name: "crimage",
  description: "To set image room",
  usage: "!set-image <image>",
  run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`**😕 - You don't have permission**`);
    const imageUrl = args[0];
    if (!imageUrl) {
      return message.reply({content : `**⛔️ - Please specify image link **`});
    }
    
    // Validate URL
    const validUrl = require('valid-url');
    if (!validUrl.isUri(imageUrl)) {
      return message.reply('Invalid URL provided!');
    }
    
    db.set(`image_room`,  imageUrl );
      message.channel.send({content : `**✅ - image has been set successfully**\n${imageUrl}`})
    .catch(err => console.log(err));
  }
};

