import { RuleTester } from '@typescript-eslint/rule-tester';
import { publicApiImports, PublicApiImportsType } from './public-api-imports';

const ruleTester = new RuleTester();

const aliasOptions = [
  {
    alias: '@',
    testFilesPatterns: ['**/*.test.ts', '**\\*.test.ts', '**/StoreDecorator.tsx', '**\\StoreDecorator.tsx']
  },
] as readonly [PublicApiImportsType]

ruleTester.run('publicApiImports', publicApiImports, {
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

      options: aliasOptions,
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
      output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [{ messageId: "forbiddenAbsolutePath"}],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
      output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [{ messageId: "forbiddenAbsolutePath"}],
      options: aliasOptions
    },
    {
      filename: 'krtv/home/src/entities/StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
      output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [{ messageId: "forbiddenAbsolutePath"}],
      options: aliasOptions
    },
    // {
    //   filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\forbidden.ts',
    //   code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
    //   output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
    //   errors: [{ messageId: "forbiddenTesting"}, { messageId: "forbiddenAbsolutePath"}],
    //   options: aliasOptions
    // }
  ],
});
