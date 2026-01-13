# pdfn + Node.js Example

A minimal Node.js setup demonstrating [pdfn](https://pdfn.dev) PDF generation.

## Features

- Basic `generate()` usage with `pdfn serve`
- Puppeteer integration with `render()`
- Invoice template example

## Setup

```bash
# Install dependencies
npm install
```

## Usage

### Using `generate()` (requires pdfn serve)

1. Start the pdfn server:

```bash
npx pdfn serve
```

2. Generate the PDF:

```bash
npm run generate
```

This creates `invoice.pdf` in the current directory.

### Using Puppeteer (bring your own browser)

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
