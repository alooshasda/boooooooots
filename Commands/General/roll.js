module.exports = {
    name: 'roll', // هنا اسم الامر
    run : (client, message, args) => {
        
        const randomNumber = Math.floor(Math.random() * 100) + 1;
    message.reply(`🎲**${randomNumber}**`); 

    }
}