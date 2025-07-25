module.exports = {
    name: 'setprefix', // هنا اسم الأمر
    run : (client, message, args) => {
        if(message.member.permissions.has("ADMINISTRATOR")) {
            let newPrefix = args[0];
            if (!newPrefix)
                return message.channel.send(`*يرجى تقديم بادئة جديدة للبوت!*`);
            client.prefix = newPrefix;
            message.reply(`*تم تغيير بادئة البوت إلى ${newPrefix}*`)
        }
    }
  }