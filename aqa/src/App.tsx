import { useState } from 'react';
import type { FormEvent } from 'react';

type ProjectStatus = 'Draft' | 'In Review' | 'Complete';
type Screen = 'dashboard' | 'projects' | 'newProject' | 'settings';

type Project = {
  name: string;
  addressLine: string;
  unitNumber?: string;
  description?: string;
  jurisdiction: string;
  status: ProjectStatus;
  progress: number;
  applications: number;
  created: string;
};

type ProjectFormData = {
  name: string;
  jurisdiction: string;
  addressLine: string;
  unitNumber: string;
  description: string;
};

const credentials = {
  email: 'applicant@example.com',
  password: 'Password123!',
};

const authStorageKey = 'aqa-demo-authenticated';
const projectsStorageKey = 'aqa-demo-projects';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const jurisdictions = ['Sample City', 'Example County', 'Demo Township'];

const dashboardCards = [
  {
    title: 'Start a review',
    description: 'Create a new demo application packet and track completion.',
    action: 'New packet',
  },
  {
    title: 'Projects',
    description: 'Manage saved project templates and application collections.',
    action: 'Open projects',
  },
  {
    title: 'Fee estimate',
    description: 'Preview sample review fees for a proposed project.',
    action: 'Estimate',
  },
  {
    title: 'Settings',
    description: 'Review neutral demo account preferences and portal options.',
    action: 'View settings',
  },
];

const seededProjects: Project[] = [
  {
    name: 'Garage Addition',
    addressLine: '100 Example Ave',
    unitNumber: 'Unit 5',
    jurisdiction: 'Sample City',
    status: 'In Review',
    progress: 68,
    applications: 2,
    created: 'May 14, 2026',
  },
  {
    name: 'Retail Renovation',
    addressLine: '42 Sample Street',
    jurisdiction: 'Example County',
    status: 'Draft',
    progress: 25,
    applications: 1,
    created: 'May 10, 2026',
  },
  {
    name: 'Site Improvement',
    addressLine: '18 Demo Plaza',
    jurisdiction: 'Demo Township',
    status: 'Complete',
    progress: 100,
    applications: 3,
    created: 'May 2, 2026',
  },
];

const statusClass: Record<ProjectStatus, string> = {
  Draft: 'statusDraft',
  'In Review': 'statusReview',
  Complete: 'statusComplete',
};

export function App() {
  const [isSignedIn, setIsSignedIn] = useState(
    () => localStorage.getItem(authStorageKey) === 'true',
  );
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [savedProjects, setSavedProjects] = useState<Project[]>(loadProjects);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  function saveProjects(nextProjects: Project[]) {
    setSavedProjects(nextProjects);
    localStorage.setItem(projectsStorageKey, JSON.stringify(nextProjects));
  }

  function handleCreateProject(formData: ProjectFormData) {
    const project: Project = {
      name: formData.name.trim(),
      addressLine: formData.addressLine.trim(),
      unitNumber: formData.unitNumber.trim() || undefined,
      description: formData.description.trim() || undefined,
      jurisdiction: formData.jurisdiction,
      status: 'Draft',
      progress: 0,
      applications: 0,
      created: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    saveProjects([project, ...savedProjects]);
    setActiveScreen('projects');
  }

  function handleResetProjects() {
    saveProjects(seededProjects);
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setLoginError('Email is required.');
      return;
    }

    if (!emailPattern.test(normalizedEmail)) {
      setLoginError('Enter a valid email address.');
      return;
    }

    if (!password) {
      setLoginError('Password is required.');
      return;
    }

    if (
      normalizedEmail !== credentials.email ||
      password !== credentials.password
    ) {
      setLoginError('Invalid email or password.');
      return;
    }

    localStorage.setItem(authStorageKey, 'true');
    setLoginError('');
    setIsSignedIn(true);
    setActiveScreen('dashboard');
  }

  function handleLogout() {
    localStorage.removeItem(authStorageKey);
    setIsSignedIn(false);
    setActiveScreen('dashboard');
    setPassword('');
  }

  if (!isSignedIn) {
    return (
      <main className="loginPage">
        <section className="loginPanel" aria-labelledby="login-title">
          <div className="brandMark" aria-hidden="true">
            CF
          </div>
          <p className="eyebrow">Applicant portal</p>
          <h1 id="login-title">CivicFlow Demo</h1>
          <p className="loginCopy">
            A neutral public demo for candidate exercises. Use the fake
            applicant account below to enter the workspace.
          </p>
          <form className="loginForm" onSubmit={handleLogin} noValidate>
            <label>
              Email address
              <input
                data-testid="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label>
              Password
              <input
                data-testid="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {loginError && (
              <div
                className="loginError"
                data-testid="login-error"
                role="alert"
              >
                {loginError}
              </div>
            )}
            <button data-testid="login-submit" type="submit">
              Log in
            </button>
          </form>
          <button type="button" className="textButton">
            Lost your password?
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <section className="portalShell" aria-label="Applicant workspace">
        <aside className="sidebar">
          <div className="sidebarBrand">
            <span className="sidebarLogo">CF</span>
            <span>CivicFlow</span>
          </div>
          <nav aria-label="Primary navigation">
            <button
              type="button"
              aria-label="Dashboard"
              className={`navItem ${activeScreen === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveScreen('dashboard')}
            >
              <span>H</span>
              Dashboard
            </button>
            <button
              type="button"
              aria-label="Projects"
              data-testid="sidebar-projects"
              className={`navItem ${activeScreen === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveScreen('projects')}
            >
              <span>P</span>
              Projects
            </button>
            <button
              type="button"
              aria-label="Settings"
              className={`navItem ${activeScreen === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveScreen('settings')}
            >
              <span>S</span>
              Settings
            </button>
            <button
              type="button"
              aria-label="Log out"
              data-testid="logout-button"
              className="navItem"
              onClick={handleLogout}
            >
              <span>L</span>
              Log out
            </button>
          </nav>
          <div className="userStrip">
            <div className="avatar">AD</div>
            <div>
              <strong>Alex Demo</strong>
              <span>Applicant</span>
            </div>
          </div>
        </aside>

        <div className="workspace">
          <header className="topbar">
            <div>
              <p className="eyebrow">Demo Permitting Office</p>
              <h2>{screenTitle(activeScreen)}</h2>
            </div>
            <button
              type="button"
              className="secondaryButton"
              onClick={() => setActiveScreen('newProject')}
            >
              Create custom project
            </button>
          </header>

          {activeScreen === 'dashboard' && (
            <DashboardScreen onOpenProjects={() => setActiveScreen('projects')} />
          )}
          {activeScreen === 'projects' && (
            <ProjectsScreen
              onCreateProject={() => setActiveScreen('newProject')}
              onResetProjects={handleResetProjects}
              projects={savedProjects}
            />
          )}
          {activeScreen === 'newProject' && (
            <NewProjectScreen
              existingProjects={savedProjects}
              onCancel={() => setActiveScreen('projects')}
              onSubmit={handleCreateProject}
            />
          )}
          {activeScreen === 'settings' && <PlaceholderScreen title="Settings" />}
        </div>
      </section>
    </main>
  );
}

function loadProjects() {
  const rawProjects = localStorage.getItem(projectsStorageKey);

  if (!rawProjects) {
    localStorage.setItem(projectsStorageKey, JSON.stringify(seededProjects));
    return seededProjects;
  }

  try {
    const parsedProjects = JSON.parse(rawProjects) as Project[];
    return Array.isArray(parsedProjects) ? parsedProjects : seededProjects;
  } catch {
    return seededProjects;
  }
}

function screenTitle(screen: Screen) {
  const titles: Record<Screen, string> = {
    dashboard: 'Applicant dashboard',
    projects: 'Projects',
    newProject: 'New project',
    settings: 'Settings',
  };

  return titles[screen];
}

function DashboardScreen({ onOpenProjects }: { onOpenProjects: () => void }) {
  return (
    <section className="dashboardGrid" aria-label="Dashboard actions">
      {dashboardCards.map((card) => (
        <article className="actionCard" key={card.title}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <button
            type="button"
            onClick={card.title === 'Projects' ? onOpenProjects : undefined}
          >
            {card.action}
          </button>
        </article>
      ))}
    </section>
  );
}

function ProjectsScreen({
  onCreateProject,
  onResetProjects,
  projects,
}: {
  onCreateProject: () => void;
  onResetProjects: () => void;
  projects: Project[];
}) {
  return (
    <section className="projectsSection" data-testid="projects-page">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Project templates</p>
          <h2>My Project Templates</h2>
        </div>
        <div className="buttonRow">
          <button
            type="button"
            className="secondaryButton"
            data-testid="create-project-button"
            onClick={onCreateProject}
          >
            Create Custom Project
          </button>
          <button type="button" className="secondaryButton" onClick={onResetProjects}>
            Reset demo data
          </button>
          <button type="button">Explore Templates</button>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="projectGrid">
          {projects.map((project) => (
            <article className="projectCard" data-testid="project-card" key={project.name}>
              <div className="cardHeader">
                <h3>{project.name}</h3>
                <span className={statusClass[project.status]}>{project.status}</span>
              </div>
              <p className="muted">{formatProjectAddress(project)}</p>
              <p className="jurisdiction">{project.jurisdiction}</p>
              {project.description && <p className="projectDescription">{project.description}</p>}
              <div className="progressLabel">
                <span>Progress</span>
                <strong>{project.progress}%</strong>
              </div>
              <div className="progressTrack">
                <span style={{ width: `${project.progress}%` }} />
              </div>
              <div className="cardMeta">
                <span>{project.applications} applications</span>
                <span>Created {project.created}</span>
              </div>
              <button type="button" className="textButton">
                View details
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="emptyState">
          <h2>No project templates yet</h2>
          <p>You can create a custom project or reset demo data for the seeded examples.</p>
          <div className="buttonRow centeredActions">
            <button
              type="button"
              className="secondaryButton"
              data-testid="create-project-button"
              onClick={onCreateProject}
            >
              Create Custom Project
            </button>
            <button type="button" onClick={onResetProjects}>
              Reset demo data
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function NewProjectScreen({
  existingProjects,
  onCancel,
  onSubmit,
}: {
  existingProjects: Project[];
  onCancel: () => void;
  onSubmit: (formData: ProjectFormData) => void;
}) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    jurisdiction: '',
    addressLine: '',
    unitNumber: '',
    description: '',
  });
  const [formError, setFormError] = useState('');

  function updateField(field: keyof ProjectFormData, value: string) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = formData.name.trim();
    const addressLine = formData.addressLine.trim();

    if (!name) {
      setFormError('Project name is required.');
      return;
    }

    if (!formData.jurisdiction) {
      setFormError('Jurisdiction is required.');
      return;
    }

    if (!addressLine) {
      setFormError('Address line is required.');
      return;
    }

    const hasDuplicateName = existingProjects.some(
      (project) => project.name.toLowerCase() === name.toLowerCase(),
    );

    if (hasDuplicateName) {
      setFormError('Project name already exists.');
      return;
    }

    setFormError('');
    onSubmit(formData);
  }

  return (
    <section className="formPanel" aria-labelledby="create-project">
      <div>
        <p className="eyebrow">Custom project</p>
        <h2 id="create-project">Create Custom Project</h2>
        <p>Create a project and add sample application reviews as needed.</p>
      </div>
      <form className="projectForm" onSubmit={handleSubmit} noValidate>
        <label>
          Jurisdiction
          <select
            data-testid="project-jurisdiction"
            value={formData.jurisdiction}
            onChange={(event) => updateField('jurisdiction', event.target.value)}
          >
            <option value="">Select a jurisdiction</option>
            {jurisdictions.map((jurisdiction) => (
              <option key={jurisdiction} value={jurisdiction}>
                {jurisdiction}
              </option>
            ))}
          </select>
        </label>
        <label>
          Project name
          <input
            data-testid="project-name"
            placeholder="Enter a descriptive project name"
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>
        <label>
          Address line
          <input
            data-testid="project-address"
            placeholder="100 Example Ave"
            value={formData.addressLine}
            onChange={(event) => updateField('addressLine', event.target.value)}
          />
        </label>
        <label>
          Unit number
          <input
            data-testid="project-unit"
            placeholder="Unit 5"
            value={formData.unitNumber}
            onChange={(event) => updateField('unitNumber', event.target.value)}
          />
        </label>
        <label className="fullWidthField">
          Project description
          <textarea
            data-testid="project-description"
            placeholder="Optional notes for this project"
            value={formData.description}
            onChange={(event) => updateField('description', event.target.value)}
          />
        </label>
        {formError && (
          <div className="loginError" data-testid="project-form-error" role="alert">
            {formError}
          </div>
        )}
        <div className="notice">
          This demo creates neutral sample records only. No real permit,
          customer, or jurisdiction data is used.
        </div>
        <div className="formActions">
          <button type="button" className="secondaryButton" onClick={onCancel}>
            Cancel
          </button>
          <button data-testid="project-submit" type="submit">
            Create Project
          </button>
        </div>
      </form>
    </section>
  );
}

function formatProjectAddress(project: Project) {
  return [project.addressLine, project.unitNumber].filter(Boolean).join(', ');
}

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <section className="emptyState" aria-labelledby={`${title.toLowerCase()}-title`}>
      <p className="eyebrow">Demo area</p>
      <h2 id={`${title.toLowerCase()}-title`}>{title}</h2>
      <p>This section is intentionally minimal for the candidate demo scope.</p>
    </section>
  );
}
