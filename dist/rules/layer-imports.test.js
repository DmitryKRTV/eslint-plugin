"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const layer_imports_1 = require("./layer-imports");
const ruleTester = new rule_tester_1.RuleTester();
const aliasOptions = [
    {
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider']
    }
];
ruleTester.run("layer-imports", layer_imports_1.layerImports, {
    valid: [
        {
            filename: 'krtv/home/src/features/Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
            options: aliasOptions,
        },
        {
            filename: 'krtv/home/src/features/Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
            options: aliasOptions,
        },
        {
            filename: 'krtv/home/src/app/providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
            options: aliasOptions,
        },
        {
            filename: 'krtv/home/src/widgets/pages',
            code: "import { useLocation } from 'react-router-dom'",
            options: aliasOptions,
        },
        {
            filename: 'krtv/home/src/app/providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
            options: aliasOptions,
        },
        {
            filename: 'krtv/home/src/index.tsx',
            code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
            options: aliasOptions,
        },
        {
            filename: 'krtv/home/src/entities/Article.tsx',
            code: "import { StateSchema } from '@/app/providers/StoreProvider'",
            options: [
                {
                    alias: '@',
                    ignoreImportPatterns: ['**/StoreProvider']
                }
            ],
        }
    ],
    invalid: [
        {
            filename: 'krtv/home/src/entities/providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Articl'",
            errors: [{ messageId: 'upperlyingImport' }],
            options: aliasOptions,
        },
        {
            filename: 'krtv/home/src/features/providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
            errors: [{ messageId: 'upperlyingImport' }],
            options: aliasOptions,
        },
        {
            filename: 'krtv/home/src/entities/providers',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
            errors: [{ messageId: 'upperlyingImport' }],
            options: aliasOptions,
        },
    ],
});
