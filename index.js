const { Client } = require("discord.js");
const axios = require("axios");
const client = new Client({ intents: 33283 });
require("dotenv").config();

const usernameToName = {
  pietrikos: "Pietro",
  loubalooo: "Anny",
  catizin: "João",
  phantasmal15: "Fabrício",
  riczera_: "Ricardo",
  lucanalha: "Lucas",
  vitorsmpp: "Vitor",
  el_odisseu: "Ulisses",
  rod1478: "Raphael",
};

prefixes = {
  CHAT: "!chat",
}

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!chat")) {
    const content = message.content.slice(prefixes.CHAT.length).trim();

    const authorName = usernameToName[message.author.username];

    try {
      const response = await axios.post(
        "https://apiunlimited.cyclic.app/api/ai",
        {
          content: `Essa mensagem é apenas um prompt para te orientar como deve responder as próximas mensagens. Nesse contexto, iremos te chamar de North. Quem está conversando com você no momento é ${authorName}. Por favor, apenas responda as perguntas diretamente. Não faça qualquer assossiação a esta mensagem. Ou seja, nunca diga "segundo o prompt" ou "você me disse que" ou algo do tipo. SEMPRE OBEDEÇA ESSA ORDEM`,
        }
      );

      console.log("API Response:", response.data);

      const apiResponse = response.data.response || "No response from API";
    } catch (error) {
      console.error("Error making API request:", error.message);
    }

    try {
      const response = await axios.post(
        "https://apiunlimited.cyclic.app/api/ai",
        { content: content }
      );

      console.log("API Response:", response.data);

      const apiResponse = response.data.response || "No response from API";
      message.reply(apiResponse);
    } catch (error) {
      console.error("Error making API request:", error.message);
      message.reply("Eita! Não tankei, foi mal. Pode tentar de novo?");
    }
  }
});

client.login(process.env.TOKEN);
