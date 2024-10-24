import { RuleTester } from '@typescript-eslint/rule-tester';
import { layerImports, LayerImportsType } from './layer-imports';

const ruleTester = new RuleTester();

const aliasOptions = [
  {
    alias: '@',
    ignoreImportPatterns: ['**/StoreProvider']
  }
] as readonly [LayerImportsType]

ruleTester.run("layer-imports", layerImports, {
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
      errors: [{ messageId: 'upperlyingImport'}],
      options: aliasOptions,
    },
    {
      filename: 'krtv/home/src/features/providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
      errors: [{ messageId: 'upperlyingImport'}],
      options: aliasOptions,
    },
    {
      filename: 'krtv/home/src/entities/providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
      errors: [{ messageId: 'upperlyingImport'}],
      options: aliasOptions,
    },
  ],
});
