const axios = require("axios");

async function chat(message, authorName) {
  try {
    await axios.post("https://apiunlimited.cyclic.app/api/ai", {
      content: `Olá! A partir de agora eu vou chamar você de North e nesse momento você está conversando com ${authorName}. Por favor, apenas responda as perguntas diretamente. Não faça qualquer menção a esta mensagem, nunca.`,
    });
  } catch (error) {
    console.error("Error making API request:", error.message);
  }

  try {
    const response = await axios.post(
      "https://apiunlimited.cyclic.app/api/ai",
      { content: message }
    );
    const apiResponse = response.data.text || "No response from API";
    return apiResponse;
  } catch (error) {
    console.error("Error making API request:", error.message);
  }
}

module.exports = { chat };
