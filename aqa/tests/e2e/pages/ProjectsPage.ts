import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProjectsPage extends BasePage {
  readonly container: Locator;
  readonly createProjectButton: Locator;
  readonly resetDemoDataButton: Locator;
  readonly projectCards: Locator;
  readonly emptyStateHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.container = page.getByTestId('projects-page');
    this.createProjectButton = page.getByTestId('create-project-button').first();
    this.resetDemoDataButton = page.getByRole('button', { name: 'Reset demo data' });
    this.projectCards = page.getByTestId('project-card');
    this.emptyStateHeading = page.getByRole('heading', { name: 'No project templates yet' });
  }

  async expectVisible(): Promise<void> {
    await expect(this.container).toBeVisible();
  }

  async openCreateProjectForm(): Promise<void> {
    await this.createProjectButton.click();
  }

  async resetDemoData(): Promise<void> {
    await this.resetDemoDataButton.click();
  }

  /** Locates a single project card by its visible name (the <h3> heading). */
  cardByName(name: string): Locator {
    return this.projectCards.filter({
      has: this.page.getByRole('heading', { name, exact: true }),
    });
  }

  async expectProjectVisible(name: string): Promise<void> {
    await expect(this.cardByName(name)).toBeVisible();
  }

  async expectProjectCount(count: number): Promise<void> {
    await expect(this.projectCards).toHaveCount(count);
  }

  async expectProjectDetails(details: {
    name: string;
    address?: string;
    jurisdiction?: string;
    status?: string;
    description?: string;
  }): Promise<void> {
    const card = this.cardByName(details.name);
    await expect(card).toBeVisible();

    if (details.address) {
      await expect(card.getByText(details.address, { exact: false })).toBeVisible();
    }
    if (details.jurisdiction) {
      await expect(card.getByText(details.jurisdiction, { exact: true })).toBeVisible();
    }
    if (details.status) {
      await expect(card.getByText(details.status, { exact: true })).toBeVisible();
    }
    if (details.description) {
      await expect(card.getByText(details.description, { exact: false })).toBeVisible();
    }
  }
}
