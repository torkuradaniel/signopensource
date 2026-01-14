# Clinical Trial Enrollment

A Next.js (pages router) app that utilises Pandadoc API to build a document signing workflow for participants going through through trial selection. It uses PandaDoc API to create documents, check status, and send liability waiver documents.

## Features
- Multi-step enrollment flow with shared header/progress rail.
- Participant + guardian details collection.
- Eligibility screening and review summary.
- PandaDoc integration via API routes (create, status, send).

## Requirements
- Node.js 18+
- PandaDoc API credentials

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```bash
   PANDADOC_API_KEY=your_api_key
   PANDADOC_TEMPLATE_ID=your_template_id
   DEFAULT_RECIPIENT_EMAIL=d@torkura.com
   ```

## Run the app
```bash
npm run dev
```
The app will be available at the URL printed in the terminal (commonly `http://localhost:3000`).

## PandaDoc API routes
- Create document: `POST /api/pandadoc/create`
- Check status: `GET /api/pandadoc/status?documentId=...`
- Send document: `POST /api/pandadoc/send`

## PandaDoc APIs used
- Create a document from a template
- Send a document
- Get document status


### Default field mapping
The create endpoint maps form data to PandaDoc fields like:
- `Patient.Name`, `Patient.Email`, `Patient.Phone`
- `Guardian1.Name`, `Guardian2.Email`, etc.
- `Trial.Name`, `Trial.Site`, `Trial.Location`, `Trial.Packet`

Ensure your PandaDoc template uses these field names or pass a custom `fields` object in the request.

## Project structure
- UI entry: `pages/index.js`
- Shared UI components: `components/Enrollment/`
- PandaDoc API routes: `pages/api/pandadoc/`

## Notes
- If `recipients` is omitted when creating a document, the API will use the participant as `Patient` and guardians as `Guardian1`/`Guardian2` when their emails are present.
- `DEFAULT_RECIPIENT_EMAIL` is used only if the participant email is missing and `recipients` was not provided.
