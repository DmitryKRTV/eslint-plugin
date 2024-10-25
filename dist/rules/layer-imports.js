"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.layerImports = void 0;
const utils_1 = require("@typescript-eslint/utils");
const path_1 = __importDefault(require("path"));
const micromatch_1 = __importDefault(require("micromatch"));
const helpers_1 = require("../helpers");
exports.layerImports = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "problem",
        messages: {
            upperlyingImport: "A layer can only import underlying layers (shared, entities, features, widgets, pages, app)",
        },
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string',
                    },
                    ignoreImportPatterns: {
                        type: 'array',
                    }
                },
            }
        ],
    },
    defaultOptions: [{
            alias: '',
            ignoreImportPatterns: []
        }
    ],
    create(context) {
        var _a;
        const layers = {
            'app': ['pages', 'widgets', 'features', 'shared', 'entities'],
            'pages': ['widgets', 'features', 'shared', 'entities'],
            'widgets': ['features', 'shared', 'entities'],
            'features': ['shared', 'entities'],
            'entities': ['shared', 'entities'],
            'shared': ['shared'],
        };
        const availableLayers = {
            'app': 'app',
            'entities': 'entities',
            'features': 'features',
            'shared': 'shared',
            'pages': 'pages',
            'widgets': 'widgets',
        };
        const { alias = '', ignoreImportPatterns = [] } = (_a = context.options[0]) !== null && _a !== void 0 ? _a : {};
        const getCurrentFileLayer = () => {
            const currentFilePath = context.filename;
            const pathSeparator = path_1.default.sep;
            const normalizedPath = path_1.default.toNamespacedPath(currentFilePath);
            const projectPath = normalizedPath === null || normalizedPath === void 0 ? void 0 : normalizedPath.split('src')[1];
            const segments = projectPath === null || projectPath === void 0 ? void 0 : projectPath.split(pathSeparator);
            return segments === null || segments === void 0 ? void 0 : segments[1];
        };
        const getImportLayer = (value) => {
            const importPath = alias ? value.replace(`${alias}/`, '') : value;
            const segments = importPath === null || importPath === void 0 ? void 0 : importPath.split('/');
            return segments === null || segments === void 0 ? void 0 : segments[0];
        };
        return {
            ImportDeclaration(node) {
                var _a;
                const importPath = node.source.value;
                const currentFileLayer = getCurrentFileLayer();
                const importLayer = getImportLayer(importPath);
                if ((0, helpers_1.isPathRelative)(importPath)) {
                    return;
                }
                if (!availableLayers[importLayer] || !availableLayers[currentFileLayer]) {
                    return;
                }
                const isIgnored = ignoreImportPatterns.some(pattern => {
                    return micromatch_1.default.isMatch(importPath, pattern);
                });
                if (isIgnored) {
                    return;
                }
                if (!((_a = layers[currentFileLayer]) === null || _a === void 0 ? void 0 : _a.includes(importLayer))) {
                    context.report({ node, messageId: 'upperlyingImport' });
                }
            }
        };
    },
});
