import { pdfn } from '@pdfn/react';
import Invoice from '@/pdfn-templates/invoice';

const client = pdfn(); // Auto-reads PDFN_API_KEY

export async function GET() {
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

  const { data, error } = await client.generate({ react: <Invoice {...invoiceData} /> });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(data.buffer, {
    headers: { 'Content-Type': 'application/pdf' },
  });
}
