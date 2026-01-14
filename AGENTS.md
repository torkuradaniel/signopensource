# AGENTS.md

## Project overview
This is a Next.js (pages router) app for a clinical trial enrollment flow. The UI is a multi-step experience with shared layout/components and styled-components for styling. A backend API route integrates with PandaDoc to create and send consent documents.

## Frontend flow
- Entry page: `pages/index.js`
- Steps order: Select Trial -> Participant Details -> Screening -> Review -> Email Sent -> Done
- Shared UI:
  - Header: `components/Enrollment/EnrollmentHeader.js`
  - Progress/status rail: `components/Enrollment/ProgressRail.js`
  - Styles: `components/Enrollment/styles.js`
- Step components:
  - Select trial: `components/Enrollment/steps/SelectTrialStep.js`
  - Participant + guardian details: `components/Enrollment/steps/GuardianStep.js`
  - Screening: `components/Enrollment/steps/ScreeningStep.js`
  - Review: `components/Enrollment/steps/ReviewStep.js`
  - Email sent: `components/Enrollment/steps/EmailSentStep.js`
  - Done (status timeline): `components/Enrollment/steps/DoneStep.js`

## Data captured
- Participant: name, email, phone, street, city, state, postal code.
- Guardians: two guardian records, each with the same fields as the participant.
- Screening: age, condition yes/no, excluded meds yes/no.
- Trial: selected from a static list in `pages/index.js`.

## Validation and gating
- Guardian/participant step enforces all fields filled before Continue (no partials).
- Screening step requires eligibility rules to proceed.

## Backend API
- PandaDoc endpoints:
  - Create: `pages/api/pandadoc/create.js`
  - Status: `pages/api/pandadoc/status.js`
  - Send: `pages/api/pandadoc/send.js`
- Create builds a document from a template and returns the document id/status.
- Status returns the current PandaDoc document status.
- Send triggers email delivery for an existing document id.
- Env vars required:
  - `PANDADOC_API_KEY`
  - `PANDADOC_TEMPLATE_ID`
- Optional env var:
  - `DEFAULT_RECIPIENT_EMAIL` (fallback if participant email is missing and `recipients` is omitted)
- Default recipient roles (when `recipients` is omitted):
  - Patient: participant email/name
  - Guardian1/Guardian2: guardian emails/names when present
- Request payload includes participant, guardians, selectedTrial, and recipients.
- Field mapping is built for participant/guardian/trial fields; can be overridden by supplying `fields`.
  - Document status in the UI is driven by `/api/pandadoc/status` and polled every 30 minutes.

## How it works end-to-end
1. User selects a trial.
2. User enters participant + guardian info.
3. User completes screening; if eligible, continues.
4. User reviews details and creates a PandaDoc document.
5. App polls the PandaDoc status (every 60 minutes), waits for `document.draft`, then sends.
6. Email Sent step shows delivery messaging; user clicks Track Status to view the Done step timeline.

## Updating this file
Keep this document in sync with any changes to:
- Step order or step component locations.
- Required fields or validation rules.
- Backend endpoints, payloads, or environment variables.
- Data model for participant/guardian/trial/screening.
