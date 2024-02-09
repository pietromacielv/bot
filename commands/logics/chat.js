const axios = require("axios");

async function chat(message, authorName) {
  try {
    await axios.post(
      "https://apiunlimited.cyclic.app/api/ai",
      {
        content: `Olá! A partir de agora eu vou chamar você de North e nesse momento você está conversando com ${authorName}. Você deverá reagir / responder somente às próximas mensagens, certo?`,
      }
    );;
    const prompt = await axios.post("https://apiunlimited.cyclic.app/api/ai", {
      content: message,
    });
    const apiResponse = prompt.data.text || "Não tankei, pode tentar de novo?";
    return apiResponse;
  } catch (error) {
    console.error("Error making API request:", error.message);
  }
}

module.exports = { chat };
