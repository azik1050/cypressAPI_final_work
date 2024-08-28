const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
        // implement node event listeners here
        },
        specPattern: "cypress/e2e/**/*.js",
        screenshotOnRunFailure: true,
        retries: {
            runMode: 2,
            openMode: 2
        }
    },
});
