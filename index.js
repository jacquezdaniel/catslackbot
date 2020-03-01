const SlackBot = require("slackbots");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: "randomcat"
});

// Start Handler
bot.on("start", () => {
  bot.postMessageToChannel("general");
});

// Error Handler
bot.on("error", err => {
  console.log(err);
});

// Message Handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text);
});

// Response Handler
function handleMessage(message) {
  if (message.includes(" find cat fact")) {
    getRandomCat();
  } else if (message.includes(" help")) {
    runHelp();
  }
}

// Gets random fact from cat-fact
function getRandomCat() {
  axios.get("https://cat-fact.herokuapp.com/facts/random").then(res => {
    const cat = res.data.text;
    bot.postMessageToChannel("general", `${cat}`);
  });
}
// Show Help
function runHelp() {
  bot.postMessageToChannel(
    "general",
    `Type *@randomcat* with *find cat fact* to get a random cat facts`
  );
}
