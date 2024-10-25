"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const path_checker_1 = require("./path-checker");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('pathChecker', path_checker_1.pathChecker, {
    valid: [
        {
            filename: '/home/krtv/eslint-plugin-krtv-plugin/src/entities/Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
        },
    ],
    invalid: [
        {
            filename: '/home/krtv/eslint-plugin-krtv-plugin/src/entities/Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/slices/addCommentFormSlice'",
            output: "import { addCommentFormActions, addCommentFormReducer } from './Article/model/slices/addCommentFormSlice'",
            errors: [{ messageId: 'error' }],
            options: [{
                    alias: '@'
                }
            ]
        },
        {
            filename: '/home/krtv/eslint-plugin-krtv-plugin/src/entities/Article',
            code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slices/addCommentFormSlice'",
            output: "import { addCommentFormActions, addCommentFormReducer } from './Article/model/slices/addCommentFormSlice'",
            errors: [{ messageId: 'error' }],
        },
    ],
});
