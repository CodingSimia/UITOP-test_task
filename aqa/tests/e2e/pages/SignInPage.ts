import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignInPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly heading: Locator;
  readonly forgotPasswordButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('login-email');
    this.passwordInput = page.getByTestId('login-password');
    this.submitButton = page.getByTestId('login-submit');
    this.errorMessage = page.getByTestId('login-error');
    this.heading = page.getByRole('heading', { name: 'CivicFlow Demo' });
    this.forgotPasswordButton = page.getByRole('button', { name: 'Lost your password?' });
  }

  async goto(): Promise<void> {
    await this.openFresh();
    await expect(this.heading).toBeVisible();
  }

  async fillEmail(email: string): Promise<void> {
    // .fill() clears first, so this is safe to call multiple times per test.
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectNoErrorMessage(): Promise<void> {
    await expect(this.errorMessage).toHaveCount(0);
  }
}
