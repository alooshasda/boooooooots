let client = require("../..");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Modal,
} = require(`discord.js`);
const Data = require(`pro.db`);
const { prefix, owners } = require(`../../config.json`);
const config = require(`../../config.json`);
const Discord = require(`discord.js`);
const fs = require(`fs`);
client.setMaxListeners(9999999999999999999);
const canvas_constructor_1 = require("canvas-constructor");

client.on("messageCreate", async (msg) => {
  if (!msg.guildId) return;
  if (msg.content.startsWith(prefix +"enchat")) {
  if (!config.owners.includes(msg.member.id)) return msg.react("❌")
    let channel = msg.guild.channels.cache.get(msg.content.split(" ")[1]);
    if (!channel) return msg.react("❌");
    await require("pro.db").set("TRAGSN", channel.id);
    msg.reply("تم تغير روم التقيم");
  }
});

client.on("messageCreate", async (msg) => {
  const {
    MessageAttachment,
    MessageActionRow,
    MessageButton,
  } = require("discord.js");
  const makeTheImage = require("./welcome.Dev.khuzam");

  const db = require("pro.db");
  if (msg.content == client.prefix + "edit-welcome") {
    if (!msg.member.permissions.has("ADMINISTRATOR")) return msg.react("❌");
    let image = await makeTheImage(msg.guildId, msg.member);
    msg.channel
      .send({
        files: [new MessageAttachment(image)],
        components: [
          new MessageActionRow().setComponents(
            new MessageButton()
              .setCustomId("size-plus")
              .setEmoji("➕")
              .setStyle("SECONDARY"),
            new MessageButton()
              .setCustomId("y-minus")
              .setEmoji("⬆️")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("size-minus")
              .setEmoji("➖")
              .setStyle("SECONDARY")
          ),
          new MessageActionRow().setComponents(
            new MessageButton()
              .setCustomId("x-minus")
              .setEmoji("⬅️")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("pic-0")
              .setEmoji("🖼️")
              .setStyle("SECONDARY"),
            new MessageButton()
              .setCustomId("x-plus")
              .setEmoji("➡️")
              .setStyle("PRIMARY")
          ),
          new MessageActionRow().setComponents(
            new MessageButton()
              .setCustomId("channel")
              .setLabel("#️⃣")
              .setStyle("SECONDARY"),
            new MessageButton()
              .setCustomId("y-plus")
              .setEmoji("⬇️")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("message")
              .setLabel("💬")
              .setStyle("SECONDARY")
          ),
        ],
      })
      .then((m) =>
        m
          .createMessageComponentCollector({
            filter: ({ user }) => user.id == msg.author.id,
          })
          .on("collect", async (i) => {
            if (i.customId == "channel") {
              let ie = false;
              client.once("interactionCreate", async (i) => {
                if (ie == true) return;
                if (i.isModalSubmit() && i.customId == "channel-menu") {
                  let input = i.fields.getTextInputValue("input");
                  await db.set(`WelcomeChannel_${i.guildId}`, input);
                  ie = true;
                  await i.reply({
                    ephemeral: true,
                    content: "تم تغير روم الترحيب",
                  });
                }
              });
              i.showModal(
                new Modal()
                  .setComponents(
                    new MessageActionRow().setComponents(
                      new Discord.TextInputComponent()
                        .setLabel("برجاء ادراج اي دي الروم بالأسفل:")
                        .setPlaceholder("اي دي الروم هنا")
                        .setStyle("SHORT")
                        .setRequired(true)
                        .setCustomId("input")
                    )
                  )
                  .setCustomId("channel-menu")
                  .setTitle("تغير روم الترحيب")
              );
              return;
            }
            if (i.customId == "message") {
              let ie = false;
              client.once("interactionCreate", async (i) => {
                if (ie == true) return;
                if (i.isModalSubmit() && i.customId == "message-menu") {
                  let input = i.fields.getTextInputValue("input");
                  await db.set(`WelcomeMessage_${i.guildId}`, input);
                  ie = true;
                  await i.reply({
                    ephemeral: true,
                    content: "تم تغير رسالة الترحيب",
                  });
                }
              });
              i.showModal(
                new Modal()
                  .setComponents(
                    new MessageActionRow().setComponents(
                      new Discord.TextInputComponent()
                        .setLabel("برجاء ادراج الرساله بالأسفل:")
                        .setPlaceholder(
                          "{member[id/name]} / {inviter[id/name]}"
                        )
                        .setStyle("PARAGRAPH")
                        .setRequired(true)
                        .setCustomId("input")
                    )
                  )
                  .setCustomId("message-menu")
                  .setTitle("تغير رسالة الترحيب")
              );
              return;
            }
            if (i.customId == "pic-0") {
              let ie = false;
              client.once("interactionCreate", async (i) => {
                if (ie == true) return;
                if (i.isModalSubmit() && i.customId == "pic-menu") {
                  let input = i.fields.getTextInputValue("input");
                  await db.set(`WelcomeBackgroundImage_${i.guildId}`, input);
                  ie = true;
                  await i.reply({
                    ephemeral: true,
                    content: "تم تغير صورة الترحيب",
                  });
                }
              });
              i.showModal(
                new Modal()
                  .setComponents(
                    new MessageActionRow().setComponents(
                      new Discord.TextInputComponent()
                        .setLabel("برجاء ادراج رابط الصورة الجديده:")
                        .setPlaceholder("رابط الصورة هنا (مستحسن PNG)")
                        .setStyle("SHORT")
                        .setRequired(true)
                        .setCustomId("input")
                    )
                  )
                  .setCustomId("pic-menu")
                  .setTitle("تغير صورة الترحيب")
              );
              return;
            }
            await i.deferUpdate();
            let [sec, func] = i.customId.split("-");
            if (sec == "size") {
              let size = db.get(`WelcomeAvatarSize_${msg.guildId}`) || 290;
              if (func == "plus")
                await db.set(`WelcomeAvatarSize_${msg.guildId}`, size + 15);
              if (func == "minus")
                await db.set(`WelcomeAvatarSize_${msg.guildId}`, size - 15);
              let image = await makeTheImage(msg.guildId, msg.member);
              m.edit({ files: [new MessageAttachment(image)] });
            }
            if (sec == "x") {
              let x = db.get(`WelcomeAvatarX_${msg.guildId}`) || 227;
              if (func == "plus")
                await db.set(`WelcomeAvatarX_${msg.guildId}`, x + 15);
              if (func == "minus")
                await db.set(`WelcomeAvatarX_${msg.guildId}`, x - 15);
              let image = await makeTheImage(msg.guildId, msg.member);
              m.edit({ files: [new MessageAttachment(image)] });
            }
            if (sec == "y") {
              let y = db.get(`WelcomeAvatarY_${msg.guildId}`) || 227;
              if (func == "plus")
                await db.set(`WelcomeAvatarY_${msg.guildId}`, y + 15);
              if (func == "minus")
                await db.set(`WelcomeAvatarY_${msg.guildId}`, y - 15);
              let image = await makeTheImage(msg.guildId, msg.member);
              m.edit({ files: [new MessageAttachment(image)] });
            }
          })
      );
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    const db = new require("pro.db");
    if (!interaction.isButton()) return;
    if (interaction.customId == "Tic") {
      if (db.get(`User_${interaction.user.id}`) == true) {
        if (db.get(`User_${interaction.user.id}`) == true)
          return interaction.reply({
            content: `**للأسفِ لمْ يمكنكَ فتحُ تذكرةً لعدمِ تقفيلِ تذكرةِ قديمهِ خاصةً بكَ** ${interaction.user}`,
            ephemeral: true,
          });
      }
      db.set(`User_${interaction.user.id}`, true);
      const ticketData = db.get(`ticket_data_${interaction.guild.id}`);
      if (!ticketData) return;
      const { category, image, role } = ticketData;
      const channel = await interaction.guild.channels.create(
        `ticket-${interaction.user.username}`,
        {
          type: "text",
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: ["VIEW_CHANNEL"],
            },
            {
              id: interaction.user.id,
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
            },
            {
              id: role,
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
            },
          ],
          parent: interaction.guild.channels.cache.find(
            (Categorys) => Categorys.id === category
          ),
        }
      );

      const deleteButton = new MessageActionRow().setComponents(
        new MessageButton()
          .setLabel("Delete Ticket")
          .setStyle("SECONDARY")
          .setCustomId("delete")
      );
      const dbr = require(`pro.db`);
      const roleMention = `<@&${role}>`;
      dbr.set(`TicketChannel_${channel.id}`, interaction.user.id);
      channel.send({
        files: [image],
        content: `Here's your ticket, ${interaction.user}!  ${roleMention}`,
        components: [deleteButton],
      });
      interaction.reply({
        content: `Ticket created! ${channel}`,
        ephemeral: true,
      });
    }
    if (interaction.customId == "delete") {
      if (interaction.member.permissions.has("MANAGE_CHANNELS")) {
        const dbr = require(`pro.db`);
        let chId = interaction.channel.id;
        let userId = await dbr.get(`TicketChannel_${interaction.channel.id}`);
        if (!userId) return;
        let user = client.users.cache.get(userId);
        if (user)
          user
            .send({
              content: "ما رأيك في الخدمة؟",
              components: [
                new MessageActionRow().setComponents(
                  new Discord.MessageSelectMenu()
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setPlaceholder("ما مدى رضاك عن خدماتنا")
                    .setCustomId("menu")
                    .setOptions([
                      { label: "⭐ 1 Star", value: "1" },
                      { label: "⭐ 2 Star(s)", value: "2" },
                      { label: "⭐ 3 Star(s)", value: "3" },
                      { label: "⭐ 4 Star(s)", value: "4" },
                      { label: "⭐ 5 Star(s)", value: "5" },
                    ])
                ),
              ],
            })
            .then((m) => {
              m.createMessageComponentCollector({ max: 1 }).on(
                "collect",
                async (i) => {
                  dbr.delete(`TicketChannel_${chId}`);
                  if (!i.isSelectMenu()) return;
                  let star = i.values[0];
                  let channel = client.channels.cache.get(
                    (await require("pro.db").get("TRAGSN")) || ""
                  );
                  if (!channel) return;
                  channel.send(
                    `لقد قام <@${user.id}> بتقيم خدماتنا بـ ${star} Star(s)`
                  );
                  m.components[0].components[0].disabled = true;
                  i.update({
                    components: m.components,
                    content: "شكراّّ لك على تقيمك 🤍",
                  });
                }
              );
            })
            .catch((e) => console.log(e));
        await interaction.channel.delete();
        if (db.has(`User_${interaction.user.id}`)) {
          db.delete(`User_${interaction.user.id}`);
        }
      } else {
        interaction.reply({
          content:
            "You do not have the required permissions to delete this ticket.",
          ephemeral: true,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
});
///////////

//////////
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "crimage")) {
    //if (!config.owners.includes(msg.member.id)) return msg.react("❌");
    if (!message.member.permissions.has('ADMINISTRATOR')) return message.react("❌");
    let imageUrl = message.content.split(" ")[1];
    if (!imageUrl)
      return message.react("❌");
    await require("pro.db").set(`Colors_image_aaaa`, imageUrl);
    message.reply("تم تغير الصورة بنجاح!");
  }
  if (
    message.content.startsWith(client.prefix + "colors") ||
    message.content.startsWith(client.prefix + "الوان")
  ) {
    var guild = message.guild;
    var x = 0;
    var y = 0;
    if (guild.roles.cache.filter((role) => !isNaN(role.name)).size <= 0) return;
    guild.roles.cache
      .filter((role) => !isNaN(role.name))
      .sort((b1, b2) => Number(b1.name) - Number(b2.name))
      .forEach(() => {
        x += 100;
        if (x > 100 * 12) {
          x = 100;
          y += 80;
        }
      });
    const fetch = require("node-fetch");
    try {
      var fimg = await fetch(
        (await require("pro.db").get("Colors_image_aaaa")) ||
          "https://media.discordapp.net/attachments/1139608647266226216/1143376088156864554/JS_Store.jpg?width=840&height=473"
      );
      var fimgb = Buffer.from(await fimg.arrayBuffer());
    } catch {
      fimgb = await require("node:fs").readFileSync(
        process.cwd() + "/colorsImage.jpg"
      );
    }
    var xd = new canvas_constructor_1.Canvas(100 * 11, y + 350)
    .addBeveledImage(fimgb, 0, 0, 100 * 11, y + 350, 100)
      .setTextBaseline("middle")
      .setColor("white")
      .setTextSize(60)
      .addText(`Colors List`, 375, 80);
    x = 0;
    y = 150;
    guild.roles.cache
      .filter((role) => !isNaN(role.name))
      .sort((b1, b2) => Number(b1.name) - Number(b2.name))
      .forEach((role) => {
        x += 75;
        if (x > 100 * 10) {
          x = 75;
          y += 80;
        }
        xd.setTextBaseline("middle")
          .setTextAlign("center")
          .setColor(role.hexColor)
          .addBeveledRect(x, y, 60, 60, 15)
          .setColor("white");
        if (`${role.name}`.length > 2) {
          xd.setTextSize(30);
        } else if (`${role.name}`.length > 1) {
          xd.setTextSize(40);
        } else {
          xd.setTextSize(50);
        }
        xd.addText(role.name, x + 30, y + 30);
      });
    Data.set("image_room", xd.toBuffer());
    fs.writeFileSync(process.cwd() + "/image.png", xd.toBuffer());
    let options = [];
    message.guild.roles.cache
      .filter((role) => !isNaN(role.name))
      .sort((b1, b2) => Number(b1.name) - Number(b2.name))
      .forEach((role) => {
        options.push({
          label: role.name,
          emoji: "🎨",
          value: role.id.toString(),
        });
      });
    message.channel
      .send({
        files: [await xd.toBuffer()],
        components: [
          new MessageActionRow().setComponents(
            new Discord.MessageSelectMenu()
              .setMaxValues(1)
              .setMinValues(1)
              .setCustomId("menu")
              .setPlaceholder("Choose a color")
              .setOptions(options)
          ),
        ],
      })
      .then((m) =>
        m
          .createMessageComponentCollector({
            filter: ({ user }) => user.id == message.author.id,
          })
          .on("collect", async (i) => {
            if (i.customId !== "menu") return;
            await i.update({ components: m.components });
            let value = i.values[0];
            let role = message.guild.roles.cache.get(value);
            if (i.member.roles.cache.get(value))
              return i.member.roles.remove(role);
            await i.guild.members.cache
              .get(i.user.id)
              .roles.cache.forEach(async (r) => {
                if (!isNaN(r.name)) await i.member?.roles.remove(r);
              });
            await i.member.roles.add(role).catch(() => {});
          })
      );
  }
});

const interval = 500;
client.on("ready", async () => {
  setInterval(async () => {
    try {
      let image = await Data.get(`image_room`);
      let channel_id = await Data.get("settestl");
      if (!channel_id) return;

      const channel = client.channels.cache.get(channel_id);
      if (!channel) return;

      await channel.bulkDelete(100);
      let options = [];
      client.guilds.cache
        .get(channel.guildId)
        .roles.cache.filter((role) => !isNaN(role.name))
        .sort((b1, b2) => Number(b1.name) - Number(b2.name))
        .forEach((role) => {
          options.push({
            label: role.name,
            emoji: "🎨",
            value: role.id.toString(),
          });
        });
      await channel
        .send({
          files: [Buffer.from(image)],
          components: [
            new MessageActionRow().setComponents(
              new Discord.MessageSelectMenu()
                .setMaxValues(1)
                .setMinValues(1)
                .setCustomId("menu")
                .setPlaceholder("Choose a color")
                .setOptions(options)
            ),
          ],
        })
        .then((m) =>
          m.createMessageComponentCollector().on("collect", async (i) => {
            if (i.customId !== "menu") return;
            await i.update({ components: m.components });
            let value = i.values[0];
            let role = i.guild.roles.cache.get(value);
            if (i.member.roles.cache.get(value))
              return i.member.roles.remove(role);
            await i.guild.members.cache
              .get(i.user.id)
              .roles.cache.forEach(async (r) => {
                if (!isNaN(r.name)) await i.member?.roles.remove(r);
              });
            await i.member.roles.add(role).catch(() => {});
          })
        );
    } catch (err) {
      console.error(err);
    }
  }, interval * 1000);
});
//////////
client.on("messageCreate", (message) => {
  let setchannek = Data.get("settestl");
  if (message.channel.id != setchannek) return;
  if (message.author.bot) return;
  if (!message.channel.guild) return;

  if (message.content.startsWith("لون")) {
    let args = message.content.split(" ").slice(1).join(` `);
    if (isNaN(args))
      return message.channel.send({
        content: "**🙄 - Please choose color number**",
      });
    if (!args)
      return message.channel.send({
        content: "**🙄 - Please choose color number**",
      });

    let role = message.guild.roles.cache.find((r) => r.name == args);

    if (!role)
      return message.channel.send({ content: "**🤦‍♂️- Wrong color number**" });

    message.member.roles.cache
      .filter((rr) => !isNaN(rr.name))
      .forEach((r) => {
        message.member.roles.remove(r);
      });

    message.member.roles.add(role).then(() => {
      let embed = new Discord.MessageEmbed()

        .setTitle("تم تغيير اللون بنجاح!")
        .setDescription("تم طلبة بوُاسطتك .. " + args)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setColor(role.hexColor);

      message.channel.send({ embeds: [embed] });
    });
  }
});
////////

///////////////
client.on("messageCreate", async (interaction) => {
  if (interaction.author.bot) return;
  let image = Data.get("Line");
  const channelIds = (await Data.get("Channels")) || [];
  const validChannelIds = channelIds.filter(
    (channelId) => channelId === interaction.channel.id
  );

  validChannelIds.forEach(async (channelId) => {
    const channel = interaction.guild.channels.cache.get(channelId);
    if (channel) {
      try {
        await channel.send({
          files: [image],
        });
      } catch (error) {
        console.error(
          `Error sending message to channel ${channelId}: ${error}`
        );
      }
    }
  });
});
client.on("messageCreate", (message) => {
  if (
    message.content.startsWith(client.prefix + "خط") ||
    message.content.startsWith(client.prefix + "line")
  ) {
    let image = Data.get("Line");
    message.channel.send({ files: [image] });
  }
});
///////
let { joinVoiceChannel } = require("@discordjs/voice");
client.on("ready", async () => {
  let Voice = await Data.get(`Voice_${client.user.id}`);
  const channel = client.channels.cache.get(Voice);
  if (!channel || channel.type !== "GUILD_VOICE") {
    return;
  }
  const GUILD = channel.guild;
  const connection = joinVoiceChannel({
    channelId: Voice,
    guildId: GUILD.id,
    adapterCreator: GUILD.voiceAdapterCreator,
    selfDeaf: true,
  });
  connection;
});
//////////
client.on("messageCreate", async (message) => {
  const reactData = Data.get(`RoomInfo_${message.channel.id}`);
  if (!reactData) return;

  const channel = message.guild.channels.cache.get(reactData.Channel_Id);
  if (!channel) return;

  const emoji1 =
    reactData.Emoji1_Id ||
    (await client.emojis.cache.find(
      (emoji) => emoji.id === reactData.Emoji1_Id
    ));
  const emoji2 =
    reactData.Emoji2_Id ||
    (await client.emojis.cache.find(
      (emoji) => emoji.id === reactData.Emoji2_Id
    ));

  if (emoji1) await message.react(emoji1);
  if (emoji2) await message.react(emoji2);
});
/////////////
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const words = Data.get(`word_${message.guild.id}`);
  if (!Array.isArray(words) || words.length === 0) return;
  words.forEach((word) => {
    if (message.content.includes(word)) {
      message.delete();
    }
  });
});
///////////////////////////////////////////////////////
/// جميع اوامر الافتارت
client.on("messageCreate", async (Suger_He) => {
  const Color =
    (await db.get(`Guild_Color = ${Suger_He.guild?.id}`)) || `#000000`;
  if (!Color) return;
  var cmd = Suger_He.content.split(" ")[0];
  if (cmd == client.prefix + "avatar" || cmd == "A" || cmd == "a") {
    let setchannek = Data.get(`setChannel_${Suger_He.guild.id}`);
    if (Suger_He.channel.id != setchannek) return;
    let user =
      Suger_He.mentions.members.first() ||
      Suger_He.guild.members.cache.get(Suger_He.content.split(" ")[1]) ||
      Suger_He.member;
    var embed = new MessageEmbed()
      .setTitle("Download avatar")
      .setURL(user.user.avatarURL({ dynamic: true, size: 512 }))
      .setAuthor({
        name: Suger_He.guild.name,
        iconURL: Suger_He.guild.iconURL({ dynamic: true }),
      })
      .setImage(user.user.avatarURL({ dynamic: true, size: 512 }))
      .setColor(`${Color || `#000000`}`)
      .setFooter(
        Suger_He.author.username,
        Suger_He.author.avatarURL({ dynamic: true })
      );
    Suger_He.reply({ embeds: [embed] });
  }
});
////////////
client.on("messageCreate", async (message) => {
  const Color = db.get(`Guild_Color = ${message.guild?.id}`) || `#000000`;
  if (!Color) return;
  if (message.content.startsWith(`${client.prefix}savatar`)) {
    let setchannek = Data.get(`setChannel_${message.guild.id}`);
    if (message.channel.id != setchannek) return;
    const { guild } = message;
    const serverIcon = guild.iconURL({ dynamic: true, size: 2048 });
    const serverName = guild.name;

    const embed = new Discord.MessageEmbed()
      .setColor(`${Color || `#000000`}`)
      .setTitle(`:camera_with_flash: ${serverName} Avatar`)
      .setDescription(`[Download Avatar](${serverIcon})`)
      .setImage(serverIcon)
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
});
////////////
client.on(`messageCreate`, (message) => {
  const Color = db.get(`Guild_Color = ${message.guild?.id}`) || `#000000`;
  if (!Color) return;
  if (message.content == client.prefix + "bserver") {
    let setchannek = Data.get(`setChannel_${message.guild.id}`);
    if (message.channel.id !== setchannek) return;
    let embed = new MessageEmbed()
      .setTitle(`Banner Server`)
      .setImage(message.guild.bannerURL({ dynamic: true, size: 1024 }))
      .setURL(message.guild.bannerURL({ dynamic: true, size: 1024 }))
      .setColor(`${Color || `#000000`}`);
    message.reply({ embeds: [embed] });
  }
});
//////////////
client.on("messageCreate", (message) => {
  const Color = db.get(`Guild_Color = ${message.guild?.id}`) || `#000000`;
  if (!Color) return;
  if (!message.content.startsWith(client.prefix) || message.author.bot) return;

  const args = message.content.slice(client.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (commandName === "user") {
    let setchannek = Data.get(`setChannel_${message.guild.id}`);
    if (message.channel.id != setchannek) return;
    const mentionedMember = message.mentions.members.first() || message.member;
    let embed = new Discord.MessageEmbed()
      .setColor(`${Color || `#000000`}`)
      .setAuthor(
        `${mentionedMember.user.tag}'s Information`,
        message.guild.iconURL({ dynamic: true, size: 1024, format: "png" })
      )
      .setThumbnail(
        message.guild.iconURL({ dynamic: true, size: 1024, format: "png" })
      )
      .addFields(
        {
          name: "Joined Discord:",
          value: `**<t:${Math.floor(
            mentionedMember.user.createdTimestamp / 1000
          )}:R>**`,
          inline: true,
        },
        {
          name: "Joined Server:",
          value: `**<t:${Math.floor(mentionedMember.joinedAt / 1000)}:R>**`,
          inline: true,
        }
      );

    message.channel.send({ embeds: [embed] });
  }
});
//////////////
const db = require(`pro.db`);
const { loadImage } = require("@napi-rs/canvas");
const { AuditLogEvent } = require("discord-api-types/v10");
client.on(`messageCreate`, async (message) => {
  const Color = db.get(`Guild_Color = ${message.guild?.id}`) || `#000000`;
  if (!Color) return;
  if (message.content.toLowerCase().startsWith(client.prefix + "server")) {
    let setchannek = Data.get(`setChannel_${message.guild.id}`);
    if (message.channel.id != setchannek) return;
    const members = message.guild.members.cache;
    const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache.size;
    const firstFiveEmojis = message.guild.emojis.cache
      .map((emoji) => emoji)
      .slice(0, 5)
      .join(" ");
    const boostCount = message.guild.premiumSubscriptionCount;
    const verificationLevel = message.guild.verificationLevel;
    const rolesCount = message.guild.roles.cache.size;

    await message.reply({
      embeds: [
        new Discord.MessageEmbed()
          .setColor(`${Color || `#000000`}`)
          .setAuthor({
            name: `${message.guild.name}'s Information`,
            iconURL: message.guild.iconURL({
              dynamic: true,
              size: 1024,
              format: "png",
            }),
          })
          .setThumbnail(
            message.guild.iconURL({ dynamic: true, size: 1024, format: "png" })
          )
          .addFields(
            {
              name: "🆔 Server ID:",
              value: `${message.guildId}`,
              inline: true,
            },
            {
              name: "📆 Created On:",
              value: `**<t:${Math.floor(
                message.guild.createdTimestamp / 1000
              )}:R>**`,
              inline: true,
            },
            {
              name: "👑 Owned by:",
              value: `<@!${message.guild.ownerId}>`,
              inline: true,
            },
            {
              name: `👥  Members (${message.guild.memberCount}):`,
              value: `**${
                members.filter((member) => member.presence?.status === "online")
                  .size +
                members.filter((member) => member.presence?.status === "idle")
                  .size +
                members.filter((member) => member.presence?.status === "dnd")
                  .size
              }** Online | Idle | DND\n**${
                members.filter(
                  (member) =>
                    !["online", "idle", "dnd"].includes(member.presence?.status)
                ).size
              }** Offline\n**${
                members.filter((member) => member.user.bot).size
              }** Bot`,
              inline: true,
            },
            {
              name: `💬 Channels (${message.guild.channels.cache.size}):`,
              value: `**${
                channels.filter((channel) => channel.type == "GUILD_TEXT").size
              }** Text | **${
                channels.filter((channel) => channel.type === "GUILD_VOICE")
                  .size
              }** Voice\n**${
                channels.filter((channel) => channel.type === "GUILD_CATEGORY")
                  .size
              }** Category`,
              inline: true,
            },
            {
              name: `🌐 Others:`,
              value: `Verification Level: **${verificationLevel}**\nBoosts: **${boostCount}** 🔮\nRoles: **${rolesCount}**`,
              inline: true,
            },
            {
              name: `🛡️ Emojis (${emojis}):`,
              value: `**${firstFiveEmojis}**`,
              inline: true,
            }
          ),
      ],
    });
  }
});
///////////
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(`${client.prefix}banner`)) {
    const Color = db.get(`Guild_Color = ${message.guild?.id}`) || `#000000`;
    if (!Color) return;

    let setchannek = Data.get(`setChannel_${message.guild.id}`);
    if (message.channel.id !== setchannek) return;
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(message.content.split(" ")[1]) ||
      message.member;
    let banner = false;
    await user.user.fetch().then((user) => {
      if (user.banner) {
        banner = user.bannerURL({ dynamic: true, size: 1024 });
      }
    });
    if (!banner)
      return message.reply(
        `** This user \`${user.user.username}\` doesn't have a banner!**`
      );
    const embed = new MessageEmbed()
      .setColor(`${Color || `#000000`}`)
      .setTitle(`${user.user.username}'s Banner`)
      .setURL(`${banner}`)
      .setImage(`${banner}`)
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("banner Link")
        .setStyle("LINK")
        .setURL(`${user.user.bannerURL({ dynamic: true, size: 1024 })}`)
    );
    message.reply({ embeds: [embed], components: [row] });
  }
});
///////////
try {
  const Discord = require(`discord.js`);
  const db = require(`pro.db`);
  client.on("messageCreate", async (interaction) => {
    const channelIds = db.get(`Channel_Feed_${interaction.guild?.id}`);
    if (!channelIds) {
      return;
    }
    const Line = db.get(`Line`);
    if (!Line) {
      return;
    }
    const Color =
      db.get(`Guild_Color = ${interaction.guild.id}`) ||
      interaction.guild.members.me.displayHexColor ||
      `#000000`;
    if (!Color) return;

    if (channelIds.includes(interaction.channel.id)) {
      if (interaction.author.bot) {
        return;
      }
      if (!interaction.guild) {
        return;
      }
      let user =
        interaction.mentions.members.first() ||
        interaction.guild.members.cache.get(
          interaction.content.split(" ")[1]
        ) ||
        interaction.member;

      let args = interaction.content.split(" ").join(` `);

      const embed = new Discord.MessageEmbed()
        .setAuthor({
          name: interaction.author.username,
          iconURL: interaction.author.avatarURL({ dynamic: true }),
        })
        .setThumbnail(user.user.avatarURL({ dynamic: true }))
        .setFooter({
          text: interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        })
        .setDescription(`${args}`)
        .setColor(`${Color || `#000000`}`);
      let attachm = interaction.attachments.first();
      if (attachm) {
        embed.setImage(attachm.proxyURL);
      }
      await interaction.channel.send({ embeds: [embed] }).then(async (msg) => {
        await msg.react(`<a:bb:1113100849657417779>`).catch(() => {});
        await msg.react(`<:14:1113101156013592666>`).catch(() => {});
        await interaction.channel.send({ files: [`${Line}`] });
      });
      await interaction.delete();
    }
  });
} catch {
  (async) => 0;
}
/////
client.on("messageCreate", async (message) => {
  if (!message.guild || !message.guild.id) return;

  const antiLinksEnabled = db.get(`antilinks-${message.guild.id}`);
  if (antiLinksEnabled !== "on") return;

  if (!message.content.includes("discord.gg/")) return;

  try {
    if (message.deletable && !message.member.permissions.has("ADMINISTRATOR")) {
      await message.delete();
    }
  } catch (error) {
    return;
  }
});
///////////
client.on("guildMemberAdd", async (member) => {
  if (!member.user.bot) return;

  if (db.get(`antibots-${member.guild.id}`) == "on") {
    if (!member.kickable) return;
    member.kick("AntiBot Is Turned ON");
  }
});
/////////////////
const maxMessages = 5; // Maximum number of consecutive messages allowed
const timeWindow = 10; // Time window in seconds to check for consecutive messages
const muteDuration = 5 * 60 * 1000; // Mute duration in milliseconds

client.on("messageCreate", async (message) => {
  if (!message.guild || !message.guild.id) return;

  const antiSpamEnabled = db.get(`antispam-${message.guild.id}`);
  if (antiSpamEnabled !== "on") return;

  const authorId = message.author.id;
  const now = Date.now();

  // Get the message history of the author
  let messageHistory = db.get(`antispam-${message.guild.id}-${authorId}`) || [];

  // Filter out old messages
  messageHistory = messageHistory.filter(entry => now - entry.timestamp < timeWindow * 1000);

  // Add the new message to the history
  messageHistory.push({
    content: message.content,
    timestamp: now
  });

  // Save the updated message history
  db.set(`antispam-${message.guild.id}-${authorId}`, messageHistory);

  // Check if the author has sent too many repeated messages
  if (messageHistory.length >= maxMessages) {
    try {
      if (message.deletable && !message.member.permissions.has("ADMINISTRATOR")) {
        await message.delete();

        // Get the spam role
        const spamRole = message.guild.roles.cache.find(role => role.name === "tmute");
        if (!spamRole) return;

        // Add the spam role to the member and remove it after the mute duration
        const member = message.member;
        await member.roles.add(spamRole);
        setTimeout(() => member.roles.remove(spamRole), muteDuration);
      }
    } catch (error) {
      return;
    }
  }
});//////////

//////////////////
var { inviteTracker } = require("discord-inviter"),
  tracker = new inviteTracker(client);
let packagejson = JSON.parse(fs.readFileSync("./rooms.json", "utf8"));
client.on("guildMemberRemove", async (member) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members == "") return;
  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
  });
  const kickLog = fetchedLogs.entries.first();
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members}`
  );
  if (!channel1) return;
  if (!member.guild.id.includes(`${channel1.guild.id}`)) return;

  if (
    !kickLog.action.includes("MEMBER_KICK") &&
    !member.user.id.includes(`${kickLog.target.id}`)
  ) {
    channel1.send(`**${member.user.tag} Left The Server 😥**`);
  }
  const { executor, target } = kickLog;

  if (
    kickLog.action == "MEMBER_KICK" &&
    kickLog.target.id == `${member.user.id}`
  ) {
    let channel = client.channels.cache.get(
      `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).kick}`
    );
    if (!channel) return;
    if (!member.guild.id.includes(`${channel.guild.id}`)) return;
    let Embed = new Discord.MessageEmbed()
      .setTitle("New Member Kicked !")
      .setDescription(`**${member.user.tag} Was kicked by ${executor}**`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }));
    channel.send({ embeds: [Embed] });
  }
});
tracker.on("guildMemberAdd", async (member, inviter) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members == "") return;
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members}`
  );
  if (!channel1) return;
  if (!member.guild.id.includes(`${channel1.guild.id}`)) return;
  if (member.user.bot) return;
  channel1.send(`**${member} Joined The Server \nBy : ${inviter} 🥳**`);
});
client.on("guildMemberAdd", async (member) => {
  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: "BOT_ADD",
  });
  const BotLog = fetchedLogs.entries.first();
  const { executor, target } = BotLog;
  if (member.user.bot) {
    let channel2 = client.channels.cache.get(
      `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).bots}`
    );
    if (!channel2) return;
    if (!member.guild.id.includes(`${channel2.guild.id}`)) return;
    return channel2.send(`**${member} Joined The Server \nBy : ${executor}**`);
  }
});
client.on("guildBanAdd", async (member) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).ban == "") return;
  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_BAN_ADD",
  });
  const BanLog = fetchedLogs.entries.first();
  const { executor, target } = BanLog;
  let channel = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).ban}`
  );
  if (!channel) return;
  if (!member.guild.id.includes(`${channel.guild.id}`)) return;
  let Embed = new Discord.MessageEmbed()
    .setTitle("New Member Banned ! ✈")
    .setDescription(`**${member.user.tag} Was Banned By ${executor}**`)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }));
  channel.send({ embeds: [Embed] });
});
client.on("guildBanRemove", async (member) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).ban == "") return;
  const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_BAN_REMOVE",
  });
  const BanLog = fetchedLogs.entries.first();
  const { executor, target } = BanLog;
  let channel = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).ban}`
  );
  if (!channel) return;
  if (!member.guild.id.includes(`${channel.guild.id}`)) return;
  let Embed = new Discord.MessageEmbed()
    .setTitle("New Member Unbanned ! 🤗")
    .setDescription(`**${member.user.tag} Was Unbanned By ${executor}**`)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }));
  channel.send({ embeds: [Embed] });
});
client.on("messageDelete", async (message) => {
  if (message.author.bot) return;
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).messages == "")
    return;
  if (!message.guild) return;
  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: "MESSAGE_DELETE",
  });
  const deletionLog = fetchedLogs.entries.first();
  let channel = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).messages}`
  );
  if (!channel) return;
  if (!message.guild.id.includes(`${channel.guild.id}`)) return;
  const { executor, target } = deletionLog;
  if (executor.id == message.author.id) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Message Deleted ! ❌")
      .setDescription(
        `**Message Author : ${message.author.tag}\n\nMessage Content : ${message.content}**`
      )
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`);
    channel.send({ embeds: [embed] });
  }
  if (!executor.id.includes(`${message.author.id}`)) {
    let embed1 = new Discord.MessageEmbed()
      .setTitle("Message Deleted !")
      .setDescription(
        `**Message Author : ${message.author.tag}\n\nMessage Content : ${message.content}\n\nDeleted By : ${executor}**`
      )
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`);
    channel.send({ embeds: [embed1] });
  }
});
client.on("messageUpdate", (message) => {
  if (message.author.bot) return;
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).messages == "")
    return;
  let channel = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).messages}`
  );
  if (!channel) return;
  if (!message.guild.id.includes(`${channel.guild.id}`)) return;
  let embed = new Discord.MessageEmbed()
    .setTitle("Message Edited ! ⚠")
    .setDescription(
      `**Old Message : ${message.content}\n\nNew Message : ${message.reactions.message.content}\n\nMessage Link : [here](${message.url})\n\nSent By : ${message.author}**`
    )
    .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`);
  channel.send({ embeds: [embed] });
});
client.on("channelCreate", async (channel) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels == "")
    return;
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels}`
  );
  if (!channel1) return;
  if (!channel.guild.id.includes(`${channel1.guild.id}`)) return;
  const fetchedLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_CREATE",
  });
  const CreateLog = fetchedLogs.entries.first();
  const { executor } = CreateLog;
  if (executor.bot) return;
  let embed = new Discord.MessageEmbed()
    .setTitle("Channel Created ! ✅")
    .setDescription(
      `**Channel Name : ${channel.name}\n\nChannel ID : ${channel.id}\n\nCreated By : ${executor}**`
    )
    .setThumbnail(`${executor.displayAvatarURL({ dynamic: true })}`);
  channel1.send({ embeds: [embed] });
});
client.on("channelDelete", async (channel) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels == "")
    return;
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels}`
  );
  if (!channel1) return;
  if (!channel.guild.id.includes(`${channel1.guild.id}`)) return;
  const fetchedLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_DELETE",
  });
  const CreateLog = fetchedLogs.entries.first();
  const { executor } = CreateLog;
  if (executor.bot) return;

  let embed = new Discord.MessageEmbed()
    .setTitle("Channel Deleted ! ❌")
    .setDescription(
      `**Channel Name : ${channel.name}\n\nChannel ID : ${channel.id}\n\nDeleted By : ${executor}**`
    )
    .setThumbnail(`${executor.displayAvatarURL({ dynamic: true })}`);
  channel1.send({ embeds: [embed] });
});
client.on("channelUpdate", async (Old, New) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels == "")
    return;
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels}`
  );
  if (!channel1) return;
  if (!Old.guild.id.includes(`${channel1.guild.id}`)) return;
  if (!New.guild.id.includes(`${channel1.guild.id}`)) return;
  const fetchedLogs = await New.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_UPDATE",
  });
  const fetchedLogs2 = await New.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_OVERWRITE_UPDATE	",
  });
  const UpdateLog = fetchedLogs.entries.first();
  const { executor } = UpdateLog;
  const UpdateLog2 = fetchedLogs2.entries.first();
  if (UpdateLog2.executor.bot) return;

  if (Old.name != New.name) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Channel Updated ! ⚠")
      .setDescription(
        `**Old Name Channel : ${Old.name}\n\nNew Name Channel : ${New.name}\n\nChannel ID : ${New.id}\n\nUpdated By : ${executor}**`
      )
      .setThumbnail(`${executor.displayAvatarURL({ dynamic: true })}`);
    channel1.send({ embeds: [embed] });
  }
});
client.on("roleCreate", async (role) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).roles == "") return;
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).roles}`
  );
  if (!channel1) return;
  if (!role.guild.id.includes(`${channel1.guild.id}`)) return;
  const fetchedLogs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_CREATE",
  });
  const RoleLog = fetchedLogs.entries.first();
  const { executor } = RoleLog;
  let embed = new Discord.MessageEmbed()
    .setTitle("Role Created ! ✅")
    .setDescription(
      `**Role Name : ${role.name}\n\nRole ID : ${role.id}\n\nCreated By : ${executor}**`
    )
    .setThumbnail(`${executor.displayAvatarURL({ dynamic: true })}`);
  channel1.send({ embeds: [embed] });
});

client.on("roleDelete", async (role) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).roles == "") return;
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).roles}`
  );
  if (!channel1) return;
  if (!role.guild.id.includes(`${channel1.guild.id}`)) return;
  const fetchedLogs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_DELETE",
  });
  const RoleLog = fetchedLogs.entries.first();
  const { executor } = RoleLog;
  let embed = new Discord.MessageEmbed()
    .setTitle("Role Deleted ! ❌")
    .setDescription(
      `**Role Name : ${role.name}\n\nRole ID : ${role.id}\n\nDeleted By : ${executor}**`
    )
    .setThumbnail(`${executor.displayAvatarURL({ dynamic: true })}`);
  channel1.send({ embeds: [embed] });
});
client.on("roleUpdate", async (Old, New) => {
  ///// made by 𝐅𝐃 | 𝐁𝐥𝐮𝐞 𝐅𝐥𝐚𝐦𝐞 ✨#3089
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).roles == "") return;
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).roles}`
  );
  if (!channel1) return;
  if (!Old.guild.id.includes(`${channel1.guild.id}`)) return;
  if (!New.guild.id.includes(`${channel1.guild.id}`)) return;
  const fetchedLogs = await New.guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_UPDATE",
  });
  const RoleLog = fetchedLogs.entries.first();
  const { executor } = RoleLog;
  if (Old.name != New.name) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Role Updated ! ⚠")
      .setDescription(
        `**Old Role Name : ${Old.name}\n\nNew Role Name : ${New.name}\n\nRole ID : ${New.id}\n\nUpdated By : ${executor}**`
      )
      .setThumbnail(`${executor.displayAvatarURL({ dynamic: true })}`);
    channel1.send({ embeds: [embed] });
  }
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).voice == "") return;
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).voice}`
  );
  if (!channel1) return;
  if (oldState.member.bot) return;
  if (newState.member.bot) return;
  if (!newState.guild.id.includes(`${channel1.guild.id}`)) return;
  if (!oldState.guild.id.includes(`${channel1.guild.id}`)) return;

  if (!oldState.channelId && newState.channelId) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Member Voice Connected ! ✅")
      .setDescription(
        `**${newState.member.user.tag} has joined voice channel " ${newState.channel.name} "**`
      )
      .setThumbnail(`${newState.member.displayAvatarURL({ dynamic: true })}`);
    return channel1.send({ embeds: [embed] });
  }
  if (
    oldState.channelId &&
    !newState.channelId &&
    oldState.member.user.bot === false
  ) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Member Voice Disconnected ! ❌")
      .setDescription(
        `**${oldState.member.user.tag} has disconnected from voice channel " ${oldState.channel.name} "**`
      )
      .setThumbnail(`${oldState.member.displayAvatarURL({ dynamic: true })}`);

    return channel1.send({ embeds: [embed] });
  }
  if (oldState.channelId !== newState.channelId) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Member Voice Moved ! 🔁")
      .setDescription(
        `**${newState.member.user.tag} has moved from  ${
          `"` + oldState.channel?.name + `"` ?? "a voice channel"
        } to ${`"` + newState.channel?.name + `"` ?? "a voice channel"}**`
      )
      .setThumbnail(`${oldState.member.displayAvatarURL({ dynamic: true })}`);
    return channel1.send({ embeds: [embed] });
  }
});

client.on("inviteCreate", async (invite) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).invites == "") return;
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).invites}`
  );
  if (!channel1) return;
  if (!invite.guild.id.includes(`${channel1.guild.id}`)) return;
  const fetchedLogs = await invite.guild.fetchAuditLogs({
    limit: 1,
    type: "INVITE_CREATE",
  });
  const InviteLog = fetchedLogs.entries.first();
  const { executor } = InviteLog;

  let embed = new Discord.MessageEmbed()
    .setTitle("Invite Created ! ✅")
    .setDescription(
      `**Invite Url : ${invite.url}\n\nCreated By : ${executor.tag}**`
    )
    .setThumbnail(`${executor.displayAvatarURL({ dynamic: true })}`);
  channel1.send({ embeds: [embed] });
});

client.on("inviteDelete", async (invite) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).invites == "") return;
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).invites}`
  );
  if (!channel1) return;
  if (!invite.guild.id.includes(`${channel1.guild.id}`)) return;
  const fetchedLogs = await invite.guild.fetchAuditLogs({
    limit: 1,
    type: "INVITE_DELETE",
  });
  const InviteLog = fetchedLogs.entries.first();
  const { executor, target } = InviteLog;

  let embed = new Discord.MessageEmbed()
    .setTitle("Invite Deleted ! ❌")
    .setDescription(
      `**Invite Url : ${invite.url}\n\nCreated By : ${target.inviter.tag}\n\nDeleted By : ${executor.tag}**`
    )
    .setThumbnail(`${executor.displayAvatarURL({ dynamic: true })}`);
  channel1.send({ embeds: [embed] });
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members == "") return;
  let channel1 = client.channels.cache.get(
    `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members}`
  );
  if (!channel1) return;
  if (!oldMember.guild.id.includes(`${channel1.guild.id}`)) return;
  if (!newMember.guild.id.includes(`${channel1.guild.id}`)) return;
  const fetchedLogs = await oldMember.guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_ROLE_UPDATE",
  });
  const RoleLog = fetchedLogs.entries.first();
  const { executor } = RoleLog;

  const removedRoles = oldMember.roles.cache.filter(
    (role) => !newMember.roles.cache.has(role.id)
  );
  if (removedRoles.size > 0) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Member Role Removed ! ❌")
      .setDescription(
        `**Role : \`${removedRoles.map((r) => r.name)}\`\n\nRemoved From : ${
          newMember.user.tag
        }\n\nRemoved By : ${executor}**`
      )
      .setThumbnail(`${newMember.user.displayAvatarURL({ dynamic: true })}`);
    channel1.send({ embeds: [embed] });
  }

  const addedRoles = newMember.roles.cache.filter(
    (role) => !oldMember.roles.cache.has(role.id)
  );
  if (addedRoles.size > 0) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Member Role Added ! ✅")
      .setDescription(
        `**Role : \`${addedRoles.map((r) => r.name)}\`\n\nAdded To : ${
          newMember.user.tag
        }\n\nAdded By : ${executor}**`
      )
      .setThumbnail(`${newMember.user.displayAvatarURL({ dynamic: true })}`);
    channel1.send({ embeds: [embed] });
  }
});

//////// set ban room
client.on("messageCreate", (message) => {
  if (message.content.startsWith(client.prefix + "setbanroom")) {
    const args = message.content.split(" ").slice(1).join(" ");
    const guild = message.guild.channels.cache.get(`${args}`);
    if (!guild) return message.react("❌");
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );
    if (args == JSON.parse(fs.readFileSync("./rooms.json", "utf8")).ban)
      return message.reply("**بالفعل موجوده**");
    if (guild.type != "GUILD_TEXT") return message.react("❌");
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    packagejson.ban = args;

    fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err)
        console.error(err).catch((err) => {
          console.error(err);
        });
    });

    let embed = new Discord.MessageEmbed()
      .setTitle(`تم تغييرها الى`)
      .setDescription(`> <#${args}>`);

    message.reply({ embeds: [embed] });
  }
});

//////// current ban room
client.on("messageCreate", (message) => {
  if (message.content == client.prefix + "banroom") {
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );

    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).ban == "")
      return message.reply("**لم يتم تحديد الروم الى الان**");

    let embed = new Discord.MessageEmbed()
      .setTitle(`الروم الحاليه هي`)
      .setDescription(
        `> <#${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).ban}>`
      );

    message.reply({ embeds: [embed] });
  }
});

//////// set kick room
client.on("messageCreate", (message) => {
  if (message.content.startsWith(client.prefix + "setkickroom")) {
    const args = message.content.split(" ").slice(1).join(" ");
    const guild = message.guild.channels.cache.get(`${args}`);
    if (!guild) return message.react("❌");
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );
    if (args == JSON.parse(fs.readFileSync("./rooms.json", "utf8")).kick)
      return message.reply("**بالفعل موجوده**");
    if (guild.type != "GUILD_TEXT") return message.react("❌");
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    packagejson.kick = args;

    fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err)
        console.error(err).catch((err) => {
          console.error(err);
        });
    });

    let embed = new Discord.MessageEmbed()
      .setTitle(`تم تغييرها الى`)
      .setDescription(`> <#${args}>`);

    message.reply({ embeds: [embed] });
  }
});
//////// current kick room
client.on("messageCreate", (message) => {
  if (message.content == client.prefix + "kickroom") {
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );

    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).kick == "")
      return message.reply("**لم يتم تحديد الروم الى الان**");

    let embed = new Discord.MessageEmbed()
      .setTitle(`الروم الحاليه هي`)
      .setDescription(
        `> <#${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).kick}>`
      );

    message.reply({ embeds: [embed] });
  }
});

//////// set messages room
client.on("messageCreate", (message) => {
  if (message.content.startsWith(client.prefix + "setmessagesroom")) {
    const args = message.content.split(" ").slice(1).join(" ");
    const guild = message.guild.channels.cache.get(`${args}`);
    if (!guild) return message.react("❌");
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );
    if (args == JSON.parse(fs.readFileSync("./rooms.json", "utf8")).messages)
      return message.reply("**بالفعل موجوده**");
    if (guild.type != "GUILD_TEXT") return message.react("❌");
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    packagejson.messages = args;

    fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err)
        console.error(err).catch((err) => {
          console.error(err);
        });
    });

    let embed = new Discord.MessageEmbed()
      .setTitle(`تم تغييرها الى`)
      .setDescription(`> <#${args}>`);

    message.reply({ embeds: [embed] });
  }
});

//////// current messages room
client.on("messageCreate", (message) => {
  if (message.content == client.prefix + "messagesroom") {
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );

    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).messages == "")
      return message.reply("**لم يتم تحديد الروم الى الان**");

    let embed = new Discord.MessageEmbed()
      .setTitle(`الروم الحاليه هي`)
      .setDescription(
        `> <#${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).messages}>`
      );

    message.reply({ embeds: [embed] });
  }
});

//////// set roles room
client.on("messageCreate", (message) => {
  if (message.content.startsWith(client.prefix + "setrolesroom")) {
    const args = message.content.split(" ").slice(1).join(" ");
    const guild = message.guild.channels.cache.get(`${args}`);
    if (!guild) return message.react("❌");
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );
    if (args == JSON.parse(fs.readFileSync("./rooms.json", "utf8")).roles)
      return message.reply("**بالفعل موجوده**");
    if (guild.type != "GUILD_TEXT") return message.react("❌");
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    packagejson.roles = args;

    fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err)
        console.error(err).catch((err) => {
          console.error(err);
        });
    });

    let embed = new Discord.MessageEmbed()
      .setTitle(`تم تغييرها الى`)
      .setDescription(`> <#${args}>`);

    message.reply({ embeds: [embed] });
  }
});

//////// current roles room
client.on("messageCreate", (message) => {
  if (message.content == client.prefix + "rolesroom") {
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );

    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).roles == "")
      return message.reply("**لم يتم تحديد الروم الى الان**");

    let embed = new Discord.MessageEmbed()
      .setTitle(`الروم الحاليه هي`)
      .setDescription(
        `> <#${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).kick}>`
      );

    message.reply({ embeds: [embed] });
  }
});

//////// set channels room
client.on("messageCreate", (message) => {
  if (message.content.startsWith(client.prefix + "setchannelsroom")) {
    const args = message.content.split(" ").slice(1).join(" ");
    const guild = message.guild.channels.cache.get(`${args}`);
    if (!guild) return message.react("❌");
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**"
    );
    if (args == JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels)
      return message.reply("**بالفعل موجوده**");
    if (guild.type != "GUILD_TEXT") return message.react("❌");
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    packagejson.channels = args;

    fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err)
        console.error(err).catch((err) => {
          console.error(err);
        });
    });

    let embed = new Discord.MessageEmbed()
      .setTitle(`تم تغييرها الى`)
      .setDescription(`> <#${args}>`);

    message.reply({ embeds: [embed] });
  }
});

//////// current channels room
client.on("messageCreate", (message) => {
  if (message.content == client.prefix + "channelsroom") {
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );

    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels == "")
      return message.reply("**لم يتم تحديد الروم الى الان**");

    let embed = new Discord.MessageEmbed()
      .setTitle(`الروم الحاليه هي`)
      .setDescription(
        `> <#${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels}>`
      );

    message.reply({ embeds: [embed] });
  }
});

//////// set bots room
client.on("messageCreate", (message) => {
  if (message.content.startsWith(client.prefix + "setbotsroom")) {
    const args = message.content.split(" ").slice(1).join(" ");
    const guild = message.guild.channels.cache.get(`${args}`);
    if (!guild) return message.react("❌");
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );
    if (args == JSON.parse(fs.readFileSync("./rooms.json", "utf8")).bots)
      return message.reply("**بالفعل موجوده**");
    if (guild.type != "GUILD_TEXT") return message.react("❌");
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    packagejson.bots = args;

    fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err)
        console.error(err).catch((err) => {
          console.error(err);
        });
    });

    let embed = new Discord.MessageEmbed()
      .setTitle(`تم تغييرها الى`)
      .setDescription(`> <#${args}>`);

    message.reply({ embeds: [embed] });
  }
});

//////// current bots room
client.on("messageCreate", (message) => {
  if (message.content == client.prefix + "botsroom") {
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );

    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).bots == "")
      return message.reply("**لم يتم تحديد الروم الى الان**");

    let embed = new Discord.MessageEmbed()
      .setTitle(`الروم الحاليه هي`)
      .setDescription(
        `> <#${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).bots}>`
      );

    message.reply({ embeds: [embed] });
  }
});

//////// set voice room
client.on("messageCreate", (message) => {
  if (message.content.startsWith(client.prefix + "setvoiceroom")) {
    const args = message.content.split(" ").slice(1).join(" ");
    const guild = message.guild.channels.cache.get(`${args}`);
    if (!guild) return message.react("❌");
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );
    if (args == JSON.parse(fs.readFileSync("./rooms.json", "utf8")).voice)
      return message.reply("**بالفعل موجوده**");
    if (guild.type != "GUILD_TEXT") return message.react("❌");
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    packagejson.voice = args;

    fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err)
        console.error(err).catch((err) => {
          console.error(err);
        });
    });

    let embed = new Discord.MessageEmbed()
      .setTitle(`تم تغييرها الى`)
      .setDescription(`> <#${args}>`);

    message.reply({ embeds: [embed] });
  }
});

//////// current voice room
client.on("messageCreate", (message) => {
  if (message.content == client.prefix + "voiceroom") {
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );

    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });

    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).voice == "")
      return message.reply("**لم يتم تحديد الروم الى الان**");

    let embed = new Discord.MessageEmbed()
      .setTitle(`الروم الحاليه هي`)
      .setDescription(
        `> <#${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).voice}>`
      );

    message.reply({ embeds: [embed] });
  }
});

//////// set members room
client.on("messageCreate", (message) => {
  if (message.content.startsWith(client.prefix + "setmembersroom")) {
    const args = message.content.split(" ").slice(1).join(" ");
    const guild = message.guild.channels.cache.get(`${args}`);
    if (!guild) return message.react("❌");
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );
    if (args == JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members)
      return message.reply("**بالفعل موجوده**");
    if (guild.type != "GUILD_TEXT") return message.react("❌");
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });
    packagejson.members = args;
    fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err)
        console.error(err).catch((err) => {
          console.error(err);
        });
    });
    let embed = new Discord.MessageEmbed()
      .setTitle(`تم تغييرها الى`)
      .setDescription(`> <#${args}>`);
    message.reply({ embeds: [embed] });
  }
});
//////// current members room
client.on("messageCreate", (message) => {
  if (message.content == client.prefix + "membersroom") {
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**"
    );
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members == "")
      return message.reply("**لم يتم تحديد الروم الى الان**");
    let embed = new Discord.MessageEmbed()
      .setTitle(`الروم الحاليه هي`)
      .setDescription(
        `> <#${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members}>`
      );
    message.reply({ embeds: [embed] });
  }
});
//////// set invites room
client.on("messageCreate", (message) => {
  if (message.content.startsWith(client.prefix + "setinvitesroom")) {
    const args = message.content.split(" ").slice(1).join(" ");
    const guild = message.guild.channels.cache.get(`${args}`);
    if (!guild) return message.react("❌");
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيات لأستخدام هذا الامر ❌**"
    );
    if (args == JSON.parse(fs.readFileSync("./rooms.json", "utf8")).invites)
      return message.reply("**بالفعل موجوده**");
    if (guild.type != "GUILD_TEXT") return message.react("❌");
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });
    packagejson.invites = args;
    fs.writeFileSync("./rooms.json", JSON.stringify(packagejson), (err) => {
      if (err)
        console.error(err).catch((err) => {
          console.error(err);
        });
    });
    let embed = new Discord.MessageEmbed()
      .setTitle(`تم تغييرها الى`)
      .setDescription(`> <#${args}>`);
    message.reply({ embeds: [embed] });
  }
});
//////// current invites room
client.on("messageCreate", (message) => {
  if (message.content == client.prefix + "invitesroom") {
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**"
    );
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).invites == "")
      return message.reply("**لم يتم تحديد الروم الى الان**");
    let embed = new Discord.MessageEmbed()
      .setTitle(`الروم الحاليه هي`)
      .setDescription(
        `> <#${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).invites}>`
      );
    message.reply({ embeds: [embed] });
  }
});
client.on("messageCreate", (message) => {
  if (message.content.startsWith(client.prefix + "loglist")) {
    let embed1 = new Discord.MessageEmbed().setDescription(
      "> **انت لا تمتلك صلاحيه لأستخدام هذا الامر ❌**"
    );
    if (!config.owners.includes(message.author.id))
      return message.reply({ embeds: [embed1] });
    let ban = `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).ban}`;
    let kick = `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).kick}`;
    let messages = `${
      JSON.parse(fs.readFileSync("./rooms.json", "utf8")).messages
    }`;
    let channels = `${
      JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels
    }`;
    let roles = `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).roles}`;
    let members = `${
      JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members
    }`;
    let bots = `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).bots}`;
    let voice = `${JSON.parse(fs.readFileSync("./rooms.json", "utf8")).voice}`;
    let invites = `${
      JSON.parse(fs.readFileSync("./rooms.json", "utf8")).invites
    }`;
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).ban == "") {
      ban = ban.replace(/^$/, "**Not Exist**");
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).ban != "") {
      ban = "<#" + ban + ">";
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).kick == "") {
      kick = kick.replace(/^$/, "**Not Exist**");
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).kick != "") {
      kick = "<#" + kick + ">";
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).messages == "") {
      messages = messages.replace(/^$/, "**Not Exist**");
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).messages != "") {
      messages = "<#" + messages + ">";
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels == "") {
      channels = channels.replace(/^$/, "**Not Exist**");
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).channels != "") {
      channels = "<#" + channels + ">";
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).roles == "") {
      roles = roles.replace(/^$/, "**Not Exist**");
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).roles != "") {
      roles = "<#" + roles + ">";
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members == "") {
      members = members.replace(/^$/, "**Not Exist**");
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).members != "") {
      members = "<#" + members + ">";
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).bots == "") {
      bots = bots.replace(/^$/, "**Not Exist**");
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).bots != "") {
      bots = "<#" + bots + ">";
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).voice == "") {
      voice = voice.replace(/^$/, "**Not Exist**");
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).voice != "") {
      voice = "<#" + voice + ">";
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).invites == "") {
      invites = invites.replace(/^$/, "**Not Exist**");
    }
    if (JSON.parse(fs.readFileSync("./rooms.json", "utf8")).invites != "") {
      invites = "<#" + invites + ">";
    }
    let embed = new Discord.MessageEmbed()
      .setTitle("Log Channels List")
      .setDescription(
        `**Ban Log Channel :**\n> ${ban}\n\n**Kick Log Channel :**\n> ${kick}\n\n**Messages Log Channel : **\n> ${messages}\n\n**Channels Log Channel : **\n> ${channels}\n\n**Roles Log Channel : **\n> ${roles}\n\n**Members Log Channel :**\n> ${members}\n\n**Bots Log Channel :**\n> ${bots}\n\n**Voice Log Channel**\n> ${voice}\n\n**Invites Log Channel**\n> ${invites}`
      )
      .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`);
    message.reply({ embeds: [embed] });
  }
});
////////////////////////////////////
client.on("interactionCreate", (interaction) => {
  const Color = db.get(`Guild_Color = ${interaction.guild?.id}`) || `#000000`;
  if (!Color) return;
  if (!interaction.isSelectMenu()) return;
  if (interaction.values == "1help_option") {
    let replyembed = new Discord.MessageEmbed()
      .setColor(`${Color || `#000000`}`)
      .setTitle("💡 الاوامر العامه :")
      .setTimestamp().setDescription(`- \`${client.prefix}help\` : قائمه المساعدة
- \`${client.prefix}color\` : اختيار لون
- \`${client.prefix}colors\` : اظهار علبة الالوان
- \`${client.prefix}avatar\` : افتار العضو
- \`${client.prefix}banner\` : بنر العضو
- \`${client.prefix}ping\` : اظهار سرعه البوت
- \`${client.prefix}user\` : معلومات العضو
- \`${client.prefix}link\` : نسخ رابط للسيرفر
- \`${client.prefix}invites\` : عدد دعواتك
- \`${client.prefix}top-invites\` : قائمة اعلى الدعوات
- \`${client.prefix}semoji\` : ارسال صورة الايموجي
- \`${client.prefix}bserver\` : بنر السيرفر
- \`${client.prefix}savatar\` : افتار السيرفر`);
    interaction.update({ embeds: [replyembed] });
  }
  if (interaction.values == "2help_option") {
    let replyembed = new Discord.MessageEmbed()
      .setTitle("💡 اوامر الادارة :")
      .setColor(`${Color || `#000000`}`)
      .setTimestamp().setDescription(`- \`${client.prefix}block\` : بلوك عضو من رول
- \`${client.prefix}myvmute\` : معلومات الميوت الصوتي للعضو
- \`${client.prefix}myprison\` : معلومات السجن للعضو
- \`${client.prefix}ban\` : حظر عضو من السيرفر
- \`${client.prefix}kick\` : طرد عضو من السيرفر
- \`${client.prefix}clear\` : مسح رسائل الشات
- \`${client.prefix}move\` : سحب عضو الى روم اخر
- \`${client.prefix}moveme\` : سحبك الى روم اخر
- \`${client.prefix}mute \` : اسكات كتابي
- \`${client.prefix}prison\` : سجن عضو
- \`${client.prefix}allbans\` : قائمة المحظورين
- \`${client.prefix}unmute\` : الغاء الاسكات الكتابي
- \`${client.prefix}unprison\` : فك سجن عضو
- \`${client.prefix}unban\` : الغاء حظر عن عضو
- \`${client.prefix}unbanall\` : الغاء المحظورين من السيرفر`);
    interaction.update({ embeds: [replyembed] });
  }
  if (interaction.values == "10help_option") {
    let replyembed = new Discord.MessageEmbed()
      .setTitle("💡 اوامر المعلومات :")
      .setColor(`${Color || `#000000`}`)
      .setTimestamp().setDescription(`- \`${client.prefix}adminlist\` : اظهار جميع الادمن بالسيرفر
- \`${client.prefix}addemoji\` : اضافة ايموجي (سلاش كوماند)
- \`${client.prefix}applay\` : تفعيل المنشن والصور بالشات
- \`${client.prefix}disapplay\` : تعطيل المنشن والصور بالشات
- \`${client.prefix}rooms\` :  اظهار الادمن الخارجين من الرومات الصوتيه
- \`${client.prefix}chkevc\` : اظهار من يمتلك الرول و الحالة الصوتيه
- \`${client.prefix}check\` : تشييك على الاعضاء في الرول
- \`${client.prefix}hide\` : اخفاء شات
- \`${client.prefix}lock\` : قفل الشات
- \`${client.prefix}server\` : اظهار معلومات السيرفر
- \`${client.prefix}slowmode\` : تفعيل السلومود بالشات
- \`${client.prefix}unhide\` : اظهار الشات
- \`${client.prefix}unlock \` : فتح الشات
- \`${client.prefix}autorole\` : تحديد الرول التلقائي
- \`${client.prefix}hideall\` :اخفاء جميع القنوات
- \`${client.prefix}showall\` : اظهر جميع القنوات
- \`${client.prefix}roleall\` : اعطاء رول لجميع الاعضاء
- \`${client.prefix}roleremove\` : إزالة رول من الجميع عن طريق الايدي`);
    interaction.update({ embeds: [replyembed] });
  }

  if (interaction.values == "3help_option") {
    let replyembed = new Discord.MessageEmbed()
      .setTitle("💡 اوامر الشاتات :")
      .setColor(`${Color || `#000000`}`)
      .setTimestamp().setDescription(`
- \`${client.prefix}feeling\` : تحديد شات فلينج , المشاعر
- \`${client.prefix}sline\` : تحديد الخط التلقائي
- \`${client.prefix}cline\` : تحديد رومات الخط التلقائي
- \`${client.prefix}react\` : وضع رياكشنات تلقائية على شات محدد
- \`${client.prefix}dreact\` : حذف الرياكشنات التلقائية من شات
- \`${client.prefix}order\` : تحديد شات الاوامر العامة
- \`${client.prefix}creatcolors\` : إنشاء 25 رول الوان تلقائي عند كتابه الامر
- \`${client.prefix}chatcolor\` : تحديد شات المسح التلقائي كل 5 دقائق
- \`${client.prefix}crimage\` : تحديد رابط خلفية قائمة الالوان
- \`${client.prefix}enchat\` : تحديد شات تقييم التكت
- \`${client.prefix}edit-welcome\` : تعديل جميع اوامر الولكم`);
    interaction.update({ embeds: [replyembed] });
  }
  if (interaction.values == "9help_option") {
    let replyembed = new Discord.MessageEmbed()
      .setTitle("💡 اوامر الرولات :")
      .setColor(`${Color || `#000000`}`)
      .setTimestamp().setDescription(`- \`${client.prefix}setbrole\` : تعين رولات البلوك
- \`${client.prefix}wsrole\` : سماح او منع شخص او رول من انشاء رول خاص
- \`${client.prefix}wrlist\` : قائمة الاشخاص و الرولات المسموح لهم بنشاء رول خاص
- \`${client.prefix}srole\` : انشاء رول خاص
- \`${client.prefix}role\` : اضافة رول للعضو
- \`${client.prefix}image\` : اعطاء رتبه الصور
- \`${client.prefix}screen\` : اعطاء رتبه السكرين
- \`${client.prefix}nick\` : اعطاء رول تغير اسم
- \`${client.prefix}role\` :  اعطاء رول , سحب رول
- \`${client.prefix}addrole\` : انشاء رول جديد`);
    interaction.update({ embeds: [replyembed] });
  }

  if (interaction.values == "4help_option") {
    let replyembed = new Discord.MessageEmbed()
      .setTitle("💡 اوامر الحماية :")
      .setColor(`${Color || `#000000`}`)
      .setTimestamp()
      .setDescription(`- \`${client.prefix}wanti\` : اضافة او ازالة شخص لمسح الرولات و الرومات
- \`${client.prefix}wantilist\` : عرض الاشخاص المسموح لهم بحذف الرولات و الرومات
- \`${client.prefix}roles_backup\` :  استرجاع الرولات
- \`${client.prefix}restore_backup\` : نسخ احتياطي للرولات
- \`${client.prefix}serveravatar\` : تغير افتارالسيرفر
- \`${client.prefix}servername\` : تغير اسم السيرفر
- \`${client.prefix}antilink [off/on]\` : تفعيل والغاء الحماية من الروابط
- \`${client.prefix}antijoin [off/on]\` : سجن الحسابات الجديدة
- \`${client.prefix}antibot [off/on]\` : تفعيل والغاء الحماية من البوتات
- \`${client.prefix}antispam [off/on]\` : تفعيل والغاء الحماية من السبام
- \`${client.prefix}word\` : اضافة ازالة كلمات يعاقب كاتبها
- \`${client.prefix}wordlist\` : قائمة الكلمات التي يعاقب كاتبها
- \`${client.prefix}bots\` : اظهار البوتات الموجودة بالسيرفر`);
    interaction.update({ embeds: [replyembed] });
  }
  if (interaction.values == "5help_option") {
    let replyembed = new Discord.MessageEmbed()
    .setTitle("💡 اوامر اللوق :")
    .setColor(`${Color || `#000000`}`)
    .setTimestamp()
    .setDescription(`- \`${client.prefix}setinvitesroom\` : تعين لوق الدعوات
- \`${client.prefix}setmembersroom\` : تعين لوق الاعضاء
- \`${client.prefix}setvoiceroom\` : تعين لوق الفويس
- \`${client.prefix}setbotsroom\` : تعين روم لوق البوتات
- \`${client.prefix}setrolesroom\` : تعين روم لوق الرول
- \`${client.prefix}setchannelsroom\` : تعين لوق تعديل القنوات
- \`${client.prefix}setmessagesroom\` : تعين لوق الرسائل
- \`${client.prefix}setkickroom\` : تعين لوق الطرد
- \`${client.prefix}setbanroom\` : تعين لوق الحظر
- \`${client.prefix}loglist\` : عرض جميع اللوقات`);
    interaction.update({ embeds: [replyembed] });
  }

  if (interaction.values == "6help_option") {
    let replyembed = new Discord.MessageEmbed()
    .setTitle("💡 اوامر القروبات :")
    .setTimestamp()
    .setColor(`${Color || `#000000`}`)
    .setDescription(`- \`${client.prefix}setgroup\` : انشاء كاتغوري الروم الصوتي والكتابي للقروبات
- \`${client.prefix}cgroup\` : انشاء قروب جديد
- \`${client.prefix}owner-group\` : تعين اونر للقروب
- \`${client.prefix}grole\` : اضافة عضو الى القروب
- \`${client.prefix}dgroup\` : حذف قروب
- \`${client.prefix}ginfo\` : معلومات القروب`);
    interaction.update({ embeds: [replyembed] });
  }

  if (interaction.values == "11help_option") {
    let replyembed = new Discord.MessageEmbed()
    .setTitle("💡 اوامر الاعدادات :")
    .setTimestamp()
    .setColor(`${Color || `#000000`}`)
    .setDescription(`- \`${client.prefix}vc\` : تعين الفويس اونلاين
- \`${client.prefix}fmember\` : تعين عدد وهمي للفويس اونلاين
- \`${client.prefix}vname\` : تغير اسم الروم للفويس اونلاين
- \`${client.prefix}setrmute\` : تعين اسباب الاسكات الكتابي مع تحديد المدة
- \`${client.prefix}setrvmute\` : تعين اسباب الاسكات الصوتي مع تحديد المدة
- \`${client.prefix}setrprison\` : تعين اسباب السجن  مع تحديد المدة
- \`${client.prefix}penalties\` : اظهار قائمة عقوبات العضو
- \`${client.prefix}rpenalty\` : حذف عقوبات العضو`);
    interaction.update({ embeds: [replyembed] });
  }

  if (interaction.values == "7help_option") {
    let replyembed = new Discord.MessageEmbed()
    .setTitle("💡 التحكم الخاص :")
    .setColor(`${Color || `#000000`}`)
    .setTimestamp().setDescription(`- \`${client.prefix}info\` : معلومات
- \`${client.prefix}setname\` : تعين اسم البوت
- \`${client.prefix}setavatar\` : تعين صوره البوت
- \`${client.prefix}setplaying\` : تعين حاله البوت
- \`${client.prefix}setprefix\` : تغير بادئة البوت
- \`${client.prefix}send\` : ارسال رساله عن طريق البوت لعضو
- \`${client.prefix}say\` : ارسال رساله عن طريق البوت
- \`${client.prefix}embedcolor\` : تعين لون رسائل الامبيد`);
    interaction.update({ embeds: [replyembed] });
  }

  if (interaction.values == "8help_option") {
    interaction.message.delete();
  }
});
//////// طرد
client.on("messageCreate", async (message) => {
  const args = message.content.split(" ");
  const command = args[0];
  if (command === client.prefix + "kick" || command === prefix + "طرد") {
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      return message.react("❌");
    }
    const memberArg = args[1];
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.find(
        (member) =>
          member.id === memberArg ||
          member.user.tag === memberArg ||
          member.user.username === memberArg
      );
    if (!member) {
      return message.react("❌");
    }
    if (
      member.roles.highest.position >= message.member.roles.highest.position
    ) {
      return message.react("❌");
    }
    await member.kick();
    return message.react("✅");
  }
});
////////// رولات السجن والميوت التلقائي
client.on("guildMemberAdd", (member) => {
  const muted = Data.get(`MutedMember_${member.id}`);
  if (!muted) return;
  let muteRole = member.guild.roles.cache.find((role) => role.name == "prison");
  member.roles.add(muteRole);
});
client.on("guildMemberAdd", (member) => {
  const muted = Data.get(`Muted_Member_${member.id}`);
  if (!muted) return;
  let muteRole = member.guild.roles.cache.find((role) => role.name == "tmute");
  member.roles.add(muteRole);
});
////// رول تلقائي
let auto = JSON.parse(fs.readFileSync("./autorole.js", "utf8"));
client.on("messageCreate", (badboy) => {
  if (badboy.content.startsWith(client.prefix + "autorole")) {
    if (badboy.author.bot || !badboy.guild)
      return badboy.reply({ content: "this command for server only" });

    if (!badboy.member.permissions.has("ADMINISTRATOR"))
      return badboy.channel.send({
        content: "> **You do not have permission !!.**",
      });
    var role = badboy.mentions.roles.first();
    if (!role)
      return badboy.channel.send({ content: "**⛔️ - Please select role **" });
    auto[badboy.guild.id] = {
      rolejoin: role.id,
    };
    fs.writeFile("./autorole.js", JSON.stringify(auto), (err) => {
      if (err) console.error(err);
      badboy.channel.send({ content: "**✅ - Done successfully **" });
    });
  }
});

client.on("guildMemberAdd", (member) => {
  if (!auto[member.guild.id]) return;

  let rolejoin = member.guild.roles.cache.find(
    (role) => role.id === `${auto[member.guild.id].rolejoin}`
  );
  if (!rolejoin) return;
  member.roles.add(rolejoin);
});
/////////// رابط
client.on("messageCreate", (message) => {
  if (message.content.split(" ")[0] === client.prefix + "رابط") {
    setTimeout(() => {
      message.delete();
    }, 10000);
    let args;
    const user =
      message.guild.members.cache.get(message.author.id) || message.member;
    const maxUses = 3;
    const maxAge = Math.floor(Math.random() * 86399) + 86400;
    message.channel
      .createInvite({
        maxUses: maxUses,
        maxAge: maxAge,
        inviter: message.author,
      })
      .then((invite) => {
        user
          .send(
            `ينتهي الرابط بعد: ** يـــوم **
عدد إستخدامات الرابط :**  3 **

${invite.url}
`
          )
          .catch((err) => {
            console.log(err.message);
          });
        message.react("✅");
      });
  } else if (message.content.split(" ")[0] === client.prefix + "link") {
    setTimeout(() => {
      message.delete();
    }, 10000);
    let args;
    const user =
      message.guild.members.cache.get(message.author.id) || message.member;
    const maxUses = 3;
    const maxAge = Math.floor(Math.random() * 86399) + 86400;
    message.channel
      .createInvite({
        maxUses: maxUses,
        maxAge: maxAge,
        inviter: message.author,
      })
      .then((invite) => {
        user
          .send(
            `ينتهي الرابط بعد: ** يـــوم **
عدد إستخدامات الرابط :**  3 **

${invite.url}
`
          )
          .catch((err) => {
            console.log(err.message);
          });
        message.react("✅");
      });
  }
});
//////////////
const roles = [
  { name: "1", color: "#050505" },
  { name: "2", color: "#302e30" },
  { name: "3", color: "#2a2a2a" },
  { name: "4", color: "#474747" },
  { name: "5", color: "#575457" },
  { name: "6", color: "#000000" },
  { name: "7", color: "#7c7676" },
  { name: "8", color: "#7a7a7a" },
  { name: "9", color: "#929191" },
  { name: "10", color: "#aaa7a7" },
  { name: "11", color: "#bdbaba" },
  { name: "12", color: "#aba9a8" },
  { name: "13", color: "#c3b7bd" },
  { name: "14", color: "#a796a9" },
  { name: "15", color: "#a18e97" },
  { name: "16", color: "#b19da6" },
  { name: "17", color: "#dbaaba" },
  { name: "18", color: "#f6caeb" },
  { name: "19", color: "#dfd2db" },
  { name: "20", color: "#f5dddd" },
  { name: "21", color: "#f8d4de" },
  { name: "22", color: "#ff00f3" },
  { name: "23", color: "#fa9195" },
  { name: "24", color: "#a47e81" },
  { name: "25", color: "#00ffff" },
];
client.on("messageCreate", async (message) => {
  if (message.content === client.prefix + "creatcolors") {
    if (!message.member.permissions.has(`ADMINISTRATOR`)) return;
    const existingRoles = message.guild.roles.cache.filter((role) =>
      roles.some((r) => r.name === role.name)
    );
    if (existingRoles.size > 0) {
      message.reply({
        content: `**⛔️ - Some Roles Already Exist :** ${existingRoles
          .map((role) => role.name)
          .join(" , ")}`,
      });
      return;
    }
    const createdRoles = [];
    for (const roleData of roles) {
      const createdRole = await message.guild.roles.create({
        name: roleData.name,
        color: roleData.color,
      });
      createdRoles.push(createdRole);
    }
    message.reply({
      content: `**✅ - Done successfully **\n*🎡 - these ${createdRoles
        .map((role) => role.name)
        .join(" , ")}*`,
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "restart")) {
    if (!owners.includes(message.author.id)) return message.react("❌");
    await message.react("✅");
    let token = client.token;
    await client.destroy();
    await client.login(token);
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "setserver")) {
    if (!owners.includes(message.author.id)) return message.react("❌");
    let args = message.content.split(" ")[1];
    if (!args) return message.react("❌");
    let server = client.guilds.cache.get(args);
    if (!server) return message.react("❌");
    let db = require("pro.db");

    await db.set("MainServer", server.id);
    await message.react("✅");
  }
});

client.on("guildCreate", async (g) => {
  let mainG = await db.get("MainServer");
  if (mainG && client.guilds.cache.has(mainG)) g.leave().catch(() => {});
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "setowner")) {
    if (!owners.includes(message.author.id)) return message.react("❌");
    let args = message.content.split(" ")[1];
    if (!args) return message.react("❌");
    let user = client.users.cache.get(args);
    if (!user) return message.react("❌");
    if (config.owners.includes(user.id)) {
      let newOwners = [];
      config.owners.forEach((owner) => {
        if (owner !== user.id) newOwners.push(owner);
      });
      setTimeout(async () => {
        await fs.writeFileSync(
          "../../config.json",
          JSON.stringify(config, null, 5)
        );
        await message.react("✅");
      }, 1300);
    } else {
      config.owners.push(user.id);
      await fs.writeFileSync(
        process.cwd() + "/config.json",
        JSON.stringify(config, null, 5)
      );
      await message.react("✅");
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "callow")) {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.react("❌");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(message.content.split(" ")[1]);
    if (!user?.id) return message.react("❌");
    if (!message.member.voice.channel?.id) return message.react("❌");
    message.member.voice.channel.permissionOverwrites.edit(user.id, {
      CONNECT: true,
    });
    await message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "cdeny")) {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.react("❌");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(message.content.split(" ")[1]);
    if (!user?.id) return message.react("❌");
    if (!message.member.voice.channel?.id) return message.react("❌");
    message.member.voice.channel.permissionOverwrites.edit(user.id, {
      CONNECT: false,
    });
    await message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "chide")) {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.react("❌");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(message.content.split(" ")[1]);
    if (!user?.id) return message.react("❌");
    if (!message.member.voice.channel?.id) return message.react("❌");
    message.member.voice.channel.permissionOverwrites.edit(user.id, {
      VIEW_CHANNEL: false,
    });
    await message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "cunhide")) {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.react("❌");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(message.content.split(" ")[1]);
    if (!user?.id) return message.react("❌");
    if (!message.member.voice.channel?.id) return message.react("❌");
    message.member.voice.channel.permissionOverwrites.edit(user.id, {
      VIEW_CHANNEL: true,
    });
    await message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "clist")) {
    if (!message.member.voice.channel?.id) return message.react("❌");
    let users = message.member.voice.channel.permissionOverwrites.cache
      .filter(
        (permission) =>
          message.guild.members.cache.get(permission.id) &&
          permission.deny.has("CONNECT")
      )
      .map(({ id }) => `- ${message.guild.members.cache.get(id)}`);
    await message.reply({
      embeds: [
        {
          color: "DARK_GREY",
          description: users.join("\n"),
          thumbnail: { url: message.guild.iconURL({ dynamic: true }) },
        },
      ],
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "block")) {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.react("❌");
    let args = message.content.split(" ");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!user?.id) return message.react("❌");
    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[2]);
    if (!role?.id) return message.react("❌");
    let db = require("pro.db");
    if (db.has(`Block_${role.id}_${user.id}`))
      await db.delete(`Block_${role.id}_${user.id}`);
    await db.set(`Block_${role.id}_${user.id}`, true);
    message.react("✅");
  }
});

client.on("guildMemberUpdate", (o_ld, n_ew) => {
  n_ew.roles.cache.forEach((r) => {
    if (db.has(`Block_${r.id}_${n_ew.user.id}`))
      n_ew.roles.remove(r.id).catch(() => {});
  });
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "myvmute")) {
    let users = message.guild.channels.cache
      .filter((c) => !c.permissionsFor(message.member).has("SPEAK"))
      .map((c) => `- <#${c.id}>`);
    if (users.length == 0) return message.reply("ليس لديك اي ميوت صوتي .");
    let db = require("pro.db");
    let time = db.get(`Muted_V_Member_${message.author.id}`);
    let parseM = require("parse-ms");
    let calc = time - new Date().getTime();

    message.reply({
      embeds: [
        {
          color: "DARK_GREY",
          description: time
            ? users.join("\n") +
              `\nمدة السجن المقرره: Days ${parseM(calc).days} Hours ${
                parseM(calc).hours
              } Minutes ${parseM(calc).minutes} Seconds ${parseM(calc).seconds}`
            : users.join("\n"),
          thumbnail: { url: message.guild.iconURL({ dynamic: true }) },
        },
      ],
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "myprison")) {
    let db = require("pro.db");
    let time = db.get(`MutedMember_${message.author.id}`);
    if (!time) return message.reply("انت غير مسجون");

    let parseM = require("parse-ms");
    let calc = time - new Date().getTime();
    if (String(calc).includes("-")) return message.reply("انت غير مسجون");
    message.reply({
      embeds: [
        {
          title: "أنت مسجون 👮‍♀️",
          color: "DARK_GREY",
          description: `\nمدة السجن المقرره: Days ${parseM(calc).days} Hours ${
            parseM(calc).hours
          } Minutes ${parseM(calc).minutes} Seconds ${parseM(calc).seconds}`,
        },
      ],
    });
  }
});
client.on("messageCreate", async (message) => {
  if (message.content == prefix + "applay") {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.react("❌");
    if (message.channel.type == "GUILD_TEXT") {
      message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        ATTACH_FILES: true,
        MENTION_EVERYONE: true,
      });
      message.react("✅");
    }
  }
});
client.on("messageCreate", async (message) => {
  if (message.content == client.prefix + "disapplay") {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.react("❌");
    if (message.channel.type == "GUILD_TEXT") {
      message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        ATTACH_FILES: false,
        MENTION_EVERYONE: false,
      });
      message.react("✅");
    }
  }
});
client.on("messageCreate", async (message) => {
  if (message.content == client.prefix + "rooms") {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.react("❌");
    let users = message.guild.members.cache
      .filter(
        (member) =>
          member.permissions.has("ADMINISTRATOR") && !member.voice?.channel?.id
      )
      .map((u) => u);
    let users2 = message.guild.members.cache
      .filter(
        (member) =>
          member.permissions.has("ADMINISTRATOR") && member.voice?.channel?.id
      )
      .map((u) => u);
    message.reply({
      embeds: [
        {
          color: "DARK_GREY",
          thumbnail: { url: message.guild.iconURL({ dynamic: true }) },
          footer: {
            text: message.guild.name,
            icon_url: message.guild.iconURL({ dynamic: true }),
          },
          author: {
            name: message.guild.name + " ~ Admins",
            icon_url: message.guild.iconURL({ dynamic: true }),
          },
          description: `🔊 متوفر في الرومات الصوتية:\n${users2
            .map(
              (u, i) => `${i + 1}. <#${u.voice.channel.id}> ➡️ <@!${u.user.id}>`
            )
            .join("\n")}\n\n🔇غير متوفر في الرومات الصوتية:\n${users
            .map((u, i) => `${i + 1}. 🔇 ➡️ <@!${u.user.id}>`)
            .join("\n")}`,
        },
      ],
    });
  }
});
client.on("messageCreate", async (message) => {
  if (message.content == client.prefix + "adminlist") {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.react("❌");
    var users = [];
    message.guild.roles.cache
      .filter(
        (role) =>
          role.permissions.has("ADMINISTRATOR") &&
          !role.members.find((m) => m.user.bot)
      )
      .forEach((r) =>
        r.members.forEach((member) =>
          users.push({ user: member.user, role: r })
        )
      );
    message.reply({
      embeds: [
        {
          color: "DARK_GREY",
          thumbnail: { url: message.guild.iconURL({ dynamic: true }) },
          footer: {
            text: message.guild.name,
            icon_url: message.guild.iconURL({ dynamic: true }),
          },
          author: {
            name: message.guild.name + " ~ Admins",
            icon_url: message.guild.iconURL({ dynamic: true }),
          },
          description: users
            .map(
              (user, i) =>
                `${i + 1}. <@!${user.user.id}> ➡️ <@&${user.role.id}>`
            )
            .join("\n"),
        },
      ],
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "addrole")) {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.react("❌");
    let [_, ...name] = message.content.split(" ");
    if (!name.join(" ")) return message.react("❌");
    let rr = await message.guild.roles.create({
      name: name.join(" "),
      permissions: [],
    });
    message.reply({
      allowedMentions: { repliedUser: false },
      content: `✅ تم أنشاء رول <@&${rr.id}>`,
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "irole")) {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.react("❌");
    let [_, name, iconUrl] = message.content.split(" ");
    if (!name) return message.react("❌");
    let rr = await message.guild.roles.cache.find(
      (r) => r.id == name || r.name == name
    );
    if (!rr) return message.react("❌");
    if (!iconUrl) return message.react("❌");
    rr.setIcon(iconUrl)
      .catch(() => {
        message.reply("Useg: <client.prefix>irole <role.name> <role.icon_url>");
      })
      .then(() => message.react("✅"));
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "servername")) {
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.react("❌");
    let [_, name] = message.content.split(" ");
    if (!name) return message.react("❌");
    message.guild.setName(name);
    message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "serveravatar")) {
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.react("❌");
    let [_, avatar] = message.content.split(" ");
    if (!avatar) return message.react("❌");
    message.guild.setIcon(avatar);
    message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "restore")) {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.react("❌");
    let db = require("pro.db");
    let data = await db.get(`Roles_${message.guild.id}`);
    if (!data)
      return message.reply(
        "لا يوجد اي رولات (برجاء صنع اي رول جديده لأخذ نسخه احتياطية)"
      );
    let old = message.guild.roles.cache.map((r) => r);
    for (let index = 0; index < old.length; index++) {
      const element = old[index];
      element.delete().catch(() => {});
    }
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.name == "@everyone") {
      } else if (element.managed) {
      } else {
        console.log(element.name);
        await message.guild.roles.create({
          name: element.name,
          permissions: element.permissions,
          color: element.color,
          hoist: element.hoist,
          icon: element.icon,
          position: element.rawPosition,
          unicodeEmoji: element.unicodeEmoji,
          mentionable: element.mentionable,
        });
      }
    }
    message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "roles_backup")) {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.react("❌");
    let db = require("pro.db");
    db.set(
      `RolesB_${message.guild.id}`,
      message.guild.roles.cache.map((r) => r)
    );
    message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "restore_backup")) {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.react("❌");
    let db = require("pro.db");
    let data = await db.get(`RolesB_${message.guild.id}`);
    if (!data)
      return message.reply(
        "لا يوجد نسخ احتياطيه برجاء استعمال امر roles_backup"
      );
    let old = message.guild.roles.cache.map((r) => r);
    for (let index = 0; index < old.length; index++) {
      const element = old[index];
      element.delete().catch(() => {});
    }
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.name == "@everyone") {
      } else if (element.managed) {
      } else {
        console.log(element.name);
        await message.guild.roles.create({
          name: element.name,
          permissions: element.permissions,
          color: element.color,
          hoist: element.hoist,
          icon: element.icon,
          position: element.rawPosition,
          unicodeEmoji: element.unicodeEmoji,
          mentionable: element.mentionable,
        });
      }
    }
    message.react("✅");
  }
});

client.on("roleCreate", async (role) => {
  let data = await db.get(`Roles_${role.guild.id}`);
  if (!data) {
    db.set(
      `Roles_${role.guild.id}`,
      role.guild.roles.cache.map((r) => r)
    );
  } else {
    if (data.find((r) => r.name == role.name)) return;
    db.push(`Roles_${role.guild.id}`, role);
  }
});

client.on("messageCreate", (msg) => {
  const args = msg.content.slice(client.prefix.length).trim().split(/ +/);
  let user = 
  msg.mentions.members.first() || msg.guild.members.cache.get(args[1]);  let db = require("pro.db");
  if (msg.content.startsWith(client.prefix + "wantilist")) {
    let wanti = db.get("wanti") || [];
    console.log(
      wanti.map((a) => msg.guild.members.cache.get(a))?.user?.username
    );
    msg.reply({
      embeds: [
        {
          title: "جميع المسموح لهم..",
          description: wanti
            .map((a) => msg.guild.members.cache.get(a)?.user?.username)
            .join("\n"),
        },
      ],
    });
  } else if (msg.content.startsWith(client.prefix + "wanti")) {
    if (!user) return msg.reply("يرجى وضع العضو");
    let wanti = db.get("wanti") || [];
    console.log(wanti.find((a) => a == user.id));
    if (wanti.find((a) => a == user.id)) {
      db.set(
        "wanti",
        wanti.filter((a) => a != user.id)
      );
      msg.reply("تم مسح العضو بنجاح");
    } else {
      db.push(`wanti`, user.id);
      msg.reply("تم إضافة العضو بنجاح");
    }
  }
});

client.on("roleCreate", async (r) => {
  let audit = await r.guild.fetchAuditLogs({ type: AuditLogEvent.RoleCreate });
  let data = (await db.get(`wanti`)) || [];
  if (data.includes(audit.entries.first().executorId))
    return r.delete().catch(() => {});
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "wsrole")) {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return msg.react("❌");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(message.content.split(" ")[1]);
    if (!user)
      return message.reply(`${client.prefix + "wsrole"} <User.id/User.mention>`);
    let db = require("pro.db");
    let data = (await db.get(`PrvRoles_${message.guild.id}`)) || [];
    if (data.includes(user.id)) {
      let newData = [];
      data.forEach((us) => {
        if (us !== user.id) newData.push(us);
      });
      db.set(`PrvRoles_${message.guild.id}`, newData);
      message.reply(`تم حزف <@${user.id}> من صنع الرولات خاصة .`);
    } else {
      data.push(user.id);
      db.set(`PrvRoles_${message.guild.id}`, data);
      message.reply(`تم أضافة <@${user.id}> لصنع رولات خاصة .`);
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "wrlist")) {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return msg.react("❌");

    let data = (await db.get(`PrvRoles_${message.guild.id}`)) || [];
    if (data.length == 0) return message.reply("لا يوجد اي اشخاص مضافة .");
    const voice = new MessageEmbed()
      .setColor("AQUA")
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setTitle("List of members:")
      .setDescription(data.map((solve) => `<@${solve}>`).join("\n"));
    message.reply({ embeds: [voice] });
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "srole")) {
    let data = (await db.get(`PrvRoles_${message.guild.id}`)) || [];
    if (!data.includes(message.author.id))
      return message.reply(
        "انت لست مضاف في قائمة الأشخاص القادرين على صنع الرولات الخاصه ."
      );
    let [_, ...roleName] = message.content.split(" ");
    let myRole = await db.get(
      `MyPrvRole_${message.guild.id}_${message.author.id}`
    );
    if (myRole && message.guild.roles.cache.get(myRole))
      message.guild.roles.cache.get(myRole).delete();

    if (!roleName.join(" "))
      return message.reply(`${client.prefix + "srole"} <Role.name>`);
    message.guild.roles
      .create({
        name: roleName.join(" "),
        hoist: true,
        mentionable: false,
        permissions: [],
        position: message.member.roles.highest.rawPosition + 1,
      })
      .then((r) => {
        message.member.roles.add(r);
        db.set(`MyPrvRole_${message.guild.id}_${message.author.id}`, r.id);
      });

    message.react("✅");
  }
});
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "myrole")) {
    let data = (await db.get(`PrvRoles_${message.guild.id}`)) || [];
    if (!data.includes(message.author.id))
      return message.reply(
        "انت لست مضاف في قائمة الأشخاص القادرين على صنع الرولات الخاصه ."
      );
    let myRole = await db.get(
      `MyPrvRole_${message.guild.id}_${message.author.id}`
    );
    if (!myRole || !message.guild.roles.cache.get(myRole))
      return message.reply("ليس لديك رول خاصه من الأساس .");
    let [_, ...roleName] = message.content.split(" ");

    if (!roleName.join(" "))
      return message.reply(`${client.prefix + "myrole"} <Role.name>`);
    message.guild.roles.cache.get(myRole).setName(roleName.join(" "));
    message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "setbrole")) {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return msg.react("❌");
    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(message.content.split(" ")[1]);
    if (!role)
      return message.reply(`${client.prefix + "setbrole"} <Role.mention/Role.id>`);
    let data = (await db.get(`BLROLES_`)) || [];
    if (data.includes(role.id)) {
      await db.set(
        `BLROLES_`,
        data.filter((a) => a !== role.id)
      );
    } else {
      data.push(role.id);
      await db.set(`BLROLES_`, data);
    }
    message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "blacklist")) {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return msg.react("❌");

    let data = (await db.get(`BLROLES_`)) || [];
    if (data.length == 0) return message.reply("لا يوجد اي اشخاص مضافة .");
    const voice = new MessageEmbed()
      .setColor("AQUA")
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setTitle("List of members:")
      .setDescription(data.map((solve) => `<@&${solve}>`).join("\n"));
    message.reply({ embeds: [voice] });
  }
});

client.on("roleCreate", async (rr) => {
  let audit = await rr.guild.fetchAuditLogs({ type: AuditLogEvent.RoleCreate });
  let id = audit.entries.first().executorId;
  let data = (await db.get(`BLROLES_`)) || [];
  data.forEach((role) => {
    let r = rr.guild.roles.cache.get(role);
    if (r) {
      if (r.members.find((m) => m.id == id)) rr.delete().catch(() => {});
    }
  });
});

const accountAgeLimit = 7 * 24 * 60 * 60 * 1000;

client.on("guildMemberAdd", async (member) => {
  const guildId = member.guild.id;

  const antiJoinEnabled = db.get(`antijoin-${guildId}`);
  if (antiJoinEnabled !== "on") return;

  const now = Date.now();
  const accountAge = now - member.user.createdTimestamp;

  if (accountAge < accountAgeLimit) {
    const prisonRole = member.guild.roles.cache.find(role => role.name === "prison");
    if (!prisonRole) return;

    await member.roles.add(prisonRole);
  }
});

// groups
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "setgroup")) {
    let [_, ...categoryName] = message.content.split(" ");
    if (!categoryName.join(" "))
      return message.reply(`${client.prefix + "setgroup"} <Category.name>`);
    message.guild.channels
      .create(categoryName.join(" "), { type: "GUILD_CATEGORY" })
      .then((c) => {
        db.set(`MyGroupCategory_${message.guild.id}`, c.id);
      });

    message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "cgroup")) {
    let [_, ...groupName] = message.content.split(" ");
    if (!groupName.join(" "))
      return message.reply(`${client.prefix + "cgroup"} <Group.name>`);
    let groupRole = await message.guild.roles.create({
      name: groupName.join(" "),
      hoist: true,
      mentionable: false,
      permissions: [],
    });
    let groupCategory = await db.get(`MyGroupCategory_${message.guild.id}`);
    if (!groupCategory)
      return message.reply(
        "لم يتم تحديد فئة المجموعات. يرجى استخدام الأمر `setgroup` لتحديد الفئة."
      );
    message.guild.channels
      .create(groupName.join(" "), {
        type: "GUILD_VOICE",
        parent: groupCategory,
        permissionOverwrites: [
          {
            id: groupRole.id,
            allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
          },
        ],
      })
      .then((c) => {
        db.set(`MyGroupChannel_${message.guild.id}_${groupRole.id}`, c.id);
      });

    message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "owner-group")) {
    let [_, groupName, ownerMention] = message.content.split(" ");
    if (!groupName || !ownerMention)
      return message.reply(`${client.prefix + "owner-group"} <Group.name> <Owner.mention>`);
    let ownerId = ownerMention.replace(/[<@!>]/g, "");
    let groupRole = message.guild.roles.cache.find(
      (r) => r.name === groupName
    );
    if (!groupRole)
      return message.reply(`لم يتم العثور على دور المجموعة المحدد.`);
    let groupChannelId = await db.get(
      `MyGroupChannel_${message.guild.id}_${groupRole.id}`
    );
    if (!groupChannelId)
      return message.reply(`لم يتم العثور على قناة المجموعة المحددة.`);
    let groupChannel = message.guild.channels.cache.get(groupChannelId);
    groupChannel.permissionOverwrites.edit(ownerId, {
      MANAGE_CHANNELS: true,
      MUTE_MEMBERS: true,
      DEAFEN_MEMBERS: true,
      MOVE_MEMBERS: true,
    });
    let member = await message.guild.members.fetch(ownerId);
    member.roles.add(groupRole);

    message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "grole")) {
    let [_, groupName, userMention] = message.content.split(" ");
    let userId = userMention.replace(/[<@!>]/g, "");
    if (!groupName || !userId)
      return message.reply(`${client.prefix + "grole"} <Group.name> <User.id>`);
    let groupRole = message.guild.roles.cache.find(
      (r) => r.name === groupName
    );
    if (!groupRole)
      return message.reply(`لم يتم العثور على دور المجموعة المحدد.`);
    let member = await message.guild.members.fetch(userId);
    member.roles.add(groupRole);

    message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "dgroup")) {
    let [_, groupName] = message.content.split(" ");
    if (!groupName)
      return message.reply(`${client.prefix + "dgroup"} <Group.name>`);
    let groupRole = message.guild.roles.cache.find(
      (r) => r.name === groupName
    );
    if (!groupRole)
      return message.reply(`لم يتم العثور على دور المجموعة المحدد.`);
    let groupChannelId = await db.get(
      `MyGroupChannel_${message.guild.id}_${groupRole.id}`
    );
    if (groupChannelId) {
      let groupChannel = message.guild.channels.cache.get(groupChannelId);
      groupChannel.delete();
      db.delete(`MyGroupChannel_${message.guild.id}_${groupRole.id}`);
    }
    groupRole.delete();
    db.delete(`MyGroupCategory_${message.guild.id}`);

    message.react("✅");
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(client.prefix + "ginfo")) {
    let [_, groupName] = message.content.split(" ");
    if (!groupName)
      return message.reply(`${client.prefix + "ginfo"} <Group.name>`);
    let groupRole = message.guild.roles.cache.find(
      (r) => r.name === groupName
    );
    if (!groupRole)
      return message.reply(`لم يتم العثور على دور المجموعة المحدد.`);
    let groupChannelId = await db.get(
      `MyGroupChannel_${message.guild.id}_${groupRole.id}`
    );
    if (!groupChannelId)
      return message.reply(`لم يتم العثور على قناة المجموعة المحددة.`);
    let groupChannel = message.guild.channels.cache.get(groupChannelId);
    let owner = groupChannel.permissionOverwrites.cache.find(
      (po) => po.allow.has("MANAGE_CHANNELS") && po.type === "member"
    );
    let ownerMember = owner
      ? await message.guild.members.fetch(owner.id)
      : null;
    let members = groupRole.members;
    let memberCount = members.size;

    let embed = new MessageEmbed()
      .setTitle(`Group Info: ${groupName}`)
      .addField("Owner", ownerMember ? ownerMember.toString() : "None")
      .addField("Member Count", memberCount.toString())
      .setColor("#7289DA");
    message.reply({ embeds: [embed] });
  }
});
//
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "unban")) {
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.react("❌");
    let args = message.content.split(" ");
    let userId = args[1];
    if (!userId) return message.react("❌");
    message.guild.bans.fetch().then(bans => {
      if(bans.size == 0) return message.channel.send('No banned users.');
      let bUser = bans.find(b => b.user.id == userId);
      if(!bUser) return message.channel.send('User not banned.');
      message.guild.members.unban(bUser.user);
      message.react("✅");
    }).catch(() => {});
  }
});

// عقوبات

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "setrmute")) {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.react("❌");
    let args = message.content.split(" ");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!user?.id) return message.react("❌");
    let reason = args.slice(2).join(' ').split(' ')[0];
    if(!reason) return message.react("❌");
    let duration = args.slice(3).join(' ').split(' ')[0];
    if(!duration) return message.react("❌");
    let durationInMs;
    if(duration.endsWith('m')) {
      durationInMs = parseInt(duration.slice(0, -1)) * 60 * 1000;
    } else if(duration.endsWith('h')) {
      durationInMs = parseInt(duration.slice(0, -1)) * 60 * 60 * 1000;
    } else if(duration.endsWith('d')) {
      durationInMs = parseInt(duration.slice(0, -1)) * 24 * 60 * 60 * 1000;
    } else {
      return message.react("❌");
    }
    await db.set(`Mute_${user.id}`, true);
    setTimeout(async () => {
      await db.delete(`Mute_${user.id}`);
    }, durationInMs);
    let penalties = await db.get(`Penalty_${user.id}`);
if (!penalties) penalties = [];
penalties.push({
  type: 'Mute',
  reason: reason,
  duration: duration,
  moderator: message.author.tag
});
await db.set(`Penalty_${user.id}`, penalties);
    message.channel.send(`User ${user.user.tag} has been muted for reason: ${reason} for duration: ${duration}`);
  }
});

client.on("messageCreate", async (message) => {
  if(db.has(`Mute_${message.author.id}`)) {
    message.delete();
  }
})

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "setrprison")) {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.react("❌");
    let args = message.content.split(" ");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!user?.id) return message.react("❌");
    let reason = args.slice(2).join(' ').split(' ')[0];
    if(!reason) return message.react("❌");
    let duration = args.slice(3).join(' ').split(' ')[0];
    if(!duration) return message.react("❌");
    let durationInMs;
    if(duration.endsWith('m')) {
      durationInMs = parseInt(duration.slice(0, -1)) * 60 * 1000;
    } else if(duration.endsWith('h')) {
      durationInMs = parseInt(duration.slice(0, -1)) * 60 * 60 * 1000;
    } else if(duration.endsWith('d')) {
      durationInMs = parseInt(duration.slice(0, -1)) * 24 * 60 * 60 * 1000;
    } else {
      return message.react("❌");
    }
    let prisonRole = message.guild.roles.cache.find(r => r.name === 'Prison');
    if(!prisonRole) {
      prisonRole = await message.guild.roles.create({
        name: 'Prison',
        color: '#000',
        permissions: []
      });
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.permissionOverwrites.edit(prisonRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CONNECT: false
        });
      });
    }
    user.roles.add(prisonRole);
    setTimeout(() => {
      user.roles.remove(prisonRole);
    }, durationInMs);
    let penalties = await db.get(`Penalty_${user.id}`);
if (!penalties) penalties = [];
penalties.push({
  type: 'Prison',
  reason: reason,
  duration: duration,
  moderator: message.author.tag
});
await db.set(`Penalty_${user.id}`, penalties);
    message.channel.send(`User ${user.user.tag} has been sent to prison for reason: ${reason} for duration: ${duration}`);
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "setrvmute")) {
    if (!message.member.permissions.has("MUTE_MEMBERS"))
      return message.react("❌");
    let args = message.content.split(" ");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!user?.id) return message.react("❌");
    let reason = args.slice(2).join(' ').split(' ')[0];
    if(!reason) return message.react("❌");
    let duration = args.slice(3).join(' ').split(' ')[0];
    if(!duration) return message.react("❌");
    let durationInMs;
    if(duration.endsWith('m')) {
      durationInMs = parseInt(duration.slice(0, -1)) * 60 * 1000;
    } else if(duration.endsWith('h')) {
      durationInMs = parseInt(duration.slice(0, -1)) * 60 * 60 * 1000;
    } else if(duration.endsWith('d')) {
      durationInMs = parseInt(duration.slice(0, -1)) * 24 * 60 * 60 * 1000;
    } else {
      return message.react("❌");
    }

    // Check if the user is in a voice channel
    if (user.voice.channel) {
      user.voice.setMute(true, reason);
      setTimeout(() => {
        user.voice.setMute(false);
      }, durationInMs);
    }

    let penalties = await db.get(`Penalty_${user.id}`);
    if (!penalties) penalties = [];
    penalties.push({
      type: 'Voice Mute',
      reason: reason,
      duration: duration,
      moderator: message.author.tag
    });
    await db.set(`Penalty_${user.id}`, penalties);
    message.channel.send(`تم كتم صوت العضو ${user.user.tag} لسب: ${reason} لمدة: ${duration}`);
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "penalties")) {
    let args = message.content.split(" ");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!user?.id) return message.react("❌");
    let penalties = await db.get(`Penalty_${user.id}`);
    if (!penalties || penalties.length === 0) {
      return message.channel.send("لا توجد عقوبات لهذا العضو.");
    }
    const embed = new MessageEmbed()
      .setColor("#FF0000")
      .setTitle(`عقوبات العضو ${user.user.tag}`)
      .setDescription("قائمة العقوبات:");

    penalties.forEach((penalty, index) => {
      embed.addFields(
        { name: `رقم العقوبة: ${index}`, value: `نوع العقاب: ${penalty.type}\nالسبب: ${penalty.reason}\nالمدة: ${penalty.duration}\nالمشرف: ${message.author}` }
      );
    });

    message.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(client.prefix + "rpenalty")) {
    if (!message.member.permissions.has("MANAGE_ROLES")) return message.react("❌");
    let args = message.content.split(" ");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!user?.id) return message.react("❌");
    let penaltyIndex = args[2];
    if (!penaltyIndex || isNaN(penaltyIndex)) return message.react("❌");
    let penalties = await db.get(`Penalty_${user.id}`);
    if (!penalties || penalties.length === 0 || penaltyIndex < 0 || penaltyIndex >= penalties.length) {
      return message.channel.send("رقم العقوبة غير صالح.");
    }
    let removedPenalty = penalties[penaltyIndex];
    penalties.splice(penaltyIndex, 1);
    await db.set(`Penalty_${user.id}`, penalties);
    message.channel.send(`تم إزالة العقوبة من العضو ${user.user.tag}:\n\n
    نوع العقاب: ${removedPenalty.type}\nالسب: ${removedPenalty.reason}\nالمدة: ${removedPenalty.duration}\nالمشرف: ${removedPenalty.moderator}`);
  }
});

//
let vojson = JSON.parse(
  fs.readFileSync(process.cwd() + "/vojson.json", "utf8")
);
let baseCount = 0;
let channelName = "Voice Online";

client.on("messageCreate", (message) => {
  if (message.content.startsWith(client.prefix + "vc")) {
    let args = message.content.split(" ");
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send(
        "**ADMINISTRATOR ليس لديك صلاحية :rolling_eyes: ** "
      );
    if (!args[1])
      return message.channel.send(
          `${client.prefix}vc on <Channel name>\n${client.prefix}vc off`
      );
    if (args[1] == "on") {
      if (!args[2])
        return message.channel.send(
            `${client.prefix}vc on <Channel name>`
        );
      let channelfind =
        message.mentions.channels.first() ||
        message.guild.channels.cache.find((c) => c.name == args[2]) ||
        message.guild.channels.cache.find((c) => c.id == args[2]);
      if (!channelfind) return message.channel.send(`Cant find this channel .`);

      vojson[message.guild.id] = {
        stats: "enable",
        chid: channelfind.id,
        guild: message.guild.id,
      };
      channelfind.setName(
        `Voice Online : ${
          message.guild.members.cache.filter((m) => m.voice.channel?.id).size
        }`
      );

      message.channel.send("**Done! The Voice Online Is Turned On**");
      fs.writeFile("./vojson.json", JSON.stringify(vojson), (err) => {
        if (err) console.error(err);
      });
    } else if (args[1] == "off") {
      message.guild.channels.cache
        .find((gg) => gg.name === vojson[message.guild.id]?.chid)
        ?.delete();

      vojson[message.guild.id] = {
        stats: "disable",
        chid: "undefined",
        guild: message.guild.id,
      };

      message.channel.send("**Done! The Voice Online Is Turned Off**");
      fs.writeFile("./vojson.json", JSON.stringify(vojson), (err) => {
        if (err) console.error(err);
      });
    } else
      message.channel.send(
          `${client.prefix}vc on <Channel name>\n${client.prefix}vc off`
      );
  }

  if (message.content.startsWith(client.prefix + "fmembers")) {
    let args = message.content.split(" ");
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send(
        "**ADMINISTRATOR ليس لديك صلاحية :rolling_eyes: ** "
      );
    if (!args[1])
      return message.channel.send(
          `${client.prefix}fmembers <number>`
      );
    if (args[1]) {
      baseCount = parseInt(args[1]);
      return message.channel.send(
        `**Done! The base count is now set to ${baseCount}**`
      );
    }
  }

  if (message.content.startsWith(client.prefix + "vname")) {
    let args = message.content.split(" ");
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send(
        "**ADMINISTRATOR ليس لديك صلاحية :rolling_eyes: ** "
      );
    if (!args[1])
      return message.channel.send(
          `${client.prefix}vcname <channel name>`
      );
    if (args[1]) {
      channelName = args.slice(1).join(" ");
      return message.channel.send(
        `**Done! The channel name is now set to ${channelName}**`
      );
    }
  }
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  if (!vojson[oldState.guild.id]) {
    vojson[oldState.guild.id] = {
      stats: "disable",
      chid: "undefined",
      guild: "undefined",
    };
  }

  const guildChannels = oldState.guild.channels.cache.filter(
    (channel) => channel.type === "GUILD_VOICE"
  );
  let totalMembersInVoiceChannels = guildChannels.reduce((total, channel) => {
    return total + channel.members.size;
  }, 0);

  const channelId = vojson[oldState.guild.id].chid;
  const channel = oldState.guild.channels.cache.get(channelId);

  if (vojson[oldState.guild.id].stats === "enable" && channel) {
    const wait = require("timers/promises").setTimeout;
    await wait(248000);
    await channel.setName(`${channelName} : ${totalMembersInVoiceChannels + baseCount}`);
  }

  if (vojson[oldState.guild.id].stats === "disable") {
    return;
  }
});


