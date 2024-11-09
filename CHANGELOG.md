# 0.19.2 (2024-11-09)

### Enhancements

- Improved test steps descriptions and annotations for better traceability and debugging.
- Simplified methods by removing redundant annotations and enhancing logic.

# 0.19.1 (2024-11-2)

### Enhancements

- Improve Allure Suites and Parameters
- Change Azure DevOps pipeline to connect Allure on the cloud
- Minor fixes on AddDescription to include the color for the description

# 0.19.0 (2024-10-19)

### Enhancements

- Added parameterized tests for improved test coverage and flexibility.
- Integrated environment variables for Azure DevOps pipeline configuration.
- Updated packages, including Playwright and Lighthouse, for enhanced performance and compatibility.

### Features

- Introduced Allure report parameters to enhance test reporting capabilities.

# 0.18.0 (2024-10-07)

### Enhancements

- Accessibility report by page now ask for the ADO token with a modal dialog. Future release will improve the dialog and UX
- Added reports
  Ortoni Report
  Allure report

# 0.17.0 (2024-10-05)

### Enhancements

- Accessibility Testing from VS Code now includes speech synthesis. The audio is not saved in playwright video because playwright is not storing audio.
- Now the time for the video in accessibility testing is defined with a formula to give enough time to read the error
- Added option to create the bug in Azure Devops, for now is storing the token in the HTML file but I will change to include some external api to connect to azure devops
- Updated workflows to remove the previous alpha version for Microsoft Playwright Reporter

### Documentation

- Updated readme file to remove the DEBUG_PAUSE

# 0.16.0 (2024-09-28)

### Enhancements

- Refactored AccessibilityHelper for improved element highlighting and annotation handling.
- Enhanced accessibility report template with better styling and usability features.
- Updated Playwright configuration to use environment variables and improved test settings.
- Remove alpha version of microsoft azure playwright reporting
- A11y report nows has better UI and include the option to show the bugs

### Features

- Added Azure DevOps pipeline integration for accessibility reporting.
- Updated to latest version of Playwright.

# 0.15.0 (2024-09-20)

# Enhancements

- Improved accessibility report template with enhanced styling and usability features.
- Refactored AccessibilityHelper for better element highlighting and annotation handling.
- Updated Playwright configuration to use environment variables and enhanced test settings.
- Simplified GitHub workflow for the accessibility tool by removing unnecessary commands.

# Features

- Added Azure DevOps pipeline integration for accessibility reporting.
- Enhanced server tests with annotations and post-conditions for improved clarity.

# Documentation

- Updated README with the new GitHub Pages link for the reporter.

# 0.14.0 (2024-09-07)

### Features

- Create an Accessibility Helper to check with axe-deque and lighthouse.
- Create FileHelper to refactor and improve the reporter.
- Updated to ESLint 9.
- Fix the issue of attaching the video to the accessibility report.
- Update to use the beta version of Microsoft Playwright Reporter.

# 0.13.0 (2024-08-24)

### Features

- Added a new custom reporter with description, pre-conditions, post-conditions, steps, video, and attachments.
- Change GitHub pages to show the custom reporter

# 0.12.0 (2024-08-24)

### Features

- Introduced new page classes for WebdriverIO Shop, including HomePage, CartPage, and ProductDetailPage.
- Added the ProductsApi class to handle product-related API calls.
- Implemented Select component for dropdown interactions.
- Updated addToCart test to use new WebdriverIO Shop pages and components.
- Refactored accessibility and annotation helpers for better error processing.
- Change the yml to include the new URL for the webdriver shop

### Documentation

- Improve the readme to include YouTube video and change to axe-core® to be compliant with the Deque trademark

# 0.11.2 (2024-08-10)

### Enhancements

- Refactored multiple components for better naming conventions and readability.
- Removed unused code and imports.
- Updated dependencies and versions.

### Bug Fixes

- Fixed typos in class names and improved string interpolation in log messages.

### Documentation

- Added and updated JSDoc comments for better documentation.
- Removed outdated images from Accessibility README.

# 0.11.0 (2024-07-20)

### Bug Fixes

- Add page URL environment variable ([aab2340](https://github.com/apis3445/Playwright/commit/aab2340225c6a07f6c8206769411f6ac5a5b37c7))
- Add secret variable ([b559d5d](https://github.com/apis3445/Playwright/commit/b559d5d7b29a8032de7755c5f866773b484d4d5b))
- Basic pipeline artifact ([bdde590](https://github.com/apis3445/Playwright/commit/bdde59036630d8ad17d7a679b0aae75d636e8ee1))
- Environment variable ([d3686e6](https://github.com/apis3445/Playwright/commit/d3686e61623bfefd7dd6cd45a49b0f6efe26af12))
- Fix basic pipeline ([25dc942](https://github.com/apis3445/Playwright/commit/25dc9423f3080d85b01c5f368a0ff8ee2dd2c28d))
- Fix npm install in shard tests ([9517992](https://github.com/apis3445/Playwright/commit/951799209a45d2eea00d06dbba2b0c0c1ec19920))
- Update images for visual testing due to changes in the UI ([3b7c48d](https://github.com/apis3445/Playwright/commit/3b7c48d436fa60cdfce5d96dbccbfd37ec8ee6ff))
- Pipeline test execution ([21b7531](https://github.com/apis3445/Playwright/commit/21b753180115251e304c1bef9be6fa17e5378a24))
- Remove extra import ([dff4476](https://github.com/apis3445/Playwright/commit/dff4476d8f1d454d071173952d4a2cc5c4e85a3b))
- Rename folder 'Locale&Geo' to 'Locale_Geo' to avoid issues with special characters in folder names ([a5b614d](https://github.com/apis3445/Playwright/commit/a5b614d986c9b3ab23b5316d2d7134077f1a25f7))
- Skip geo test in firefox ([51fc0ad](https://github.com/apis3445/Playwright/commit/51fc0ade2caee8d28533450b8d7f10b8ce208afc))
- Steps in pipeline ([1afd28d](https://github.com/apis3445/Playwright/commit/1afd28d7bf1083212dac3e29f25875492b0cc27e))
- Update snapshots ([9bec3d8](https://github.com/apis3445/Playwright/commit/9bec3d8ffe62d3b091724db34cb97aa4a1b39189))

### Features

- Update packages to latest versions and add a basic pipeline setup for continuous integration ([a773ef1](https://github.com/apis3445/Playwright/commit/a773ef151a8c4254255e669096813fd88c50c5ed))

# 0.10.0 (2024-06-22)

### Bug Fixes

- Fix params for CI ([68dcb65](https://github.com/apis3445/Playwright/commit/68dcb651347c6ae766da7ff2341c121fae9cf217))
- update qase pipeline ([ebbc2e6](https://github.com/apis3445/Playwright/commit/ebbc2e642592fc5991c7b3a49cefdf8f5351e690))

### Features

- add Playwright testing config([63c237f](https://github.com/apis3445/Playwright/commit/63c237f17dea34af18a0f0f459ac8c79d91f8e8b))

# 0.9.0 (2024-06-15)

### Features

- bing maps test ([9e71e72](https://github.com/apis3445/Playwright/commit/9e71e726d7e267c6830af439e5e4dbb6d4e8314f))
- bingmaps tests click in uncollapse ([7712854](https://github.com/apis3445/Playwright/commit/771285482e139afb4b8bf93b5c7bdd4d4f88a1b1))
- Update documentation and add geolocation test ([556f43b](https://github.com/apis3445/Playwright/commit/556f43b4904b8cfda20462e79cbaaea30d4931c4))

# 0.8.1 (2024-06-08)

### Bug Fixes

- Fix broken links and add more readme files ([d74a61c](https://github.com/apis3445/Playwright/commit/d74a61ccb179eecd2211f0298d95950efa32232d))
- update test in pipeline ([73e129a](https://github.com/apis3445/Playwright/commit/73e129a9fd39204049ea1e0272dc73dadad1b7f7))

### Features

# 0.8.0 (2024-05-11)

### Features

- attach excel to the html reporter ([46a2abd](https://github.com/apis3445/Playwright/commit/46a2abd88d9ad668197ef58c10c8fbf79e261f52))
- Add ExcelHelper to check excel files ([13f3288](https://github.com/apis3445/PlaywrightFramework/commit/13f3288504831dec8ba765b8fbb61eb2c929a61a))

# 0.7.0 (2024-04-27)

### Bug Fixes

- Add base url in pipeline ([7529723](https://github.com/apis3445/PlaywrightFramework/commit/7529723b47c23004ae8b763e54bca234f640fd2d))
- Add environment variables in pipelines ([63d89c0](https://github.com/apis3445/PlaywrightFramework/commit/63d89c0cb2ca57332028e2f5dbf8ca7cf0645b4b))
- add qase reporter ([5e3f9ff](https://github.com/apis3445/PlaywrightFramework/commit/5e3f9ff50d18d9da6368a3e797acdacb6af4422c))
- checkly config ([aa775ce](https://github.com/apis3445/PlaywrightFramework/commit/aa775ce1d2feadd99c4f515270b4b6e22732954e))
- Fix api test to include function to remove server with key ([054d11f](https://github.com/apis3445/PlaywrightFramework/commit/054d11f4b28fa549408139abcada54165eece13a))
- fix main pipeline to exclude a11y tests ([2e12356](https://github.com/apis3445/PlaywrightFramework/commit/2e12356ecff3b1e877f4673520d0e8a47ce158d9))
- fix menu synthetic test ([1b91578](https://github.com/apis3445/PlaywrightFramework/commit/1b91578f35ab7d9c45a68cb2e8c50c35b67fc027))
- fix tab order, exclude a11y tests ([2f83b94](https://github.com/apis3445/PlaywrightFramework/commit/2f83b941b1e80b5c0085e2c735e6d770e0e13e25))
- fix timeout and assert ([abab1d3](https://github.com/apis3445/PlaywrightFramework/commit/abab1d3996a7c56c6540e5e6516d61800402d086))
- fix user ([8e3114e](https://github.com/apis3445/PlaywrightFramework/commit/8e3114e1ac3cfc464fd376cfaebbf089543d7b4e))
- get label for input text ([5dbe862](https://github.com/apis3445/PlaywrightFramework/commit/5dbe86213d387d62bb05f36a23f395dd98ab42c4))
- images in the report ([3d38a68](https://github.com/apis3445/PlaywrightFramework/commit/3d38a68a1fb79ff09aa892e7a97a8c7c8cc1c9ff))
- Increase timeout ([de6d45a](https://github.com/apis3445/PlaywrightFramework/commit/de6d45a86773ca8c553bc10340eeab5bca3ea686))
- increase timeouts ([c2e4c27](https://github.com/apis3445/PlaywrightFramework/commit/c2e4c27ccb597c302756ce9a1fbb5aac226ea677))
- increase timeouts ([6d6e508](https://github.com/apis3445/PlaywrightFramework/commit/6d6e508e8413a5ea3e7159bbcc140cbaa31a7c48))
- increase timeouts for wait dashboard ([3937413](https://github.com/apis3445/PlaywrightFramework/commit/393741313738cfc85da3603b228f5bdff9f87271))
- label for input texts ([8356a22](https://github.com/apis3445/PlaywrightFramework/commit/8356a22cbc76760ebcaf88444f18ccf6114cd6dd))
- Remove last tag syntax ([1c27447](https://github.com/apis3445/PlaywrightFramework/commit/1c27447d0760a718574f714039521a4b11baacfe))
- remove user data ([f5f287e](https://github.com/apis3445/PlaywrightFramework/commit/f5f287ec8e27806ef9a2b2d56395f6fba27dae51))
- Server tests and table component ([ef763dc](https://github.com/apis3445/PlaywrightFramework/commit/ef763dcea8be387a4455148378234494c288cb98))
- skip Zero Steps for browsers different than chromium ([5f64906](https://github.com/apis3445/PlaywrightFramework/commit/5f6490613e24a209640cd23bb38e5dbd9fb81907))
- update packages ([fc73e67](https://github.com/apis3445/PlaywrightFramework/commit/fc73e67e02de7a70763670c19f0e69cdf6b0251d))
- update snapshots to change in the UI ([2fad105](https://github.com/apis3445/PlaywrightFramework/commit/2fad105e5ed728c9238fdc423c29be8522f39684))

### Features

- add changelog and fix ally pipeline ([1595f8b](https://github.com/apis3445/PlaywrightFramework/commit/1595f8bfe7b519cdb5dfada6007859319a2bf652))
- update playwright version and command to execute test with lambdatest ([bc482c2](https://github.com/apis3445/PlaywrightFramework/commit/bc482c2483833a052105e096a1217eda2e057383))
- Add Contoso traders test ([6295221](https://github.com/apis3445/PlaywrightFramework/commit/62952218f44760ca1c10863dd689375ce8a969af))
- add edit server test ([eec8a27](https://github.com/apis3445/PlaywrightFramework/commit/eec8a273a62b3f0044d60517f2247d5c15b528db))
- Change to english and start to add api test ([faecdee](https://github.com/apis3445/PlaywrightFramework/commit/faecdeead1a1358cd6d901394c1973e70a4e3cba))

'# 0.6.0 (2024-03-27)

### Features

- Add ZeroSteps AI ([23af9b7](https://github.com/apis3445/PlaywrightFramework/commit/23af9b78be439b3eaf0f0faee3edd2fc6f6875b2))
- add login synthetic test ([847bb57](https://github.com/apis3445/PlaywrightFramework/commit/847bb57c131fc916aaa97002c2a0759574f510e6))
- Add synthetic testing ([a723114](https://github.com/apis3445/PlaywrightFramework/commit/a723114fd2b320e6f1350903dd9048160e2eb433))

# 0.5.0 (2024-03-09)

### Features

- add a pause and fix color description ([bc5bbba](https://github.com/apis3445/PlaywrightFramework/commit/bc5bbba7e9cfaf96f3d7dcf712b182ab4d2f28c9))
- add accessibility tool ([a605817](https://github.com/apis3445/PlaywrightFramework/commit/a605817e03e65198abd6aaff30081c86e928d40d))
- Add env variables to qase pipeline ([2bfae25](https://github.com/apis3445/PlaywrightFramework/commit/2bfae255aa403c40c7259a16de89133f7405f88f))

# 0.4.0 (2024-02-27)

### Bug Fixes

- change ci shard test pipeline to manual shard index ([f7c13b7](https://github.com/apis3445/PlaywrightFramework/commit/f7c13b7966880dc15a4c90c08dc286151f31d8a8))
- ci shard matrix name ([30e7831](https://github.com/apis3445/PlaywrightFramework/commit/30e78312d8979b9e960c4b3d504edc9662469b6c))
- increase general timeout and add retry ([5215c9d](https://github.com/apis3445/PlaywrightFramework/commit/5215c9d74e810dd974425f782ecbaf21e8291bb3))
- Increase timeout ([b8343ce](https://github.com/apis3445/PlaywrightFramework/commit/b8343ce465f3e5ed905953f16ddc0476b4d9bcd9))
- shard pipeline artifacts ([b9d6820](https://github.com/apis3445/PlaywrightFramework/commit/b9d68207d4aa8163a1edd960a590e74791e4bcf2))

### Features

- add lambdatest integration ([a751abe](https://github.com/apis3445/PlaywrightFramework/commit/a751abecee103ef600b83ef7a9d8b6837bf36306))

# 0.3.0 (2024-02-17)

### Bug Fixes

- add linux snapshot ([8e38d7f](https://github.com/apis3445/PlaywrightFramework/commit/8e38d7fadbaf341b7290d840764d140867a42548))
- add logs ([cf258c5](https://github.com/apis3445/PlaywrightFramework/commit/cf258c51804d42402a234b279de03e6dfb33a09a))
- add snapshots for firefox and safari ([ba2c263](https://github.com/apis3445/PlaywrightFramework/commit/ba2c263edd7a21432880c83ffaaf34a5302db117))
- effiziente urls in main pipeline ([9b0c01e](https://github.com/apis3445/PlaywrightFramework/commit/9b0c01e1d8d880f3f05fc263dbacfebfdb817ea9))
- fix ci pipeline ([59799a5](https://github.com/apis3445/PlaywrightFramework/commit/59799a59bb3d27416e02c39668e0cb3d61a039fb))
- fix effiziente base urls ([5d7c7b7](https://github.com/apis3445/PlaywrightFramework/commit/5d7c7b7f65053106aa956dac7a43ac2362b16974))
- fix mock up api ([a6559a1](https://github.com/apis3445/PlaywrightFramework/commit/a6559a13f358652e9b3d89c49988b70a76b39f72))
- fix qase pipeline user name ([5fb1200](https://github.com/apis3445/PlaywrightFramework/commit/5fb12009cf74a9810f4a76f7853c87feb3fed256))
- fix the dashboard go to page ([fe3902d](https://github.com/apis3445/PlaywrightFramework/commit/fe3902d2eaa9459d70bd4ab9f3f1be47d97a67b4))
- fix version for actions to update node deprecated version ([5c3a203](https://github.com/apis3445/PlaywrightFramework/commit/5c3a2030331e23f27419950aacbdb0845869f1e4))
- fix visual helper diff ratio ([1b9c982](https://github.com/apis3445/PlaywrightFramework/commit/1b9c9822883f730a3d1b58a9d4e8595310f14093))
- google go to test ([96bd780](https://github.com/apis3445/PlaywrightFramework/commit/96bd78085b815f12f4b30a3a649ce25ecb1d824b))
- Increase actions timeout ([e01d6ad](https://github.com/apis3445/PlaywrightFramework/commit/e01d6ad3c1c5c2be0de792dacb32f25eb2cc716e))
- Increase Dashboard page timeout ([76e100c](https://github.com/apis3445/PlaywrightFramework/commit/76e100cff03295cda9735f0b4642c666b7d99433))
- Increase general timeout ([1aac687](https://github.com/apis3445/PlaywrightFramework/commit/1aac6877e750efa5fac11557c4bb8952b5040252))
- Increase timeout ([2592136](https://github.com/apis3445/PlaywrightFramework/commit/25921366d37c8321fc52f9dceccd4fb17a5e4127))
- remove code commented ([5d45f16](https://github.com/apis3445/PlaywrightFramework/commit/5d45f1655fcf97541743bf7d35b4329b6914e59e))
- Remove extra folder and add log ([e0bec7d](https://github.com/apis3445/PlaywrightFramework/commit/e0bec7d6df3221755cc7d50b79597c0c0fb2d9c3))
- rename menus ([1a90d00](https://github.com/apis3445/PlaywrightFramework/commit/1a90d005d1c3da5e8ca08524ebc3d5a3e4f23cd5))
- shard pipeline user name ([91a55bd](https://github.com/apis3445/PlaywrightFramework/commit/91a55bd285b1168e77024df8398f0e8f5ba4b1ae))

### Features

- add visual testing ([e3e3280](https://github.com/apis3445/PlaywrightFramework/commit/e3e3280f0e55299f690d6bf1aff0292e71cee853))

# 0.2.0 (2024-02-09)

### Features

- Use API to log in with different users (admin, user) in https://effizientedemo.azurewebsites.net/AccountsReceivable/dashboard
- Test menu with Admin and normal user

# 0.1.0 (2024-02-02)

### Bug Fixes

- ESlint errors ([9311115](https://github.com/apis3445/PlaywrightFramework/commit/931111565196224f46ce3c910f85c329035f1e84))
- Fix default locale and pipeline ([4b5b6d4](https://github.com/apis3445/PlaywrightFramework/commit/4b5b6d45c596b2c9f363e745903c7f5911b0f959))
- Fix pipelines remove by browser ([9f1dd2c](https://github.com/apis3445/PlaywrightFramework/commit/9f1dd2c7a8bdc5bb9b268ed006f093ef257f8bf5))
- main pipeline ([2763a6b](https://github.com/apis3445/PlaywrightFramework/commit/2763a6b3805d7061a2c94b47ee696ba536153ae1))
- Main pipeline ([bdacbd5](https://github.com/apis3445/PlaywrightFramework/commit/bdacbd5e50035eaa3da6343ee046fd7d05049922))
- Qase pipeline ([20168f1](https://github.com/apis3445/PlaywrightFramework/commit/20168f1e080e4bdb4cede38ffe40ba698b9da417))
- Update package version ([88d0f71](https://github.com/apis3445/PlaywrightFramework/commit/88d0f71c96f9ad39882c1abc0cca144fd6c0a8a3))

### Features

- Add husky and eslint rules ([a7cca9d](https://github.com/apis3445/PlaywrightFramework/commit/a7cca9d4442a566f36afd960de7c4adb6cb88d62))
- add Junit Report, commitizen ([8e3473a](https://github.com/apis3445/PlaywrightFramework/commit/8e3473ab831d25c28cb63e83435ad329b04d90ce))
- Add Qase pipeline ([82647f9](https://github.com/apis3445/PlaywrightFramework/commit/82647f98940e6b5ae45b271383aa582e94301751))
- Install husky ([aa8a5b5](https://github.com/apis3445/PlaywrightFramework/commit/aa8a5b524048194bfc7667b912c81e1e24aa8f26))
