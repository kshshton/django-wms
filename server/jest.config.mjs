export default {
  testMatch: ["<rootDir>/tests/*.test.js"],
  testEnvironment: "node",
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
  testEnvironmentOptions: {
    url: "http://127.0.0.1:4000",
  },
};
