// generate-react-pdf.tsx
import { renderToBuffer } from "@react-pdf/renderer";
import { writeFileSync } from 'fs';
import Invoice from "./react-pdf-templates/invoice";

async function main() {
  try {
    const buffer = await renderToBuffer(<Invoice number="INV-2025-042" />);

    writeFileSync("invoice-react-pdf.pdf", buffer);
    console.log("Generated invoice-react-pdf.pdf");
  } catch (error) {
    console.error("Failed to generate PDF:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
main();
