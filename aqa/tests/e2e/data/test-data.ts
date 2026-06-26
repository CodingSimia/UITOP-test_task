
export const validCredentials = {
  email: 'applicant@example.com',
  password: 'Password123!',
};

/** Error copy exactly as rendered by the app (see src/App.tsx handleLogin). */
export const loginErrors = {
  emailRequired: 'Email is required.',
  invalidEmailFormat: 'Enter a valid email address.',
  passwordRequired: 'Password is required.',
  invalidCredentials: 'Invalid email or password.',
};

/** Error copy exactly as rendered by the app (see src/App.tsx NewProjectScreen). */
export const projectFormErrors = {
  nameRequired: 'Project name is required.',
  jurisdictionRequired: 'Jurisdiction is required.',
  addressRequired: 'Address line is required.',
  duplicateName: 'Project name already exists.',
};

/** Strings that should be rejected by the app's email format check. */
export const invalidEmailFormats = [
  'plainstring',
  'missing-at-sign.com',
  'missing-domain@',
  '@missing-local.com',
  'two@at@signs.com',
];

/** Jurisdictions available in the "Create Custom Project" select. */
export const jurisdictions = ['Sample City', 'Example County', 'Demo Township'] as const;

/** The three records the app seeds into localStorage on first load. */
export const seededProjects = [
  {
    name: 'Garage Addition',
    address: '100 Example Ave, Unit 5',
    jurisdiction: 'Sample City',
    status: 'In Review',
  },
  {
    name: 'Retail Renovation',
    address: '42 Sample Street',
    jurisdiction: 'Example County',
    status: 'Draft',
  },
  {
    name: 'Site Improvement',
    address: '18 Demo Plaza',
    jurisdiction: 'Demo Township',
    status: 'Complete',
  },
] as const;


export function buildUniqueProject(overrides: Partial<NewProjectInput> = {}): NewProjectInput {
  const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 10_000)}`;

  return {
    name: `QA Automated Project ${uniqueSuffix}`,
    jurisdiction: jurisdictions[0],
    addressLine: '500 Automation Way',
    unitNumber: 'Suite 12',
    description: 'Created by an automated Playwright test.',
    ...overrides,
  };
}

export type NewProjectInput = {
  name: string;
  jurisdiction: string;
  addressLine: string;
  unitNumber?: string;
  description?: string;
};
