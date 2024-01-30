const { Client, EmbedBuilder } = require("discord.js");

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
  SAY: "!say",
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
    const val = await clearValidation(+content);
    const valMessage = await validationMessage(val);
    if (valMessage != true) return await message.channel.send(valMessage);
    await message.channel.bulkDelete(content);
    message.channel.send(`Limpei ${content} mensagens!`).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 3000);
    });
  }
  if (message.content.startsWith(prefixes.SAY)) {
    const content = message.content.slice(prefixes.SAY.length).trim();
    if (!content) {
      const invalidPrompt = message.channel
        .send("Você precisa informar alguma mensagem.")
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
            message.delete();
          }, 3000);
        });
      return invalidPrompt;
    }
    message.delete();
    const embed = new EmbedBuilder()
      .setColor("#0367EF")
      .setDescription(content);
    message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
