module.exports = {
    name: 'semoji', // هنا اسم الامر
    run : (client, message, args) => {
        

  const Command = message.content.split(' ');
  

  const findEmoji = Command[1];
  if (!findEmoji || findEmoji === '') {
    return message.reply({ content: '**⛔️ - Please send emoji**' });
  }

  const emojiId = findEmoji.slice(findEmoji.length - 20, findEmoji.length - 1);
  if (isNaN(emojiId)) {
    return message.reply({ content: '**🧐 - Try again**' });
  }

  const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.png`;
  message.reply({ content: emojiURL });


    }
}