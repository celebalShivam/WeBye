const { ActivityHandler, CardFactory } = require("botbuilder");

class BotActivityHandler extends ActivityHandler {
  constructor(conversationState, rootDialog) {
    super();

    if (!conversationState) throw new Error("conversation state is required");

    this.conversationState = conversationState;
    this.rootDialog = rootDialog;
    this.accessor = this.conversationState.createProperty("DialogAccessor");

    this.onMessage(async (context, next) => {
      await this.rootDialog.run(context, this.accessor);

      await next();
    });

    this.onConversationUpdate(async (context, next) => {
      const membersAdded = context.activity.membersAdded;

      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity({
            attachments: [
              CardFactory.adaptiveCard({
                type: "AdaptiveCard",
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                version: "1.3",
                body: [
                  {
                    type: "Image",
                    url:
                      "https://cdn.dribbble.com/users/501036/screenshots/5433607/comp-1.gif",
                  },
                  {
                    type: "TextBlock",
                    text:
                      "Welcome, User! I am your personal assistant, Please login or Signup to continue",
                    wrap: true,
                    weight: "Bolder",
                    color: "Accent",
                    size: "Medium",
                  },
                ],
              }),
            ],
          });

          await context.sendActivity({
            attachments: [
              CardFactory.heroCard(
                null,
                null,
                CardFactory.actions([
                  {
                    type: "imBack",
                    title: "Login",
                    value: "login",
                  },
                  { type: "imBack", title: "SignUp", value: "signup" },
                ])
              ),
            ],
          });

          await next();
        }
      }
    });
  }
  async run(context) {
    await super.run(context);
    await this.conversationState.saveChanges(context, false);
  }
}

module.exports.BotActivityHandler = BotActivityHandler;
