const { Client } = require("discord.js");

const { simulateTraffic } = require("./app-waker");
const { usernameToName } = require("./authors");
const { chat } = require("./commands/logics/chat");
const {
  validationMessage,
  clearValidation,
} = require("./commands/validations/clear-validation");

const client = new Client({ intents: 33283 });
require("dotenv").config();

const prefixes = {
  CHAT: "!chat",
  CLEAR: "!clear",
};

client.once("ready", () => {
  console.log("Bot is ready!");
  simulateTraffic();
  client.user.setActivity({
    name: `${process.env.FIRST_ACTIVITY_OPTION}`,
    type: 2,
  });
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefixes.CHAT)) {
    const content = message.content.slice(prefixes.CHAT.length).trim();
    const authorName = usernameToName[message.author.username];

    const northResponse = await chat(content, authorName);

    message.reply(northResponse);
  }
  if (message.content.startsWith(prefixes.CLEAR)) {
    const content = message.content.slice(prefixes.CLEAR.length).trim();
    const validation = await validationMessage(await clearValidation(content));
    if (validation != true) return await message.channel.send(validation);
    await message.channel.bulkDelete(content);
    message.channel.send(`Limpei ${content} mensagens!`).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 3000);
    });
  }
});

client.login(process.env.TOKEN);
