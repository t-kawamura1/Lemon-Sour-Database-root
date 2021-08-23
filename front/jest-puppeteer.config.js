// See https://github.com/smooth-code/jest-puppeteer for more information about these options
module.exports = {
  launch: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  server: {
    command: "npm run serve",
    port: 8080,
    launchTimeout: 100000,
  },
};
