require("dotenv").config();
const {
  Client,
  intents,
  Collection,
  MessageEmbed,
  MessageAttachment,
  MessageActionRow,
  MessageButton,
  Intents,
} = require("discord.js");

const client = new Client({
  intents: Object.keys(Intents.FLAGS),
  allowedMentions: { repliedUser: false },
});
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});
app.listen(3000, () => {
  console.log("server started");
});
const fs = require("fs");
const ms = require(`ms`);
const Discord = require("discord.js");
const { prefix, owners } = require(`${process.cwd()}/config`);
const config = require(`${process.cwd()}/config`);
const Data = require("pro.db");
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require(`${process.cwd()}/config`);
const applyArray = [];

for (let index = 0; index < fs.readdirSync("./Commands/").length; index++) {
  const element = fs.readdirSync("./Commands/")[index];
  fs.readdirSync("./Commands/" + element).forEach((cmd) => {
    const commandFile = require("./Commands/" + element + "/" + cmd);
    client.commands.set(commandFile.name, commandFile);
  });
}

for (
  let index = 0;
  index < fs.readdirSync("./SlashCommands/").length;
  index++
) {
  const element = fs.readdirSync("./SlashCommands/")[index];
  const commandFile = require("./SlashCommands/" + element);
  client.slashCommands.set(commandFile.name, commandFile);
}

for (
  let index = 0;
  index < fs.readdirSync("./SlashCommands/").length;
  index++
) {
  const element = fs.readdirSync("./SlashCommands/")[index];
  const commandFile = require("./SlashCommands/" + element);
  applyArray.push(commandFile);
}
require("./events/messageCreate");
require("./events/InteractionCreate");
require("./Extras/Guild/coding");

client.prefix = prefix;
client.login(process.env.token); /////// توكن البوت
require("events").EventEmitter.defaultMaxListeners = 9999999;
client.on("ready", async () => {
  await client.application.commands.set(applyArray);
  console.log(
    `Name : ${client.user.tag}
ID : ${client.user.id}
Ping : ${client.ws.ping}
Prefix : ${client.prefix}
Server : ${client.guilds.cache.size}
Members : ${client.users.cache.size}
Channels : ${client.channels.cache.size}`
  );
});

const Canvas = require("@napi-rs/canvas");
var { inviteTracker } = require("discord-inviter");

const tracker = new inviteTracker(client);
tracker.on("guildMemberAdd", async (member, inviter) => {
  let dbrb = require("pro.db");
  let id = (await dbrb.get(`WelcomeChannel_${member.guild.id}`)) || "";
  let Channel = client.channels.cache.get(id);
  console.log(id, Channel.name);
  if (!Channel) return;
  const makeTheImage = require("./Extras/Guild/welcome.Dev.khuzam");

  const attachment = new MessageAttachment(
    await makeTheImage(member.guild.id, member),
    "profile-image.png"
  );
  Channel.send({ files: [attachment] }).then(async (msg) => {
    let message = await require("pro.db").get(
      `WelcomeMessage_${member.guild.id}`
    );
    if (!message)
      message = `*Welcome To server*  ${member.user}\n*inv by* <@!${inviter.id}>`;
    message = message
      .replace("{member[id]}", `${member.user.id}`)
      .replace("{member[name]}", `${member.user.username}`)
      .replace("{member}", `<@!${member.user.id}>`)
      .replace("{inviter[id]}", `${inviter.id}`)
      .replace("{inviter[name]}", `${inviter.username}`)
      .replace("{inviter}", `<@!${inviter.id}>`);
    msg.channel.send({
      content: message,
    });
  });
});
process.on("uncaughtException", () => {});
process.on("uncaughtExceptionMonitor", () => {});
process.on("unhandledRejection", () => {});
const { Modal, TextInputComponent } = require("discord.js");
client.on(`interactionCreate`, async (interaction) => {
  const db = require(`pro.db`);
  if (interaction.isButton()) {
    if (interaction.customId === `Auto_Reply`) {
      const Services = new Modal().setCustomId(`Reply-Bot`).setTitle(`Reply`);
      const Service_1 = new TextInputComponent()
        .setCustomId("Auto-Reply")
        .setLabel(`إضافة رسالتك`)
        .setStyle(`PARAGRAPH`)
        .setPlaceholder(" ")
        .setRequired(true);
      const Service_2 = new TextInputComponent()
        .setCustomId("-Reply")
        .setLabel(`إضاف الرد`)
        .setStyle(`PARAGRAPH`)
        .setPlaceholder(" ")
        .setRequired(true);
      const Service1 = new MessageActionRow().addComponents(Service_1);
      const Service2 = new MessageActionRow().addComponents(Service_2);
      Services.addComponents(Service1, Service2);
      interaction.showModal(Services);
    }
  }
  if (interaction.isModalSubmit()) {
    if (interaction.customId === `Reply-Bot`) {
      const Service_1 = interaction.fields.getTextInputValue("Auto-Reply");
      const Service_2 = interaction.fields.getTextInputValue("-Reply");
      if (db.get(`Replys_${Service_1}`))
        return interaction.reply({ content: `موجود بالفعل` });
      db.push(`Replys_${Service_1}`, { Word: Service_1, Reply: Service_2 });
      interaction.reply({ content: `${Service_1} | ${Service_2}` });
    }
  }
});

client.on("messageCreate", (Message) => {
  const db = require(`pro.db`);
  const Word = db.get(`Replys_${Message.content}`);
  if (!Word) return;
  if (Message.content.startsWith(Word[0].Word)) {
    Message.channel.send({ content: `${Word[0].Reply}` });
  }
});
