import { expect, test } from '@playwright/test';

test.describe('starter smoke test', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
  });

  test('app opens on the sign-in page', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'CivicFlow Demo' })).toBeVisible();
    await expect(page.getByTestId('login-email')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();
  });
});
