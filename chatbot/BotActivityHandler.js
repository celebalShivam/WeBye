const { ActivityHandler } = require("botbuilder");

class BotActivityHandler extends ActivityHandler {
  constructor() {
    super();

    this.onMessage(async (context, next) => {
      await context.sendActivity(
        `Hi You just said this ${context.activity.text}`
      );
      await next();
    });

    this.onConversationUpdate(async (context, next) => {
      const membersAdded = context.activity.membersAdded;

      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity("Welcome To my Bot");
          await next();
        }
      }
    });
  }
  async run(context) {
    await super.run(context);
  }
}

module.exports.BotActivityHandler = BotActivityHandler;
