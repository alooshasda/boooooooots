module.exports = {
  name: "check", // هنا اسم الامر
  run: (client, message, args) => {
    let c = message.content.split(" ");
    const a2rgs = message.content.split(" ");
    const roleId = c[1];
    console.log(roleId);
    const role = message.guild.roles.cache.find(
      (e) => e.id === roleId || e.name === roleId || `<@&${e.id}>` === roleId
    );
    if (!role) {
      return message.reply({
        content: `**للأسفِ لمْ يتمْ عثورٌ على أيدي الرولِ**`,
      });
    }
    const roleMemberCount = role.members.size;
    const members = Array.from(role.members.values());
    const memberList = members
      .map((member, index) => {
        return `${index + 1}- <@${member.user.id}>`;
      })
      .join("\n");
    message.reply({
      content: `**الرول يحتوي على : \`${roleMemberCount}\`\n${memberList}**`,
    });
  },
};
