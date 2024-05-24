[![Tests](https://github.com/apis3445/PlaywrightFramework/actions/workflows/main.yml/badge.svg)](https://github.com/apis3445/PlaywrightFramework/actions/workflows/main.yml)

# POC for accessibility testing tool and end-to-end tests with Playwright.

This boilerplate includes demos to test different testing scenarios with Playwright and an accessibility tool that generates reports for the accessibility bugs and options to copy the bugs.

# Example tests:

[Accessibility](./tests/Accessibility): Although accessibility testing requires manual testing, the sample:

- Finds the bugs with @axe-core/playwright.
- Dashboard reports.
- Summary of errors by page with an option to copy bugs.
- Summary of error by WCAG rule with an option to copy bugs.
- Summary of alternative texts.
- POC of visual tab order testing.
- Video that highlights the elements with accessibility bugs and footer text to explain the bug.

[Select random products from e-commerce](.tests/ContosoTraders/Api): Instead of always selecting the same product, you can get the list of available products from the API. Is it helpful when there are:

- Some items in the shopping cart are promos or informative images.
- Unavailable items for future presale or special offers.
- Complex business rules to restrict the items for some users.
  You can get a random product for your test scenario in each test execution and don't use always the same item.

[Generate tests with AI with ZeroStep](./tests/Effiziente/AI-ZeroStep): With ZeroStep allows you to create your test with plain text.

```
ai("Fill out the form with realistic values")
```

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

## LambdaTest

Lambda test allows you to execute your test in different browsers and countries.

To connect to Lambdatest add the next variables

```
LT_USERNAME = Your lambdatest user name
LT_ACCESS_KEY = Your lambdatest access key
```

## Qase

Qase is a test management tool to execute your manual and automated tests

If you want to connect with QASE a test management tool add the next variables:

```
QASE_TOKEN= Qase token for playwright
QASE_PROJECT_CODE= Qase project to connect
```

You can follow the Qase documentation to get these values.

https://docs.qase.io/apps/reporters/playwright

## Accessibility tests

It's important and is the law in some countries that your website is accessible to all people

To run accessibility test:

```
PAGE_URL= Page to test example: "https://www.google.com"
DEBUG_PAUSE=2000 Milliseconds to highlight elements with accessibility issues.
```

Dashboard and summaries will be stored in test-results folder

## ZeroStep

ZeroStep allows you to execute your tests with AI

To check the ZeroStep to execute your test with AI you need to register your account at https://zerostep.com and add your access token:

```
ZEROSTEP_TOKEN=Your Zero step token
```

## Checkly

Checkly allows you to monitor your test in different countries periodically, for example, every 3 hours and send you alerts if the test fails or is taking more than the expected response time.

This is not the only exists others like PerfAgents

Run your test with Checkly

```console
 npx checkly test --record;
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
