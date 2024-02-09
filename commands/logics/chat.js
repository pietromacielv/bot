const axios = require("axios");

async function chat(message, authorName) {
  try {
    const prePrompt = `Olá! A partir de agora eu vou chamar você de North e nesse momento você está conversando com ${authorName}. Você deverá reagir / responder somente a mensagem que virá depois do asterisco. * `;
    const prompt = await axios.post("https://apiunlimited.cyclic.app/api/ai", {
      content: prePrompt + message,
    });
    const apiResponse = prompt.data.text || "No response from API";
    return apiResponse;
  } catch (error) {
    console.error("Error making API request:", error.message);
  }
}

module.exports = { chat };
