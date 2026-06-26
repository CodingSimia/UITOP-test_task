import { test, expect } from './fixtures/pom-fixtures';
import { validCredentials, loginErrors, invalidEmailFormats } from './data/test-data';


test.describe('Sign In', () => {
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.goto();
  });

  test.describe('Positive scenarios', () => {
    test('applicant can sign in with valid credentials and lands on the dashboard', async ({
      signInPage,
      dashboardPage,
    }) => {
      await signInPage.login(validCredentials.email, validCredentials.password);

      await dashboardPage.expectVisible();
      await signInPage.expectNoErrorMessage();
    });

    test('applicant can log out and return to the sign-in page', async ({
      signInPage,
      dashboardPage,
      sidebar,
    }) => {
      await signInPage.login(validCredentials.email, validCredentials.password);
      await dashboardPage.expectVisible();

      await sidebar.logout();

      await expect(signInPage.heading).toBeVisible();
      await expect(signInPage.emailInput).toBeVisible();
      await expect(signInPage.passwordInput).toBeVisible();
    });

    test('session persists across a page reload while signed in', async ({
      page,
      signInPage,
      dashboardPage,
    }) => {
      // The app reads auth state from localStorage on mount (see
      // `authStorageKey` in src/App.tsx), so a reload should not bounce
      // an authenticated user back to the sign-in screen.
      await signInPage.login(validCredentials.email, validCredentials.password);
      await dashboardPage.expectVisible();

      await page.reload();

      await dashboardPage.expectVisible();
    });
  });

  test.describe('Negative scenarios', () => {
    test('wrong password shows invalid credentials error', async ({ signInPage, dashboardPage }) => {
      await signInPage.login(validCredentials.email, 'WrongPassword123!');

      await signInPage.expectErrorMessage(loginErrors.invalidCredentials);
      await expect(dashboardPage.heading).not.toBeVisible();
    });

    test('wrong email with correct password shows invalid credentials error', async ({
      signInPage,
    }) => {
      await signInPage.login('not-the-applicant@example.com', validCredentials.password);

      await signInPage.expectErrorMessage(loginErrors.invalidCredentials);
    });

    test('wrong email and password shows invalid credentials', async ({
    signInPage,
  }) => {
    await signInPage.login(
      'wrong@example.com',
      'WrongPassword123!'
    );

    await signInPage.expectErrorMessage(
      loginErrors.invalidCredentials
    );
  });

    test('correct credentials with mismatched case in email are rejected', async ({
      signInPage,
    }) => {
      // The app compares the trimmed email against the literal credential
      // string with no case-folding, so an uppercase variant of a valid
      // email is expected to behave like any other wrong credential.
      await signInPage.login(validCredentials.email.toUpperCase(), validCredentials.password);

      await signInPage.expectErrorMessage(loginErrors.invalidCredentials);
    });

    test('error message is replaced (not stacked) on a second failed attempt', async ({
      signInPage,
    }) => {
      await signInPage.login('', validCredentials.password);
      await signInPage.expectErrorMessage(loginErrors.emailRequired);

      await signInPage.login(validCredentials.email, 'WrongPassword123!');
      await signInPage.expectErrorMessage(loginErrors.invalidCredentials);

      // Exactly one error node should ever be present at a time.
      await expect(signInPage.errorMessage).toHaveCount(1);
    });

    test('successful login after a failed attempt clears the previous error', async ({
      signInPage,
      dashboardPage,
    }) => {
      await signInPage.login(validCredentials.email, 'WrongPassword123!');
      await signInPage.expectErrorMessage(loginErrors.invalidCredentials);

      await signInPage.login(validCredentials.email, validCredentials.password);

      await dashboardPage.expectVisible();
      await signInPage.expectNoErrorMessage();
    });
  });

  test.describe('Field validation', () => {
    test('empty email shows "Email is required."', async ({ signInPage }) => {
      await signInPage.login('', validCredentials.password);

      await signInPage.expectErrorMessage(loginErrors.emailRequired);
    });

    test('empty password shows "Password is required."', async ({ signInPage }) => {
      await signInPage.login(validCredentials.email, '');

      await signInPage.expectErrorMessage(loginErrors.passwordRequired);
    });

    test('submitting a completely empty form shows the email error first', async ({
      signInPage,
    }) => {
      // handleLogin checks email presence before password presence, so the
      // email message should win when both fields are empty.
      await signInPage.submit();

      await signInPage.expectErrorMessage(loginErrors.emailRequired);
    });

    for (const invalidEmail of invalidEmailFormats) {
      test(`invalid email format "${invalidEmail}" shows "Enter a valid email address."`, async ({
        signInPage,
      }) => {
        await signInPage.login(invalidEmail, validCredentials.password);

        await signInPage.expectErrorMessage(loginErrors.invalidEmailFormat);
      });
    }
  });
});
