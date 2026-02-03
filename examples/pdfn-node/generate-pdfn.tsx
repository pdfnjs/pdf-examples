// generate-pdf.tsx
import { pdfn } from '@pdfn/react';
import { writeFileSync } from 'fs';
import { config } from 'dotenv';
import Invoice from './pdfn-templates/invoice';

config({ path: '.env.local' });

const client = pdfn(); // Auto-reads PDFN_API_KEY, falls back to localhost:3456

async function main() {
  const { data, error } = await client.generate({
    react: <Invoice number="INV-2025-042" />,
    standard: 'PDF/A-2b'
  });

  if (error) {
    console.error(`[${error.code}] ${error.message}`);
    if (error.suggestion) {
      console.error(`Suggestion: ${error.suggestion}`);
    }
    process.exit(1);
  }

  writeFileSync('invoice-pdfn.pdf', data.buffer);
  console.log('Generated invoice-pdfn.pdf');
}
main();
