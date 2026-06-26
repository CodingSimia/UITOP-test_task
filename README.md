# 🧪 AQA Playwright Test Suite (UI + API)

Automated test framework built with **Playwright + TypeScript**, covering UI end-to-end flows and API testing for a demo application.

---

## 👤 Project Info

- **Role:** QA Automation (Playwright / TypeScript)
- **Date:** 26.06.2026
- **Environment:** Local demo app + public API
- **Browsers:** Chromium, Firefox, WebKit
- **Mobile Emulation:** iPhone 14, Pixel 7, Galaxy S9+

---

## 🚀 Installation

### 1. Install dependencies
```bash
npm install
```

### 2. Install Playwright browsers
```bash
npx playwright install
```


## 🚀 Running Tests
### 1. Run all tests
```bash
npx playwright test
```

### 2. Run UI tests only
```bash
npx playwright test tests/e2e
```

### 3. Run API tests only
```bash
npx playwright test tests/api
```

### 4. Run a single test file
```bash
npx playwright test tests/api/api.spec.ts
```

### 5. Run tests in UI mode
```bash
npx playwright test --ui
```
