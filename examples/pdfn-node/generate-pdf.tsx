// generate-pdf.tsx
import React from 'react';
import { generate } from '@pdfn/react';
import { writeFileSync } from 'fs';
import Invoice from './pdfn-templates/invoice';

async function main() {
  const pdf = await generate(<Invoice number="INV-2025-042" />);
  writeFileSync('invoice.pdf', pdf);
}
main();
