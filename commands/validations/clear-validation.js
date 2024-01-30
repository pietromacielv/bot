const clearValidation = async (amount) => {
  if (amount === 0 || typeof amount !== "number") return undefined;
  if (amount >= 100) return false;
  return true
};

const validationMessage = async (clearType) => {
  let message;
  if (clearType === undefined) {
    message = "Facilita minha vida, você tem que colocar algum número válido!";
    return message;
  }
  if (clearType === false) {
    message =
      "O valor inserido é muito alto. Eu só posso apagar até 99 mensagens.";
    return message;
  }
  return true;
};

module.exports = { clearValidation, validationMessage };
