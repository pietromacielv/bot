const { Client, EmbedBuilder } = require("discord.js");
const { simulateTraffic } = require("./app-waker");
const { usernameToName } = require("./authors");
const { chat } = require("./commands/logics/chat");
const {
  validationMessage,
  clearValidation,
} = require("./commands/validations/clear-validation");

require("dotenv").config();

const client = new Client({ intents: 33283 });

const prefixes = {
  CHAT: "!chat",
  CLEAR: "!clear",
  SAY: "!say",
};

client.once("ready", () => {
  console.log("Bot is ready!");
  simulateTraffic();
  client.user.setActivity({ name: process.env.FIRST_ACTIVITY_OPTION, type: 2 });
});

client.on("messageCreate", async (message) => {
  const content = message.content.trim();

  if (content.startsWith(prefixes.CHAT)) {
    const authorName = usernameToName[message.author.username];
    const northResponse = await chat(
      content.slice(prefixes.CHAT.length),
      authorName
    );
    message.reply(northResponse);
  }

  if (content.startsWith(prefixes.CLEAR)) {
    const val = await clearValidation(+content.slice(prefixes.CLEAR.length));
    const valMessage = await validationMessage(val);

    if (valMessage !== true) return message.channel.send(valMessage);

    await message.channel.bulkDelete(+content.slice(prefixes.CLEAR.length));
    const deleteMsg = await message.channel.send(
      `Limpei ${content} mensagens!`
    );
    setTimeout(() => deleteMsg.delete(), 3000);
  }

  if (content.startsWith(prefixes.SAY)) {
    const sayContent = content.slice(prefixes.SAY.length).trim();

    if (!sayContent) {
      const invalidPrompt = await message.channel.send(
        "Você precisa informar alguma mensagem."
      );
      setTimeout(() => {
        invalidPrompt.delete();
        message.delete();
      }, 3000);
      return;
    }

    message.delete();
    const embed = new EmbedBuilder()
      .setColor("#0367EF")
      .setDescription(sayContent);
    message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
