import { RuleTester } from '@typescript-eslint/rule-tester';
import { pathChecker } from './path-checker';

const ruleTester = new RuleTester();

ruleTester.run('pathChecker', pathChecker, {
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
      errors: [{ messageId: 'error'}],
      options: [{
          alias: '@'
        }
      ]
    },
    {
      filename: '/home/krtv/eslint-plugin-krtv-plugin/src/entities/Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slices/addCommentFormSlice'",
      output: "import { addCommentFormActions, addCommentFormReducer } from './Article/model/slices/addCommentFormSlice'",
      errors: [{ messageId: 'error'}],
    },
  ],
});
