# AQA Candidate Task

## Test Target

- Website: `http://localhost:5173`
- Test Environment: Local Demo
- User: Applicant
- Email: `applicant@example.com`
- Password: `Password123!`

All test data in this app is fake and local. You may clear browser `localStorage` between test runs.

## Task 1: UI E2E Testing

Create an automated Playwright test suite for the local demo app.

### Sign In

Validate the sign-in flow.

Positive scenarios:

- Applicant can sign in with valid credentials.
- Applicant lands on the dashboard after successful sign-in.
- Applicant can log out and return to the sign-in page.

Negative scenarios and field validations:

- Empty email shows `Email is required.`
- Invalid email format shows `Enter a valid email address.`
- Empty password shows `Password is required.`
- Wrong credentials show `Invalid email or password.`

### Projects Navigation

- After signing in, navigate to Projects using the left-side menu.
- Validate that the Projects page is visible.
- Validate the seeded fake project cards:
  - `Garage Addition`
  - `Retail Renovation`
  - `Site Improvement`

### Custom Project Creation

Validate the `Create Custom Project` flow.

Required fields:

- Project name
- Jurisdiction
- Address line

Optional fields:

- Unit number
- Project description

Validation scenarios:

- Missing project name shows a validation error.
- Missing jurisdiction shows a validation error.
- Missing address line shows a validation error.
- Duplicate project name shows a validation error.

Successful scenario:

- Create a new custom project.
- Return to the Projects list after submit.
- Verify the created project is visible in the list with name, jurisdiction, address, status, created date, and progress.

### Mobile Coverage

Include 2-3 mobile device profiles in your Playwright coverage. Suggested devices:

  - iPhone 14
  - Pixel 7
  - Galaxy S9+

### Test Documentation

Prepare test documentation using `TEST_DOCUMENTATION_TEMPLATE.md`. Include:

- UI test cases
- API test cases
- Possible bugs
- Reproduction steps
- Expected vs actual results
- Screenshots or videos where useful
- Console or network errors if found
- Short summary

### GitHub Actions

Prepare a GitHub Actions `.yml` workflow that:

- Installs dependencies.
- Installs Playwright browsers.
- Runs the Playwright test suite.
- Uploads the Playwright report or test artifacts.

## Task 2: API Testing

Use the public API list at `https://automationexercise.com/api_list`.

Create at least 2 e2e API test cases:

- 1 positive API test case.
- 1 negative API test case.

Include these API tests in your test documentation with request details, expected status/body, actual result, and any observed issues.

## Bonus

Optional improvements:

- Cross-browser testing.
- Logging console and network errors during UI tests.
- Docker support for local test execution.
- Separate Docker-based CI workflow.
- Publish the Playwright report on GitHub Pages.
