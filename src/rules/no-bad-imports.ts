import { ESLintUtils } from "@typescript-eslint/utils";

export const noBadImports = ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "problem",
        messages: {
            error: "Do not use bad imports",

          },
          schema: [],
      },
      defaultOptions: [],
        create: function (context) {
        return {
          ImportDeclaration(node) {
            if (node.source.value === "file/bad-import") {
              context.report({
                node,
                messageId: "error",
              });
            }
          },
        };
      },
    })