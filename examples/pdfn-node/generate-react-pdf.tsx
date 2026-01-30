// generate-react-pdf.tsx
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { writeFileSync } from "fs";
import Invoice from "./react-pdf-templates/invoice";

async function main() {
  const buffer = await renderToBuffer(<Invoice number="INV-2025-042" />);

  writeFileSync("invoice-react-pdf.pdf", buffer);
  console.log("Generated invoice-react-pdf.pdf");
}
main();
