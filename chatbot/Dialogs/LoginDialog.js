const { CardFactory } = require("botbuilder-core");
const {
  ComponentDialog,
  WaterfallDialog,
  Dialog,
} = require("botbuilder-dialogs");
const { loginUser } = require("../Cards");
const { loginDialog } = require("../Constants/DialogIds");

const loginDialogWithForm = "loginDialogWithForm";

class LoginDialog extends ComponentDialog {
  constructor(conversationState) {
    super(loginDialog);

    if (!conversationState) throw new Error("conversation state is required");

    this.conversationState = conversationState;
    this.loginStateAccessor = this.conversationState.createProperty(
      "LoginState"
    );

    this.addDialog(
      new WaterfallDialog(loginDialogWithForm, [this.showform.bind(this)])
    );

    this.initialDialogId = loginDialogWithForm;
  }

  async showform(stepContext) {
    try {
      await stepContext.context.sendActivity({
        attachements: [CardFactory.adaptiveCard(loginUser())],
      });
      return Dialog.EndOfTurn;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports.LoginDialog = LoginDialog;
