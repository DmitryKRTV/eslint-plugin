// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//     testMatch: ["**/*.test.ts"],
//     // setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
// };
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Match only *.test.ts files to avoid the compiled *.test.js files
    testMatch: ["**/*.test.ts"]
  };