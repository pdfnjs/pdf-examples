// generate-pdf.tsx
import { pdfn } from '@pdfn/react';
import { writeFileSync } from 'fs';
import { config } from 'dotenv';
import Invoice from './pdfn-templates/invoice';

config({ path: '.env.local' });

const client = pdfn(); // Auto-reads PDFN_API_KEY, falls back to localhost:3456

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
  const { data, error } = await client.generate({
    react: <Invoice {...invoiceData} />,
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
