const { Client, GatewayIntentBits } = require("discord.js");
const TOKEN = process.env.TOKEN;
const GUILD_ID = "1212006970127687710";
const SHEET_API = "https://script.google.com/macros/s/AKfycbxOmmYJmFXHpwnc-uN3xm-zX_uZ4rJlbxMz7mNkKl07P0P3xSoi_vV9S1oZEvU0lBU/exec";

const ROLE_MAP = {
  "1212028343504081016": "Than",
  "1370654139431784479": "Sunny",
  "1342839382737948693": "Rainny",
  "1405832187663880243": "Devil"
};

// 🔥 THIẾU CÁI NÀY (nguyên nhân lỗi)
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("clientReady", async () => {
  console.log("Bot ready");

  const guild = await client.guilds.fetch(GUILD_ID);
  const members = await guild.members.fetch();

  const payload = [];

  for (const roleId in ROLE_MAP) {
    const users = members
      .filter(m => m.roles.cache.has(roleId))
      .map(m => ({
        id: m.user.id,
        username: m.user.username,
        displayName: m.displayName
      }));

    payload.push({
      role: roleId,
      sheet: ROLE_MAP[roleId],
      users
    });
  }

  console.log("Sending:", payload);

  await fetch(SHEET_API, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  console.log("Synced!");
  process.exit();
});

client.login(TOKEN);
