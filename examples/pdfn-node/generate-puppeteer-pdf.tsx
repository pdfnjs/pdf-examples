// generate-puppeteer-pdf.tsx
import React from 'react';
import { pdfn } from '@pdfn/react';
import { writeFileSync } from 'fs';
import { config } from 'dotenv';
import Invoice from './pdfn-templates/invoice';
import puppeteer from 'puppeteer';

config({ path: '.env.local' });

const client = pdfn();

async function main() {
  // Render to HTML (no server needed)
  const { data, error } = await client.render({ react: <Invoice number="INV-2025-042" /> });

  if (error) {
    console.error(`[${error.code}] ${error.message}`);
    process.exit(1);
  }

  // Convert to PDF with Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(data.html, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => window.PDFN?.ready === true);
  const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
  await browser.close();

  writeFileSync('invoice-selfhost-pdfn.pdf', pdf);
  console.log('Generated invoice-selfhost-pdfn.pdf');
}
main();
