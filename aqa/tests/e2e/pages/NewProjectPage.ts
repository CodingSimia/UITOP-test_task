import { expect, type Locator, type Page } from '@playwright/test';
import type { NewProjectInput } from '../data/test-data';

export class NewProjectPage {
  readonly heading: Locator;
  readonly jurisdictionSelect: Locator;
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly unitInput: Locator;
  readonly descriptionInput: Locator;
  readonly formError: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { name: 'Create Custom Project' });
    this.jurisdictionSelect = page.getByTestId('project-jurisdiction');
    this.nameInput = page.getByTestId('project-name');
    this.addressInput = page.getByTestId('project-address');
    this.unitInput = page.getByTestId('project-unit');
    this.descriptionInput = page.getByTestId('project-description');
    this.formError = page.getByTestId('project-form-error');
    this.submitButton = page.getByTestId('project-submit');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async expectVisible(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async fillAddress(addressLine: string): Promise<void> {
    await this.addressInput.fill(addressLine);
  }

  async fillUnit(unitNumber: string): Promise<void> {
    await this.unitInput.fill(unitNumber);
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionInput.fill(description);
  }

  async selectJurisdiction(jurisdiction: string): Promise<void> {
    await this.jurisdictionSelect.selectOption(jurisdiction);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  /** Fills every provided field, leaving omitted ones untouched/blank. */
  async fillForm(data: Partial<NewProjectInput>): Promise<void> {
    if (data.jurisdiction !== undefined) {
      await this.selectJurisdiction(data.jurisdiction);
    }
    if (data.name !== undefined) {
      await this.fillName(data.name);
    }
    if (data.addressLine !== undefined) {
      await this.fillAddress(data.addressLine);
    }
    if (data.unitNumber !== undefined) {
      await this.fillUnit(data.unitNumber);
    }
    if (data.description !== undefined) {
      await this.fillDescription(data.description);
    }
  }

  /** Happy-path helper: fill the full form and submit in one call. */
  async createProject(data: NewProjectInput): Promise<void> {
    await this.fillForm(data);
    await this.submit();
  }

  async expectFormError(message: string): Promise<void> {
    await expect(this.formError).toBeVisible();
    await expect(this.formError).toHaveText(message);
  }
}
