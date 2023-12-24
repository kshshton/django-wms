export default {
  testMatch: ["<rootDir>/**/*.test.js"],
  testEnvironment: "node",
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
};
