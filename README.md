# POC to E2E test with Playwright TS

[![Tests](https://github.com/apis3445/PlaywrightFramework/actions/workflows/main.yml/badge.svg)](https://github.com/apis3445/PlaywrightFramework/actions/workflows/main.yml)

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
EFFIZIENTE_API_URL='https://effizienteauthdemo.azurewebsites.net'
EFFIZIENTE_URL='https://effizientedemo.azurewebsites.net'
EFFIZIENTE_COMPANY='Demo'
EFFIZIENTE_NORMAL_USER='Demo'
EFFIZIENTE_NORMAL_PASSWORD='Demo'
EFFIZIENTE_ADMIN_USER='Admin'
EFFIZIENTE_ADMIN_PASSWORD='Admin'
LT_USERNAME = Your lambdatest user name
LT_ACCESS_KEY = Your lambdatest access key
```

If you want to connect with QASE add the next variables:

```
QASE_TOKEN= Qase token for playwright
QASE_PROJECT_CODE= Qase project to connect 
```

You can follow the Qase documentation to find the values.

https://docs.qase.io/apps/reporters/playwright

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
