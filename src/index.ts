import { layerImports } from "./rules/layer-imports";
import { pathChecker } from "./rules/path-checker";
import { publicApiImports } from "./rules/public-api-imports";

const plugin = {
  // preferred location of name and version
  meta: {
      name: "eslint-plugin-krtv-plugin",
      version: "0.1.7"
  },
  rules: {
     "path-checker": pathChecker,
     "public-api-imports": publicApiImports,
     "layer-imports": layerImports
  }
};

module.exports = plugin;