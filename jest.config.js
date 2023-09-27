module.exports = {
  preset: "react-scripts",
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)",
    "/node_modules/(?!(react-use)/)",
  ],
};
