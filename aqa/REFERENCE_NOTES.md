# AQA Demo Reference Notes

## Screens to Mimic

- Login page: centered authentication panel with email/password fields, submit action, account switch affordance, and password recovery link.
- Authenticated layout: left sidebar navigation with compact/expanded states, primary menu items, settings, notifications, and logout placement.
- Applicant dashboard: card-based entry points into key user workflows, including project access and application-related actions.
- Projects page: "My Project Templates" style list with create/explore actions, project cards, status badge, progress indicator, metadata, and empty state.
- Custom project creation: simple form with jurisdiction selector, project name, address/unit fields, validation summary, cancel/create actions, and clear custom-project context.
- Project creation behavior: authenticated/authorized create flow, project ownership assignment, basic strong-parameter shape, address save step, optional template-driven application creation, success redirect, and validation re-render.

## Reference Files Read

- External reference login views.
- External reference authenticated navigation views.
- External reference applicant dashboard view.
- External reference project list and project creation views.
- External reference project controller flow.
- External reference authentication locale messages.

## Do Not Copy

- Source-product logos, icon files, image assets, SVGs, or brand marks.
- Source-product color tokens, gradients, Tailwind aliases, or branded button classes.
- Real jurisdiction names, client names, applicant names, addresses, permits, applications, invoices, project templates, or contractor data.
- Internal or staging URLs.
- Internal route names, controller/module names, policy names, feature flags, Sentry details, or service object names as implementation contracts.
- Real authentication credentials, account roles, authorization rules, or production error wording beyond generic auth message tone.

## Safe Neutral Replacements

- Product name: `CivicFlow Demo`.
- Organization name: `Demo Permitting Office`.
- User examples: `applicant@example.com`, `Alex Demo`.
- Jurisdictions: `Sample City`, `Example County`, `Demo Township`.
- Addresses: `100 Example Ave`, `42 Sample Street`, `18 Demo Plaza`, `Unit 5`.
- Project names: `Garage Addition`, `Retail Renovation`, `Site Improvement`.
- Application labels: `Building Review`, `Planning Review`, `Public Works Review`.
- Statuses: `Draft`, `In Review`, `Complete`.
- Colors: use a neutral demo palette such as slate text/backgrounds with a generic teal accent (`#0F766E`) and standard gray borders. Do not reuse source-product color names or gradients.
- Copy tone: plain, generic SaaS wording. Authentication errors can follow the generic shape "Invalid email or password" and "Your session expired. Please sign in again."

## Implementation Boundary

This file is a reference map only. The AQA demo may mimic interaction patterns and screen structure, but implementation should be original and should use fake data, neutral styling, and demo-specific names.
