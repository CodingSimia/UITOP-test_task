import { test } from './fixtures/pom-fixtures';
import { seededProjects } from './data/test-data';


test.describe('Projects navigation', () => {
  test('applicant can open Projects from the left-side menu', async ({
    signedInPage,
    sidebar,
    projectsPage,
  }) => {
    await sidebar.goToProjects();

    await projectsPage.expectVisible();
  });

  test('seeded demo projects are visible after navigating to Projects', async ({
    signedInPage,
    sidebar,
    projectsPage,
  }) => {
    await sidebar.goToProjects();
    await projectsPage.expectVisible();

    for (const project of seededProjects) {
      await projectsPage.expectProjectDetails({
        name: project.name,
        address: project.address,
        jurisdiction: project.jurisdiction,
        status: project.status,
      });
    }

    // Confirms no unexpected extra/missing cards beyond the three seeded ones.
    await projectsPage.expectProjectCount(seededProjects.length);
  });

  test('"Reset demo data" restores the three seeded projects after a custom project is created', async ({
    signedInPage,
    sidebar,
    projectsPage,
    newProjectPage,
  }) => {
    await sidebar.goToProjects();
    await projectsPage.openCreateProjectForm();
    await newProjectPage.createProject({
      name: `Temp Project ${Date.now()}`,
      jurisdiction: 'Sample City',
      addressLine: '1 Temp Lane',
    });
    await projectsPage.expectProjectCount(seededProjects.length + 1);

    await projectsPage.resetDemoData();

    await projectsPage.expectProjectCount(seededProjects.length);
    for (const project of seededProjects) {
      await projectsPage.expectProjectVisible(project.name);
    }
  });
});
