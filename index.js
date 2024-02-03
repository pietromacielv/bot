const { Client, EmbedBuilder, ActivityType } = require("discord.js");
const { simulateTraffic } = require("./app-waker");
const { usernameToName } = require("./authors");
const { chat } = require("./commands/logics/chat");
const {
  validationMessage,
  clearValidation,
} = require("./commands/validations/clear-validation");

require("dotenv").config();

const client = new Client({ intents: 33283 });

const generalPrefixes = {
  CHAT: "!chat",
  CLEAR: "!clear",
  SAY: "!say",
};

async function activityRandomizer() {
  while (true) {
    const phrases = [
      `${process.env.FIRST_ACTIVITY_OPTION}`, // type: Listening
      `${process.env.SECOND_ACTIVITY_OPTION}`, // type: Watching
      `${process.env.THIRD_ACTIVITY_OPTION}`, // type: Playing
    ];

    const matchingTypes = {
      0: ActivityType.Listening,
      1: ActivityType.Watching,
      2: ActivityType.Playing,
    };

    const number = Math.floor(Math.random() * 3);
    client.user.setActivity({
      name: phrases[number],
      type: matchingTypes[number],
    });
    await new Promise((resolve) => setTimeout(resolve, 600000));
  }
}

client.once("ready", () => {
  console.log("Bot is ready!");
  simulateTraffic();
  activityRandomizer();
});

client.on("messageCreate", async (message) => {
  const content = message.content.trim();

  if (content.startsWith(generalPrefixes.CHAT)) {
    const authorName = usernameToName[message.author.username];
    const northResponse = await chat(
      content.slice(generalPrefixes.CHAT.length),
      authorName
    );
    const embed = new EmbedBuilder()
      .setColor("#0367EF")
      .setDescription(northResponse);
    message.reply({ embeds: [embed] });
  }

  if (content.startsWith(generalPrefixes.CLEAR)) {
    const messagesToClear = +content.slice(generalPrefixes.CLEAR.length);
    const val = await clearValidation(messagesToClear);
    const valMessage = await validationMessage(val);
    await message.delete();

    if (valMessage !== true) return message.channel.send(valMessage);

    await message.channel.bulkDelete(messagesToClear);
    const deleteMsg = await message.channel.send(
      `Limpei ${messagesToClear} mensagens!`
    );
    setTimeout(() => deleteMsg.delete(), 3000);
  }

  if (content.startsWith(generalPrefixes.SAY)) {
    const sayContent = content.slice(generalPrefixes.SAY.length).trim();

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
