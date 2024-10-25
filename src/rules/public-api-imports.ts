import { ESLintUtils } from "@typescript-eslint/utils";
import { isPathRelative } from "../helpers";
import path from'path';
import micromatch from "micromatch"

export type PublicApiImportsType = {
    alias: string
    testFilesPatterns: string[]
}

type MessageIdsType = 'error' | 'forbiddenAbsolutePath' | 'forbiddenTesting'
  
export const publicApiImports = ESLintUtils.RuleCreator.withoutDocs<[PublicApiImportsType], MessageIdsType>({
      meta: {
          type: "problem",
          messages: {
              error: "import should be relative",
              forbiddenAbsolutePath: "Absolute import is allowed only from Public API (index.ts)",
              forbiddenTesting: 'Test data must be imported from publicApi/testing.ts'
          },
          fixable: 'code',
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
              alias: '' ,
              testFilesPatterns: []
            }
          ],
          create(context) {
            const { alias = '', testFilesPatterns = [] } = context.options[0] ?? {};
        
            const layers: {[key: string]: string} = {
                "entities": 'entities',
                "features": 'features',
                "pages": 'pages',
                "widgets": 'widgets',
            }
        
            return {
              ImportDeclaration(node) {
                const value = node.source.value
                const importTo = alias ? value.replace(`${alias}/`, '') : value;
        
                if(isPathRelative(importTo)) {
                  return;
                }
        
                // [entities, article, model, types]
                const segments = importTo.split('/')
                const layer = segments[0];
                const slice = segments[1];
        
                if(!layers[layer]) {
                  return;
                }
        
                const isImportNotFromPublicApi = segments.length > 2;
                // [entities, article, testing]+
                const isTesting = segments[2] === 'testing'
                const isTestingPublicApi = isTesting && segments.length < 4
        
                if(isImportNotFromPublicApi && !isTestingPublicApi) {
                  context.report({
                    node,
                    messageId: 'forbiddenAbsolutePath',
                    fix: (fixer) => {
                      return fixer.replaceText(node.source, `'${alias}/${layer}/${slice}'`)
                  }});
                }
        
                if(isTestingPublicApi) {
                  const currentFilePath = context.filename;
                  const normalizedPath = path.toNamespacedPath(currentFilePath);
        
                  const isCurrentFileTesting = testFilesPatterns.some(
                      pattern => micromatch.isMatch(normalizedPath, pattern)
                  )
        
                  if(!isCurrentFileTesting) {
                    context.report({node, messageId: 'forbiddenTesting'});
                  }
                }
              }
            };
          },
        })