import { test as base } from '@playwright/test';
import { SignInPage } from '../pages/SignInPage';
import { SidebarComponent } from '../pages/SidebarComponent';
import { DashboardPage } from '../pages/DashboardPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { NewProjectPage } from '../pages/NewProjectPage';
import { validCredentials } from '../data/test-data';


type Fixtures = {
  signInPage: SignInPage;
  sidebar: SidebarComponent;
  dashboardPage: DashboardPage;
  projectsPage: ProjectsPage;
  newProjectPage: NewProjectPage;
  signedInPage: void;
};

export const test = base.extend<Fixtures>({
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },

  sidebar: async ({ page }, use) => {
    await use(new SidebarComponent(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  projectsPage: async ({ page }, use) => {
    await use(new ProjectsPage(page));
  },

  newProjectPage: async ({ page }, use) => {
    await use(new NewProjectPage(page));
  },

  signedInPage: async ({ signInPage, dashboardPage }, use) => {
    await signInPage.goto();
    await signInPage.login(validCredentials.email, validCredentials.password);
    await dashboardPage.expectVisible();
    await use();
  },
});

export { expect } from '@playwright/test';
