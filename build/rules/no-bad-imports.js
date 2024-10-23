"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noBadImports = void 0;
const utils_1 = require("@typescript-eslint/utils");
exports.noBadImports = utils_1.ESLintUtils.RuleCreator.withoutDocs({
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
});
