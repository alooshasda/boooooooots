module.exports = {
    name: 'id', // هنا اسم الامر
    run : (client, message, args) => {
        
      const user = message.mentions.users.first() || message.author;
    message.reply(`${user.id}`);


    }
}
