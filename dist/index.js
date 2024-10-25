"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layer_imports_1 = require("./rules/layer-imports");
const path_checker_1 = require("./rules/path-checker");
const public_api_imports_1 = require("./rules/public-api-imports");
const plugin = {
    // preferred location of name and version
    meta: {
        name: "eslint-plugin-krtv-plugin",
        version: "0.1.7"
    },
    rules: {
        "path-checker": path_checker_1.pathChecker,
        "public-api-imports": public_api_imports_1.publicApiImports,
        "layer-imports": layer_imports_1.layerImports
    }
};
module.exports = plugin;
