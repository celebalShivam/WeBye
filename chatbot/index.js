const restify = require("restify");
const {
  BotFrameworkAdapter,
  MemoryStorage,
  ConversationState,
} = require("botbuilder");
const { BotActivityHandler } = require("./BotActivityHandler");
const { RootDialog } = require("./Dialogs/RootDialog");

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
let conversationState = new ConversationState(memory);

const rootDialog = new RootDialog(conversationState);
const mainBot = new BotActivityHandler(conversationState, rootDialog);

server.post("/api/messages", (req, res, next) => {
  adapter.processActivity(req, res, async (context) => {
    await mainBot.run(context);
  });
  next();
});
