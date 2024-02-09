const axios = require("axios");

async function chat(message, userName) {
  try {
    const prePrompt = `Olá! De agora em diante chamarei você de North e agora você está falando com Pietro. Você só deverá reagir/responder à mensagem que virá a seguir: `;
    const prompt = await axios.post("https://localhost:3000/api/ai", {
      content: prePrompt + message,
    });
    const apiResponse =
      prompt.data.text || "Response error - Malformed AI Response";
    return apiResponse;
  } catch (error) {
    console.error("Error making API request:", error.message);
  }
}

module.exports = { chat };
