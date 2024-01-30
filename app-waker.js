const axios = require("axios");
const url = "https://www.google.com";

async function simulateTraffic() {
  while (true) {
    try {
      await axios.get(url);
    } catch (error) {
      console.log(error);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

module.exports = { simulateTraffic };
