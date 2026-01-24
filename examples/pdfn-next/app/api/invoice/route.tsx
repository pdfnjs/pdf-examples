import { pdfn } from '@pdfn/react';
import Invoice from '@/pdfn-templates/invoice';

const client = pdfn(); // Auto-reads PDFN_API_KEY

export async function GET() {
  const { data, error } = await client.generate(<Invoice number="INV-2025-042" />);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(data.buffer, {
    headers: { 'Content-Type': 'application/pdf' },
  });
}
