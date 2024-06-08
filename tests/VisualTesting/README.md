# Visual Testing

You can compare screenshots of a page or one HTML element with Playwright. The first time that you run the test the snapshot will save and the test will fail. The next executions will compare the screenshot in the test execution with the saved snapshot

When the UI changes you can use this command to update the snapshot

```console
npx playwright test --update-snapshots
```

This sample is a dashboard that updated the charts daily, to get the same screenshot I mocked the API with fixed data in a JSON file.

## Articles

[Visual Testing with Playwright](https://abigailarmijo.substack.com/p/visual-testing-with-playwright)
