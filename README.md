# POC to E2E test with Playwright TS

# Required software

- Node js -> v.16 or above
- VS Code
- Playwright Vs Code Extension (Optional)

## Setup Playwright

Clone this repo and execute the next commands

Navigate to the folder and install the NPM packages

```console
npm install
```

Install Playwright browsers and dependencies

```console
npx playwright install
```

Add .env file with the next values:

```
BASE_URL='https://www.saucedemo.com'
USER_NAME=valid user in saucedemo
PASSWORD=password for sauce demo
LOCALE=locale to test. Valid values are: 'en-US', 'de-DE', 'es-MX'
```

## Run tests

Execute the next command to run your tests:

Run tests 

```console
npx playwright test
```

Run the test with UI mode

```console
npx playwright test --ui
```

Or you can run with the Visual Code Extension

You can see the reporter on the GitHub Pages:

https://apis3445.github.io/PlaywrightFramework/