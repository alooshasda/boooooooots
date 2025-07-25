module.exports = {
    name: 'ping', // هنا اسم الامر
    run : (client, message, args) => {
    message.reply(`my ping is **${client.ws.ping}** 🎯`);
    }
}