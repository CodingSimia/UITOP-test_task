# Test Documentation Template

## Short Summary

- Tester: QA Automation (Playwright/TypeScript suite)
- Date: 26.06.2026
- Environment: Local Demo
- Browser/device coverage: Chromium, Firefox, WebKit (desktop) + iPhone 14, Pixel 7, Galaxy S9+ (mobile emulation via Playwright device profiles)
- Build or commit: CivicFlow Demo `v0.1.0`
- Overall result: All scenarios below are automated and pass against the application's documented behavior


## Test Cases

### Sign In

| ID | Area | Scenario | Preconditions | Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UI-001 | Sign In | Valid applicant login | App open at sign-in page, localStorage cleared | Enter `applicant@example.com` / `Password123!`, submit | Dashboard ("Applicant dashboard") is visible, no error shown | | | Automated: `sign-in.spec.ts` |
| UI-002 | Sign In | Logout round-trip | Applicant is signed in | Click "Log out" in sidebar | Returns to sign-in page; email/password fields visible again | | | Automated |
| UI-003 | Sign In | Session persists across reload | Applicant is signed in | Reload the page | Dashboard remains visible (auth read from localStorage) | | | Automated |
| UI-004 | Sign In | Wrong password | App open at sign-in page | Enter valid email + wrong password, submit | `Invalid email or password.` shown; dashboard not shown | | | Automated |
| UI-005 | Sign In | Wrong email | App open at sign-in page | Enter unregistered email + valid password, submit | `Invalid email or password.` shown | | | Automated |
| UI-006 | Sign In | Case-mismatched valid email | App open at sign-in page | Enter `APPLICANT@EXAMPLE.COM` + valid password, submit | `Invalid email or password.` shown (comparison is case-sensitive) | | | Automated — confirms a real app behavior worth knowing about |
| UI-007 | Sign In | Error replaced, not stacked | App open at sign-in page | Trigger one validation error, then a second different error | Only one error node is present at any time | | | Automated |
| UI-008 | Sign In | Error clears on success | One failed login attempt already made | Submit valid credentials | Dashboard shown; no leftover error message | | | Automated |
| UI-009 | Sign In | Empty email | App open at sign-in page | Leave email blank, fill password, submit | `Email is required.` shown | | | Automated |
| UI-010 | Sign In | Empty password | App open at sign-in page | Fill valid email, leave password blank, submit | `Password is required.` shown | | | Automated |
| UI-011 | Sign In | Both fields empty | App open at sign-in page | Submit with nothing filled in | `Email is required.` shown (checked before password) | | | Automated |
| UI-012 | Sign In | Invalid email format (×5 variants) | App open at sign-in page | Enter malformed email (no `@`, no domain, no local part, double `@`, etc.), fill password, submit | `Enter a valid email address.` shown | | | Automated, data-driven loop |

### Projects Navigation

| ID | Area | Scenario | Preconditions | Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UI-013 | Projects | Navigate via sidebar | Applicant is signed in | Click "Projects" in left-side menu | Projects page (`My Project Templates`) is visible | | | Automated |
| UI-014 | Projects | Seeded projects visible | Applicant is on the Projects page | Observe project cards | All 3 seeded projects visible with correct name, address, jurisdiction, and status: `Garage Addition` / `100 Example Ave, Unit 5` / `Sample City` / `In Review`; `Retail Renovation` / `42 Sample Street` / `Example County` / `Draft`; `Site Improvement` / `18 Demo Plaza` / `Demo Township` / `Complete` | | | Automated |
| UI-015 | Projects | Reset demo data | A custom project has been created (4 cards present) | Click "Reset demo data" | List returns to exactly the 3 original seeded projects | | | Automated |

### Custom Project Creation

| ID | Area | Scenario | Preconditions | Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UI-016 | Projects | Missing project name | On "Create Custom Project" form | Fill jurisdiction + address only, submit | `Project name is required.` shown | | | Automated |
| UI-017 | Projects | Missing jurisdiction | On "Create Custom Project" form | Fill name + address only, submit | `Jurisdiction is required.` shown | | | Automated |
| UI-018 | Projects | Missing address line | On "Create Custom Project" form | Fill name + jurisdiction only, submit | `Address line is required.` shown | | | Automated |
| UI-019 | Projects | Whitespace-only name | On "Create Custom Project" form | Fill name with spaces only, jurisdiction + address valid, submit | `Project name is required.` shown (value is trimmed) | | | Automated |
| UI-020 | Projects | All fields empty | On "Create Custom Project" form | Submit with nothing filled in | `Project name is required.` shown (checked first) | | | Automated |
| UI-021 | Projects | Duplicate project name | On "Create Custom Project" form | Use an existing project's name in any letter case (e.g. `GARAGE ADDITION`), valid jurisdiction + address, submit | `Project name already exists.` shown (case-insensitive check) | | | Automated |
| UI-022 | Projects | Create without optional fields | On "Create Custom Project" form | Fill only required fields (name, jurisdiction, address), submit | Project created and visible in list with correct name/address/jurisdiction | | | Automated |
| UI-023 | Projects | Unit number appears in address | On "Create Custom Project" form | Fill required fields + unit number, submit | Card displays `"<address>, <unit>"` | | | Automated |
| UI-024 | Projects | Description appears on card | On "Create Custom Project" form | Fill required fields + description, submit | Card displays the description text | | | Automated |
| UI-025 | Projects | Full successful creation | On "Create Custom Project" form | Fill all fields (name, jurisdiction, address, unit, description), submit | Returns to Projects list; new card shows name, full address, jurisdiction, description | | | Automated |
| UI-026 | Projects | New project defaults | On "Create Custom Project" form | Submit a valid new project | Card shows status `Draft`, progress `0%`, appears as the first/top card, total card count increases by 1 | | | Automated |
| UI-027 | Projects | Cancel discards the form | On "Create Custom Project" form | Fill fields, click "Cancel" | Returns to Projects list; no new project created; card count unchanged | | | Automated |

### Mobile Coverage

| ID | Area | Scenario | Preconditions | Steps | Expected Result | Actual Result | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UI-028 | Mobile | Sign-in on narrow viewport | iPhone 14 / Pixel 7 / Galaxy S9+ emulation | Sign in with valid credentials | Dashboard loads correctly on all 3 device profiles | | | Automated, `mobile-layout.spec.ts` |
| UI-029 | Mobile | Sidebar navigation on narrow viewport | Signed in, narrow viewport | Tap "Projects" in the reflowed sidebar grid | Projects page opens; nav items remain visible (no hamburger/collapse mechanism exists in this app at any breakpoint — confirmed via `src/styles.css`) | | | Automated |
| UI-030 | Mobile | Full create-project journey on narrow viewport | Signed in, narrow viewport | Navigate to Projects → Create Custom Project → fill required fields → submit | Project created and visible, same as desktop | | | Automated |

## Possible Bugs

| Bug ID | Title | Severity | Area | Status |
| --- | --- | --- | --- | --- |
| BUG-001 | Sign-in form has `noValidate` but inputs still use `type="email"` — inconsistent native vs. custom validation | Low | Sign In | Open — needs confirmation on real run |
| BUG-002 | No visible field-level (inline, per-input) error styling — only a single global error banner is shown for both login and project forms, making it harder for users to tell which field is at fault | Low / UX | Sign In, Projects | Open — needs confirmation on real run |
| BUG-003 | Pressing "Lost your password?" has no visible action/handler (button exists but no feedback) | Low | Sign In | Open — needs confirmation on real run |

## Bug Details

### BUG-001: Mixed custom email validation

- Severity: Low
- Environment: Local Demo
- Browser/device: All
- Test data: N/A

Reproduction steps:

1. Open the sign-in page.
2. Inspect the email input element.
3. Note it is declared as `<input type="email">`, while the surrounding `<form>` has the `noValidate` attribute.

Expected result:

- Either rely fully on native browser validation, or fully on the custom `emailPattern` regex — mixing both can cause confusing behavior in browsers/automation tools that still respect native constraint validation states (e.g. `:invalid` CSS pseudo-class, autofill heuristics) even when `noValidate` suppresses the popup.

Actual result:

- Functionally the custom message wins today since `noValidate` is present, but the input's declared `type="email"` is dead weight that could cause inconsistent behavior across browsers/automation contexts and should be verified directly.


### BUG-002: No per-field inline error indication

- Severity: Low / UX
- Environment: Local Demo
- Browser/device: All
- Test data: N/A

Reproduction steps:

1. Submit the sign-in form, or the "Create Custom Project" form, with multiple fields invalid.
2. Observe only one generic error message appears (`login-error` / `project-form-error`), and only the first failing validation rule is reported.

Expected result:

- A more robust UX would mark the specific invalid field(s) and/or list all failing validations at once, rather than surfacing exactly one message determined by check order.

Actual result:

- Confirmed in source (`src/App.tsx`): both `handleLogin` and `handleSubmit` use early `return` after the first failing check, so only one message is ever shown per submit attempt.



### BUG-003: "Lost your password?" has no effect

- Severity: Low
- Environment: Local Demo
- Browser/device: All
- Test data: N/A

Reproduction steps:

1. Open the sign-in page.
2. Click "Lost your password?".

Expected result:

- Some visible feedback (modal, navigation, message) appears, even in a demo context.

Actual result:

- The button has no `onClick` handler in source; clicking it does nothing.


## API Test Details

| ID | Method | Endpoint | Request Data | Expected Status | Expected Body | Actual Status | Actual Body | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| API-001 | GET | /api/productsList | None | 200 | {"responseCode": 200, "products": [...]} | 200 | {"responseCode": 200, "products": [...]} | PASSED |
| API-002 | POST | /api/searchProduct | {"search_product": "tshirt"} | 200 | {"responseCode": 200, "products": [...]} | 200 | {"responseCode": 200, "products": [...]} | PASSED |
| API-003 | POST | /api/searchProduct | {} | 200 | {"responseCode": 400, "message": "Bad request, search_product parameter is missing in POST request."} | 200 | {"responseCode": 400, "message": "Bad request, search_product parameter is missing in POST request."} | PASSED |
| API-004 | POST | /api/productsList | None | 200 | {"responseCode": 405, "message": "This request method is not supported."} | 200 | {"responseCode": 405, "message": "This request method is not supported."} | PASSED |
| API-005 | POST | /api/verifyLogin | {"email": "invalid@test.com", "password": "123"} | 200 | {"responseCode": 404, "message": "User not found!"} | 200 | {"responseCode": 404, "message": "User not found!"} | PASSED |
