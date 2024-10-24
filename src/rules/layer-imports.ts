import { ESLintUtils } from "@typescript-eslint/utils";
import path from "path";
import micromatch from "micromatch"
import { isPathRelative } from "../helpers";

export type LayerImportsType = {
    alias: string
    ignoreImportPatterns: string[]
}
  
export const layerImports = ESLintUtils.RuleCreator.withoutDocs<[LayerImportsType], 'upperlyingImport'>({
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
              alias: '' ,
              ignoreImportPatterns: []
            }
          ],
            create(context) {
                const layers: {[key: string]: string[]} = {
                    'app': ['pages', 'widgets', 'features', 'shared', 'entities'],
                    'pages': ['widgets', 'features', 'shared', 'entities'],
                    'widgets': ['features', 'shared', 'entities'],
                    'features': ['shared', 'entities'],
                    'entities': ['shared', 'entities'],
                    'shared': ['shared'],
                  }
              
                  const availableLayers: {[key: string]: string} = {
                    'app': 'app',
                    'entities': 'entities',
                    'features': 'features',
                    'shared': 'shared',
                    'pages': 'pages',
                    'widgets': 'widgets',
                  }
              

                  const {alias = '', ignoreImportPatterns = []} = context.options[0] ?? {};
              
                  const getCurrentFileLayer = () => {
                    const currentFilePath = context.filename;
                    const pathSeparator = path.sep;
                    const normalizedPath = path.toNamespacedPath(currentFilePath);
                    const projectPath = normalizedPath?.split('src')[1];
                    const segments = projectPath?.split(pathSeparator)
              
                    return segments?.[1];
                  }
              
                  const getImportLayer = (value: string) => {
                    const importPath = alias ? value.replace(`${alias}/`, '') : value;
                    const segments = importPath?.split('/')
              
                    return segments?.[0]
                  }
              
                  return {
                    ImportDeclaration(node) {
                      const importPath = node.source.value
                      const currentFileLayer = getCurrentFileLayer()
                      const importLayer = getImportLayer(importPath)
              
                      if(isPathRelative(importPath)) {
                        return;
                      }
              
                      if(!availableLayers[importLayer] || !availableLayers[currentFileLayer]) {
                        return;
                      }
              
                      const isIgnored = ignoreImportPatterns.some(pattern => {
                        return micromatch.isMatch(importPath, pattern)
                      });
              
                      if(isIgnored) {
                        return;
                      }
              
                      if(!layers[currentFileLayer]?.includes(importLayer)) {
                        context.report({node, messageId: 'upperlyingImport'});
                      }
                    }
                  };
                },
            
      })
  

