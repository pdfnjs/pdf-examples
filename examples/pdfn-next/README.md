# pdfn + Next.js Example

A Next.js application demonstrating [pdfn](https://pdfn.dev) integration with Tailwind CSS.

## Features

- Next.js 16 with App Router
- Tailwind CSS 4 styling
- API route for PDF generation
- Invoice template with `@pdfn/tailwind`

## Setup

```bash
# Install dependencies
pnpm install
```

## Usage

### Using pdfn Cloud

Set your API key:

```bash
export PDFN_API_KEY=pdfn_live_...
```

Start the Next.js app:

```bash
pnpm dev
```

Visit `http://localhost:3000/api/invoice` to download a generated PDF.

### Using Local Dev Server

1. Start the pdfn dev server in a separate terminal:

```bash
npx pdfn dev
```

2. Start the Next.js app (no API key needed):

```bash
pnpm dev
```

3. Visit `http://localhost:3000/api/invoice` to download a generated PDF.

## Project Structure

```
├── app/
│   ├── api/invoice/       # API route for PDF generation
│   ├── layout.tsx
│   └── page.tsx
├── pdfn-templates/
│   └── invoice.tsx        # Invoice PDF template
└── next.config.ts         # withPdfn() integration
```

## Learn More

- [pdfn Documentation](https://pdfn.dev)
- [@pdfn/next](https://www.npmjs.com/package/@pdfn/next)
- [@pdfn/tailwind](https://www.npmjs.com/package/@pdfn/tailwind)
