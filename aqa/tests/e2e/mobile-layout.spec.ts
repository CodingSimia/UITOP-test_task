import { test, expect } from './fixtures/pom-fixtures';
import { validCredentials } from './data/test-data';


test.describe('Mobile layout', () => {
  test.beforeEach(({ isMobile }) => {
    test.skip(!isMobile, 'Layout-specific checks only apply to mobile viewports.');
  });

  test('sign-in form is usable and the dashboard loads on a narrow viewport', async ({
    signInPage,
    dashboardPage,
  }) => {
    await signInPage.goto();
    await expect(signInPage.emailInput).toBeVisible();
    await expect(signInPage.passwordInput).toBeVisible();

    await signInPage.login(validCredentials.email, validCredentials.password);

    await dashboardPage.expectVisible();
  });

  test('sidebar navigation items remain visible and tappable on a narrow viewport', async ({
    signedInPage,
    sidebar,
    projectsPage,
  }) => {
    // On screens <= 720px the sidebar nav reflows into a 4-column grid
    // (see .sidebar nav in styles.css) instead of disappearing behind a
    // hamburger menu, so the Projects link should stay directly clickable.
    await sidebar.expectVisible();

    await sidebar.goToProjects();

    await projectsPage.expectVisible();
  });

  test('full create-project journey completes on a narrow viewport', async ({
    signedInPage,
    sidebar,
    projectsPage,
    newProjectPage,
  }) => {
    await sidebar.goToProjects();
    await projectsPage.openCreateProjectForm();
    await newProjectPage.expectVisible();

    await newProjectPage.createProject({
      name: `Mobile Project ${Date.now()}`,
      jurisdiction: 'Sample City',
      addressLine: '1 Mobile Test Way',
    });

    await projectsPage.expectVisible();
  });
});
