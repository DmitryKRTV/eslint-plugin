"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicApiImports = void 0;
const utils_1 = require("@typescript-eslint/utils");
const helpers_1 = require("../helpers");
const path_1 = __importDefault(require("path"));
const micromatch_1 = __importDefault(require("micromatch"));
exports.publicApiImports = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "problem",
        messages: {
            error: "import should be relative",
            forbiddenAbsolutePath: "Absolute import is allowed only from Public API (index.ts)",
            firbiddenTesting: 'Test data must be imported from publicApi/testing.ts'
        },
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string'
                    },
                    testFilesPatterns: {
                        type: 'array'
                    }
                }
            }
        ],
    },
    defaultOptions: [{
            alias: '',
            testFilesPatterns: []
        }
    ],
    create(context) {
        var _a;
        const { alias = '', testFilesPatterns = [] } = (_a = context.options[0]) !== null && _a !== void 0 ? _a : {};
        const layers = {
            "entities": 'entities',
            "features": 'features',
            "pages": 'pages',
            "widgets": 'widgets',
        };
        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const importTo = alias ? value.replace(`${alias}/`, '') : value;
                if ((0, helpers_1.isPathRelative)(importTo)) {
                    return;
                }
                // [entities, article, model, types]
                const segments = importTo.split('/');
                const layer = segments[0];
                if (!layers[layer]) {
                    return;
                }
                const isImportNotFromPublicApi = segments.length > 2;
                // [entities, article, testing]
                const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4;
                if (isImportNotFromPublicApi && !isTestingPublicApi) {
                    context.report({ node, messageId: 'forbiddenAbsolutePath' });
                }
                if (isTestingPublicApi) {
                    const currentFilePath = context.filename;
                    const normalizedPath = path_1.default.toNamespacedPath(currentFilePath);
                    const isCurrentFileTesting = testFilesPatterns.some(pattern => micromatch_1.default.isMatch(normalizedPath, pattern));
                    if (!isCurrentFileTesting) {
                        context.report({ node, messageId: 'firbiddenTesting' });
                    }
                }
            }
        };
    },
});
