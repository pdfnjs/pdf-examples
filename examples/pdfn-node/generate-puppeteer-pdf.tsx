// generate-puppeteer-pdf.tsx
import React from 'react';
import { render } from '@pdfn/react';
import { writeFileSync } from 'fs';
import Invoice from './pdfn-templates/invoice';
import puppeteer from 'puppeteer';

async function main() {
  const html = await render(<Invoice number="INV-2025-042" />);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => window.PDFN?.ready === true); // Wait for pagination
  const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
  await browser.close();

  writeFileSync('invoice-puppeteer.pdf', pdf);
}
main();
