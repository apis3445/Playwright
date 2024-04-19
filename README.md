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
```

To connect to Lambdatest add the next variables

```
LT_USERNAME = Your lambdatest user name
LT_ACCESS_KEY = Your lambdatest access key
```

If you want to connect with QASE a test management tool add the next variables:

```
QASE_TOKEN= Qase token for playwright
QASE_PROJECT_CODE= Qase project to connect 
```

You can follow the Qase documentation to get these values.

https://docs.qase.io/apps/reporters/playwright

To run accessibility test:

```
PAGE_URL= Page to test example: "https://www.google.com"
DEBUG_PAUSE=2000 Milliseconds to highlight elements with accessibility issues.
```

Dashboard and summaries will be stored in test-results folder

To check the ZeroStep to execute your test with AI you need to register your account at https://zerostep.com and add your access token:

```
ZEROSTEP_TOKEN=Your Zero step token
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

Run your test with Checkly

```console
 npx checkly test --record;  
```

Or you can run with the Visual Code Extension

You can see the reporter on the GitHub Pages:

https://apis3445.github.io/PlaywrightFramework/
