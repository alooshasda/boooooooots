const Canvas = require("@napi-rs/canvas");
const { GuildMember } = require("discord.js");
const db = require("pro.db");
/**
 *
 * @param {*} guildId
 * @param {GuildMember} member
 * @returns
 */
async function makeTheImage(guildId, member) {
  return new Promise(async (resolve, reject) => {
    const background = await Canvas.loadImage(
      db.get(`WelcomeBackgroundImage_${guildId}`) ||
        "https://cdn.discordapp.com/attachments/1054433684394102896/1133337987460120607/Wlc-1.png"
    );
    const canvas = Canvas.createCanvas(background.width, background.height);
    const context = canvas.getContext("2d");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(
      member.displayAvatarURL({ size: 1024 })
    );
    const canvas1 = Canvas.createCanvas(512, 512);
    const ctx = canvas1.getContext("2d");
    ctx.beginPath();
    ctx.arc(255, 255, 255, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(avatar, 0, 0, canvas1.width, canvas1.height);
    let circle = canvas1.encodeSync("png");
    if (circle) {
      circle = await Canvas.loadImage(circle);
      let size = db.get(`WelcomeAvatarSize_${guildId}`) || 290;
      let x = db.get(`WelcomeAvatarX_${guildId}`) || 227;
      let y = db.get(`WelcomeAvatarY_${guildId}`) || 473;

      context.drawImage(circle, x, y / 2 - 152, size, size);
    }
    return await resolve(await canvas.encode("png"));
  });
}
module.exports = makeTheImage;
