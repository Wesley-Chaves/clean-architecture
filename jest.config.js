/** @type {import('jest').Config} */
module.exports = {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: "jest-environment-node",
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
