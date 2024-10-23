import { pathChecker } from "./rules/path-checker";

const plugin = {
  // preferred location of name and version
  meta: {
      name: "eslint-plugin-krtv-plugin",
      version: "0.1.1"
  },
  rules: {
     "path-checker": pathChecker,
  }
};

module.exports = plugin;