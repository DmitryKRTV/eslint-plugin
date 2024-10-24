"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const public_api_imports_1 = require("./public-api-imports");
const ruleTester = new rule_tester_1.RuleTester();
const aliasOptions = [
    {
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**\\*.test.ts', '**/StoreDecorator.tsx', '**\\StoreDecorator.tsx']
    },
];
ruleTester.run('publicApiImports', public_api_imports_1.publicApiImports, {
    valid: [
        {
            code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
        },
        {
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
            options: aliasOptions
        },
        {
            filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\file.test.ts',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
            options: aliasOptions
        },
        {
            filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\StoreDecorator.tsx',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
            options: aliasOptions
        }
    ],
    invalid: [
        {
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/file.ts'",
            errors: [{ messageId: "forbiddenAbsolutePath" }],
            options: aliasOptions,
        },
        {
            filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\StoreDecorator.tsx',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
            errors: [{ messageId: "forbiddenAbsolutePath" }],
            options: aliasOptions
        },
        {
            filename: 'krtv/home/src/entities/StoreDecorator.tsx',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
            errors: [{ messageId: "forbiddenAbsolutePath" }],
            options: aliasOptions
        },
        {
            filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\forbidden.ts',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
            errors: [{ messageId: "firbiddenTesting" }],
            options: aliasOptions
        }
    ],
});
