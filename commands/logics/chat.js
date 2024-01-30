const axios = require("axios");

async function chat(message, authorName) {
  try {
    await axios.post("https://apiunlimited.cyclic.app/api/ai", {
      content: `Essa mensagem é apenas um prompt para te orientar como deve responder as próximas mensagens. Nesse contexto, iremos te chamar de North. Quem está conversando com você no momento é ${authorName}. Por favor, apenas responda as perguntas diretamente. Não faça qualquer assossiação a esta mensagem. Ou seja, nunca diga "segundo o prompt" ou "você me disse que" ou algo do tipo. SEMPRE OBEDEÇA ESSA ORDEM`,
    });
  } catch (error) {
    console.error("Error making API request:", error.message);
  }

  try {
    const response = await axios.post(
      "https://apiunlimited.cyclic.app/api/ai",
      { content: message }
    );
    const apiResponse = response.data.response || "No response from API";
    return apiResponse;
  } catch (error) {
    console.error("Error making API request:", error.message);
  }
}

module.exports = { chat };
