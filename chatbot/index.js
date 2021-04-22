const restify = require("restify");
const { BotFrameworkAdapter, MemoryStorage } = require("botbuilder");
const { BotActivityHandler } = require("./BotActivityHandler");

const adapter = new BotFrameworkAdapter({ appId: "", appPassword: "" });

adapter.onTurnError = async (context, err) => {
  console.log("Error occurred =>", err);

  await context.sendActivity("Bot encountered an error");
};

let server = restify.createServer();
server.listen(3978, () => {
  console.log(`${server.name} listening on ${server.url}`);
});

const memory = new MemoryStorage();
const mainBot = new BotActivityHandler();

server.post("/api/messages", (req, res, next) => {
  adapter.processActivity(req, res, async (context) => {
    await mainBot.run(context);
  });
  next();
});
