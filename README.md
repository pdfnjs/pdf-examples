# pdfn Examples

Example projects demonstrating [pdfn](https://pdfn.dev) - React-first, Chromium-based PDF generation with predictable pagination and Tailwind support.

## Examples

### [pdfn-node](./examples/pdfn-node)

Minimal Node.js setup for generating PDFs with pdfn.

- Basic `generate()` usage with pdfn Cloud or local dev server
- Puppeteer integration with `render()`
- Invoice template example

### [pdfn-next](./examples/pdfn-next)

Next.js + Tailwind CSS integration.

- API route for PDF generation
- Tailwind CSS styling
- `@pdfn/next` integration

## Getting Started

```bash
# Clone the repo
git clone https://github.com/pdfnjs/pdfn-examples.git
cd pdfn-examples

# Install dependencies
pnpm install

# Run development server for an example
pnpm dev --filter=pdfn-next
```

## Learn More

- [pdfn Documentation](https://pdfn.dev)
- [pdfn GitHub](https://github.com/pdfnjs/pdfn)
- [@pdfn/react](https://www.npmjs.com/package/@pdfn/react)
- [@pdfn/tailwind](https://www.npmjs.com/package/@pdfn/tailwind)
- [@pdfn/next](https://www.npmjs.com/package/@pdfn/next)

## License

MIT
