import { ESLintUtils } from "@typescript-eslint/utils";
import path from'path';
import { isPathRelative } from "../helpers";

type PathCheckerType = {
  alias: string
}

export const pathChecker = ESLintUtils.RuleCreator.withoutDocs<[PathCheckerType], 'error'>({
    meta: {
        type: "problem",
        messages: {
            error: "import should be relative",
        },
        fixable: 'code',
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
            const alias = context.options[0]?.alias || '';

            return {
              ImportDeclaration(node) {
                const value = node.source.value
                const importTo = alias ? value.replace(`${alias}/`, '') : value;
                const fromFilename = context.filename;
                const pathSeparator = path.sep;
          
                if(shouldBeRelative(fromFilename, importTo)) {
                  context.report({
                    node,
                    messageId: 'error',
                    fix: (fixer) => {
                      const normalizedPath = getNormalizedCurrentFilePath(fromFilename) // /entities/Article/Article.tsx
                          .split('/')
                          .slice(0, -1)
                          .join('/');
                      let relativePath = path.relative(normalizedPath, `/${importTo}`)
                          .split(pathSeparator)
                          .join('/');
        
                      if(!relativePath.startsWith('.')) {
                        relativePath = './' + relativePath;
                      }
        
                      return fixer.replaceText(node.source, `'${relativePath}'`)
                    }});
                }
              }
            };
          },
    })

const layers: {[key: string]: string} = {
  "entities": 'entities',
  "features": 'features',
  "shared": 'shared',
  "pages": 'pages',
  "widgets": 'widgets',
}

function getNormalizedCurrentFilePath(currentFilePath: string) {
  const normalizedPath = path.toNamespacedPath(currentFilePath);
  const projectFrom = normalizedPath.split('src')[1];
  const pathSeparator = path.sep;
  return projectFrom.split(pathSeparator).join('/')
}

function shouldBeRelative(from: string, to: string) {
  if(isPathRelative(to)) {
    return false;
  }

  const pathSeparator = path.sep;

  const toArray = to.split('/')
  const toLayer = toArray[0]; // entities
  const toSlice = toArray[1]; // Article

  if(!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }

  const normalizedPath = path.toNamespacedPath(from);
  const projectFrom = normalizedPath.split('src')[1];
  const fromArray = projectFrom.split(pathSeparator)

  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];
  if(!fromLayer || !fromSlice || !layers[fromLayer]) {
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



