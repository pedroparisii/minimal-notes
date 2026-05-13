const welcomeText = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { textAlign: null, level: 1 },
      content: [
        {
          type: "text",
          text: "Clear & Functional"
        }
      ]
    },

    {
      type: "horizontalRule"
    },

    {
      type: "paragraph",
      attrs: { textAlign: null },
      content: [
        {
          type: "text",
          text: "Good interfaces disappear. They let people focus on what they want to do instead of how the system works."
        }
      ]
    },

    {
      type: "paragraph",
      attrs: { textAlign: null },
      content: [
        {
          type: "text",
          text: "Modern products often become overloaded with features and complexity. The real challenge is creating something "
        },
        {
          type: "text",
          marks: [{ type: "italic" }],
          text: "simple"
        },
        {
          type: "text",
          text: ", yet still memorable."
        }
      ]
    },

    {
      type: "heading",
      attrs: { textAlign: null, level: 1 },
      content: [
        {
          type: "text",
          text: "Core Principles"
        }
      ]
    },

    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: { checked: true },
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: [
                {
                  type: "text",
                  text: "Create consistent spacing across the interface"
                }
              ]
            }
          ]
        },

        {
          type: "taskItem",
          attrs: { checked: true },
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: [
                {
                  type: "text",
                  text: "Keep typography readable and structured"
                }
              ]
            }
          ]
        },

        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: [
                {
                  type: "text",
                  text: "Design interactions that feel effortless"
                }
              ]
            }
          ]
        }
      ]
    },

    {
      type: "heading",
      attrs: { textAlign: null, level: 1 },
      content: [
        {
          type: "text",
          text: "Typography & Code"
        }
      ]
    },

    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          attrs: { textAlign: null },
          content: [
            {
              type: "text",
              text: "People rarely read every word carefully. Great interfaces are designed for scanning."
            }
          ]
        }
      ]
    },

    {
      type: "paragraph",
      attrs: { textAlign: null },
      content: [
        {
          type: "text",
          text: "Good typography creates rhythm. You can emphasize ideas with "
        },
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "bold text"
        },
        {
          type: "text",
          text: ", "
        },
        {
          type: "text",
          marks: [{ type: "italic" }],
          text: "italic text"
        },
        {
          type: "text",
          text: ", or "
        },
        {
          type: "text",
          marks: [{ type: "code" }],
          text: "inline code"
        },
        {
          type: "text",
          text: ". "
        },
        {
          type: "text",
          marks: [{ type: "highlight" }],
          text: "Small details create trust."
        }
      ]
    },

    {
      type: "codeBlock",
      attrs: { language: "javascript" },
      content: [
        {
          type: "text",
          text: "function createInterface(user) {\n  return {\n    message: `Welcome back, ${user.name}`,\n    minimal: true,\n  };\n}"
        }
      ]
    },

    {
      type: "horizontalRule"
    },

    {
      type: "paragraph",
      attrs: { textAlign: "center" },
      content: [
        {
          type: "text",
          marks: [{ type: "italic" }],
          text: "Thoughtful interfaces make technology feel invisible."
        }
      ]
    }
  ]
};

export default welcomeText;