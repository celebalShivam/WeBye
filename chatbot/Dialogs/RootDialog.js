const {
  ComponentDialog,
  WaterfallDialog,
  DialogSet,
  DialogTurnStatus,
} = require("botbuilder-dialogs");

const {
  rootDialog,
  loginDialog,
  signupDialog,
} = require("../Constants/DialogIds");

const { LoginDialog, SignupDialog } = require("../Dialogs");

const parseMessage = "parseMessage";

class RootDialog extends ComponentDialog {
  constructor(conversationState) {
    super(rootDialog);

    if (!conversationState) throw new Error("conversation State is required");

    this.conversationState = conversationState;

    this.addDialog(
      new WaterfallDialog(parseMessage, [this.routeMessage.bind(this)])
    );

    this.addDialog(new LoginDialog(conversationState));
    this.addDialog(new SignupDialog(conversationState));

    this.initialDialogId = parseMessage;
  }

  async run(context, accessor) {
    try {
      const dialogSet = new DialogSet(accessor);
      dialogSet.add(this);

      const dialogContext = await dialogSet.createContext(context);
      const results = await dialogContext.continueDialog();

      if (results && results.status === DialogTurnStatus["empty"]) {
        await dialogContext.beginDialog(this.id);
      } else {
        console.log("Dialog Stack is empty");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async routeMessage(stepContext) {
    switch (stepContext.context._activity.text.toLowerCase()) {
      case "login":
        return await stepContext.beginDialog(loginDialog);
      case "signup":
        await stepContext.context.sendActivity(
          "You are going to have signup prompt"
        );
        return await stepContext.beginDialog(signupDialog);
      default:
        await stepContext.context.sendActivity(
          "Please login or Signup to continue"
        );
    }
    return await stepContext.endDialog();
  }
}

module.exports.RootDialog = RootDialog;
