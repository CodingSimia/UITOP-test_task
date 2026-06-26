import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly heading: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'Applicant dashboard' });
  }

  async expectVisible(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }
}
