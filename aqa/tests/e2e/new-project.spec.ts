import { test, expect } from './fixtures/pom-fixtures';
import { buildUniqueProject, jurisdictions, projectFormErrors, seededProjects } from './data/test-data';


test.describe('Create Custom Project', () => {
  test.beforeEach(async ({ signedInPage, sidebar, projectsPage, newProjectPage }) => {
    await sidebar.goToProjects();
    await projectsPage.openCreateProjectForm();
    await newProjectPage.expectVisible();
  });

  test.describe('Required field validation', () => {
    test('missing project name shows "Project name is required."', async ({ newProjectPage }) => {
      await newProjectPage.fillForm({
        jurisdiction: jurisdictions[0],
        addressLine: '123 No Name St',
      });

      await newProjectPage.submit();

      await newProjectPage.expectFormError(projectFormErrors.nameRequired);
    });

    test('missing jurisdiction shows "Jurisdiction is required."', async ({ newProjectPage }) => {
      await newProjectPage.fillForm({
        name: `No Jurisdiction Project ${Date.now()}`,
        addressLine: '123 No Jurisdiction St',
      });

      await newProjectPage.submit();

      await newProjectPage.expectFormError(projectFormErrors.jurisdictionRequired);
    });

    test('missing address line shows "Address line is required."', async ({ newProjectPage }) => {
      await newProjectPage.fillForm({
        name: `No Address Project ${Date.now()}`,
        jurisdiction: jurisdictions[0],
      });

      await newProjectPage.submit();

      await newProjectPage.expectFormError(projectFormErrors.addressRequired);
    });

    test('whitespace-only project name is treated as missing', async ({ newProjectPage }) => {
      // The app trims the name before checking it, mirroring the email
      // trim behavior on the sign-in form.
      await newProjectPage.fillForm({
        name: '   ',
        jurisdiction: jurisdictions[0],
        addressLine: '123 Whitespace St',
      });

      await newProjectPage.submit();

      await newProjectPage.expectFormError(projectFormErrors.nameRequired);
    });

    test('submitting a completely empty form surfaces the name error first', async ({
      newProjectPage,
    }) => {
      // handleSubmit checks name, then jurisdiction, then address line, so
      // the name message should win when everything is blank.
      await newProjectPage.submit();

      await newProjectPage.expectFormError(projectFormErrors.nameRequired);
    });

    test('duplicate project name (case-insensitive) shows "Project name already exists."', async ({
      newProjectPage,
    }) => {
      const existingProject = seededProjects[0];

      await newProjectPage.createProject({
        name: existingProject.name.toUpperCase(),
        jurisdiction: jurisdictions[0],
        addressLine: '999 Duplicate Test Ave',
      });

      await newProjectPage.expectFormError(projectFormErrors.duplicateName);
    });
  });

  test.describe('Optional fields', () => {
    test('project can be created without unit number or description', async ({
      newProjectPage,
      sidebar,
      projectsPage,
    }) => {
      const project = buildUniqueProject({ unitNumber: undefined, description: undefined });

      await newProjectPage.fillForm({
        name: project.name,
        jurisdiction: project.jurisdiction,
        addressLine: project.addressLine,
      });
      await newProjectPage.submit();

      await projectsPage.expectVisible();
      await projectsPage.expectProjectDetails({
        name: project.name,
        address: project.addressLine,
        jurisdiction: project.jurisdiction,
      });
    });

    test('unit number, when provided, is appended to the displayed address', async ({
      newProjectPage,
      projectsPage,
    }) => {
      const project = buildUniqueProject({ addressLine: '77 Optional Fields Rd', unitNumber: 'Apt 9' });

      await newProjectPage.createProject(project);

      await projectsPage.expectProjectDetails({
        name: project.name,
        address: `${project.addressLine}, ${project.unitNumber}`,
      });
    });

    test('description, when provided, is shown on the created project card', async ({
      newProjectPage,
      projectsPage,
    }) => {
      const project = buildUniqueProject({ description: 'A note added purely by an automated test.' });

      await newProjectPage.createProject(project);

      await projectsPage.expectProjectDetails({
        name: project.name,
        description: project.description,
      });
    });
  });

  test.describe('Successful creation', () => {
    test('valid submission returns to the Projects list and shows the new project', async ({
      newProjectPage,
      projectsPage,
    }) => {
      const project = buildUniqueProject();

      await newProjectPage.createProject(project);

      // Successful submission navigates back to the Projects screen.
      await projectsPage.expectVisible();
      await projectsPage.expectProjectDetails({
        name: project.name,
        address: `${project.addressLine}, ${project.unitNumber}`,
        jurisdiction: project.jurisdiction,
        description: project.description,
      });
    });

    test('newly created project starts in Draft status with 0% progress and is added to the top of the list', async ({
      newProjectPage,
      projectsPage,
    }) => {
      const project = buildUniqueProject();

      await newProjectPage.createProject(project);

      await projectsPage.expectProjectDetails({
        name: project.name,
        status: 'Draft',
      });

      const firstCard = projectsPage.projectCards.first();
      await expect(firstCard.getByRole('heading', { name: project.name })).toBeVisible();
      await expect(firstCard.getByText('0%', { exact: true })).toBeVisible();

      // Count grows by exactly one: the new project, on top of the three seeded ones.
      await projectsPage.expectProjectCount(seededProjects.length + 1);
    });

    test('cancelling the form returns to Projects without creating a project', async ({
      newProjectPage,
      projectsPage,
    }) => {
      await newProjectPage.fillForm(buildUniqueProject());

      await newProjectPage.cancel();

      await projectsPage.expectVisible();
      await projectsPage.expectProjectCount(seededProjects.length);
    });
  });
});
