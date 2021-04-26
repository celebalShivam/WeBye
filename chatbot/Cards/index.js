module.exports = {
  loginUser: () => {
    return {
      type: "AdaptiveCard",
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      version: "1.3",
      body: [
        {
          type: "ColumnSet",
          columns: [
            {
              type: "Column",
              width: "stretch",
              items: [
                {
                  type: "TextBlock",
                  text: "Email",
                  wrap: true,
                  horizontalAlignment: "center",
                  height: "stretch",
                  fontType: "Default",
                  size: "medium",
                  weight: "bolder",
                  color: "accent",
                },
              ],
            },
            {
              type: "Column",
              width: "stretch",
              items: [
                {
                  type: "Input.Text",
                  placeholder: "Email",
                  style: "email",
                  isRequired: true,
                  id: "email",
                },
              ],
            },
          ],
        },
        {
          type: "ColumnSet",
          columns: [
            {
              type: "Column",
              width: "stretch",
              items: [
                {
                  type: "TextBlock",
                  text: "Password",
                  wrap: true,
                  horizontalAlignment: "Center",
                  size: "Medium",
                  weight: "Bolder",
                  color: "Accent",
                },
              ],
            },
            {
              type: "Column",
              width: "stretch",
              items: [
                {
                  type: "Input.Text",
                  placeholder: "Password",
                  isRequired: true,
                  id: "password",
                },
              ],
            },
          ],
        },
        {
          type: "ActionSet",
          id: "loginUserAction",
          actions: [
            {
              type: "Action.Submit",
              id: "loginUser",
              title: "LOGIN",
              style: "positive",
            },
          ],
        },
      ],
    };
  },
};
