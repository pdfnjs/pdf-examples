import { generate } from '@pdfn/react';
import Invoice from '@/pdfn-templates/invoice';

export async function GET() {
  const pdf = await generate(<Invoice number="INV-2025-042" />);
  return new Response(new Uint8Array(pdf), { headers: { 'Content-Type': 'application/pdf' } });
}
