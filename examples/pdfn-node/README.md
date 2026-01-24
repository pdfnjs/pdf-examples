# pdfn + Node.js Example

A minimal Node.js setup demonstrating [pdfn](https://pdfn.dev) PDF generation.

## Features

- Basic `generate()` usage with pdfn Cloud or local dev server
- Puppeteer integration with `render()`
- Invoice template example

## Setup

```bash
# Install dependencies
npm install
```

## Usage

### Using pdfn Cloud

Set your API key:

```bash
export PDFN_API_KEY=pdfn_live_...
```

Generate the PDF:

```bash
npm run generate
```

This creates `invoice.pdf` in the current directory.

### Using Local Dev Server

1. Start the pdfn dev server:

```bash
npx pdfn dev
```

2. Generate the PDF (no API key needed):

```bash
npm run generate
```

### Using Puppeteer (self-hosted)

```bash
npm run generate:puppeteer
```

This creates `invoice-puppeteer.pdf` using Puppeteer directly.

## Project Structure

```
├── generate-pdf.tsx           # generate() example
├── generate-puppeteer-pdf.tsx # Puppeteer example
└── pdfn-templates/
    └── invoice.tsx            # Invoice PDF template
```

## Learn More

- [pdfn Documentation](https://pdfn.dev)
- [@pdfn/react](https://www.npmjs.com/package/@pdfn/react)
