"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_checker_1 = require("./rules/path-checker");
const plugin = {
    // preferred location of name and version
    meta: {
        name: "eslint-plugin-krtv-plugin",
        version: "0.1.1"
    },
    rules: {
        "path-checker": path_checker_1.pathChecker,
    }
};
module.exports = plugin;
