import { expect, type Locator, type Page } from '@playwright/test';

export class SidebarComponent {
  readonly projectsLink: Locator;
  readonly logoutButton: Locator;
  readonly dashboardLink: Locator;
  readonly settingsLink: Locator;

  constructor(page: Page) {
    this.projectsLink = page.getByTestId('sidebar-projects');
    this.logoutButton = page.getByTestId('logout-button');
    this.dashboardLink = page.getByRole('button', { name: 'Dashboard' });
    this.settingsLink = page.getByRole('button', { name: 'Settings' });
  }

  async goToProjects(): Promise<void> {
    await this.projectsLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  async expectVisible(): Promise<void> {
    await expect(this.projectsLink).toBeVisible();
  }
}
