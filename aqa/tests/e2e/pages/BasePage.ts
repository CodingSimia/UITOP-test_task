import type { Page } from '@playwright/test';


export class BasePage {
  constructor(protected readonly page: Page) {}

  async openFresh(): Promise<void> {
    await this.page.goto('/');
    await this.page.evaluate(() => window.localStorage.clear());
    await this.page.reload();
  }
}
