"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathChecker = void 0;
const utils_1 = require("@typescript-eslint/utils");
const path_1 = __importDefault(require("path"));
exports.pathChecker = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "problem",
        messages: {
            error: "import should be relative",
        },
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string'
                    }
                }
            }
        ],
    },
    defaultOptions: [{
            alias: ''
        }
    ],
    create(context) {
        var _a;
        const alias = ((_a = context.options[0]) === null || _a === void 0 ? void 0 : _a.alias) || '';
        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const importTo = alias ? value.replace(`${alias}/`, '') : value;
                const fromFilename = context.filename;
                if (shouldBeRelative(fromFilename, importTo)) {
                    context.report({ node, messageId: 'error' });
                }
            }
        };
    },
});
function isPathRelative(path) {
    return path === '.' || path.startsWith('./') || path.startsWith('../');
}
const layers = {
    "entities": 'entities',
    "features": 'features',
    "shared": 'shared',
    "pages": 'pages',
    "widgets": 'widgets',
};
function shouldBeRelative(from, to) {
    if (isPathRelative(to)) {
        return false;
    }
    const pathSeparator = path_1.default.sep;
    const toArray = to.split('/');
    const toLayer = toArray[0]; // entities
    const toSlice = toArray[1]; // Article
    if (!toLayer || !toSlice || !layers[toLayer]) {
        return false;
    }
    const normalizedPath = path_1.default.toNamespacedPath(from);
    const projectFrom = normalizedPath.split('src')[1];
    const fromArray = projectFrom.split(pathSeparator);
    const fromLayer = fromArray[1];
    const fromSlice = fromArray[2];
    if (!fromLayer || !fromSlice || !layers[fromLayer]) {
        return false;
    }
    return fromSlice === toSlice && toLayer === fromLayer;
}
// BETTER PRACTISE https://thesonofthomp.medium.com/writing-a-custom-eslint-plugin-with-typescript-08d0e01726d2
// console.log(shouldBeRelative('home/src/entities/Article', '@/entities/Article/fasfasfas'))
// console.log(shouldBeRelative('home/src/entities/Article', '@/entities/Article'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', '@/entities/Article'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', '@/features/Article/fasfasfas'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\features\\Article', '@/features/Article/fasfasfas'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', '@/app/index.tsx'))
// console.log(shouldBeRelative('C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article', '@/entities/Article/asfasf/asfasf'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', '../../model/selectors/getSidebarItems'))
