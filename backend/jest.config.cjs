module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/","/src/index.ts"],  
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
