// generate-puppeteer-pdf.tsx
import React from 'react';
import { pdfn } from '@pdfn/react';
import { writeFileSync } from 'fs';
import { config } from 'dotenv';
import Invoice from './pdfn-templates/invoice';
import puppeteer from 'puppeteer';

config({ path: '.env.local' });

const client = pdfn();

// In production, you'd fetch this data from your database
const invoiceData = {
  number: "INV-2025-042",
  date: "February 1, 2025",
  dueDate: "March 1, 2025",
  customer: {
    name: "Acme Corporation",
    address: "456 Enterprise Blvd, Suite 100",
    city: "Austin, TX 78701",
  },
  items: [
    { name: "Web Development", description: "Frontend development with React", qty: 40, price: 150 },
    { name: "API Integration", description: "REST API setup and configuration", qty: 20, price: 175 },
  ],
  taxRate: 0.1,
  notes: "Payment is due within 30 days. Thank you for your business!",
  company: {
    name: "Your Company",
    address: "123 Business St, San Francisco, CA 94102",
    email: "hello@yourcompany.com",
    phone: "+1 (555) 123-4567",
  },
};

async function main() {
  // Render to HTML (no server needed)
  const { data, error } = await client.render({ react: <Invoice {...invoiceData} /> });

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
