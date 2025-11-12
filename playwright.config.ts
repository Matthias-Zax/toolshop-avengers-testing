import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    launchOptions: {
      // 1
      args: ["--start-maximized"],
    },
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Set timeout to 10 seconds */
    actionTimeout: 10000,
    navigationTimeout: 10000,
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project - runs before all tests
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: { 
        ...devices['Desktop Chrome'],
        headless: false,
        viewport: { width: 1920, height: 1080 },
      },
    },

    // Main test project - depends on setup
    {
      name: 'chromium-playwright',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        // Use Playwright's own Chromium browser
        headless: false,
      },
      dependencies: ['setup'],
    },

    // LambdaTest projects for cross-browser testing
    {
      name: 'chrome:latest:Windows 10@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox:latest:Windows 10@lambdatest', 
      use: {
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },

    {
      name: 'MicrosoftEdge:latest:Windows 10@lambdatest',
      use: {
        viewport: { width: 1920, height: 1080 },
      },
      dependencies: ['setup'],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
