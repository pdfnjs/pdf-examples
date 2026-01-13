import type { NextConfig } from "next";
import { withPdfn } from '@pdfn/next';

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPdfn()(nextConfig);
