import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

interface InvoiceProps {
  number?: string;
  date?: string;
  dueDate?: string;
  customer?: { name: string; address: string; city: string };
  items?: Array<{ name: string; description?: string; qty: number; price: number }>;
  taxRate?: number;
  notes?: string;
  company?: { name: string; address: string; email: string; phone: string };
}

const defaults = {
  number: "INV-2025-001",
  date: "January 15, 2025",
  dueDate: "February 14, 2025",
  customer: { name: "Acme Corporation", address: "456 Enterprise Blvd, Suite 100", city: "Austin, TX 78701" },
  items: [
    { name: "Web Development", description: "Frontend development with React", qty: 40, price: 150 },
    { name: "API Integration", description: "REST API setup and configuration", qty: 20, price: 175 },
    { name: "UI/UX Design", description: "User interface design", qty: 15, price: 125 },
  ],
  taxRate: 0.1,
  notes: "Payment is due within 30 days. Thank you for your business!",
  company: { name: "Your Company", address: "123 Business St, San Francisco, CA 94102", email: "hello@yourcompany.com", phone: "+1 (555) 123-4567" },
} satisfies Required<InvoiceProps>;

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const s = StyleSheet.create({
  page: { padding: 72, fontSize: 12, fontFamily: "Helvetica", color: "#111827" },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 },
  companyName: { fontSize: 24, fontFamily: "Helvetica-Bold", color: "#111827" },
  companyAddress: { fontSize: 10, color: "#6b7280", marginTop: 4 },
  invoiceTitle: { fontSize: 30, fontFamily: "Helvetica-Bold", color: "#111827", letterSpacing: -0.5, textAlign: "right" },
  invoiceNumber: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#4b5563", marginTop: 4, textAlign: "right" },

  detailsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 32 },
  sectionLabel: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#6b7280", textTransform: "uppercase", marginBottom: 8 },
  customerName: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#111827" },
  customerDetail: { fontSize: 14, color: "#4b5563", marginTop: 2 },
  detailRight: { alignItems: "flex-end" },
  detailLine: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 2 },
  detailLabel: { fontSize: 14, color: "#6b7280", marginRight: 16 },
  detailValue: { fontSize: 14, color: "#111827", width: 130, textAlign: "right" },
  amountDueLabel: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#6b7280", marginRight: 16 },
  amountDueValue: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#111827", width: 130, textAlign: "right" },

  tableHeader: { flexDirection: "row", backgroundColor: "#1f2937", paddingVertical: 10, paddingHorizontal: 16 },
  tableHeaderText: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "white", textTransform: "uppercase" },
  tableRow: { flexDirection: "row", paddingVertical: 10, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  tableRowAlt: { backgroundColor: "#f9fafb" },
  colDesc: { flex: 1 },
  colQty: { width: 64, textAlign: "center" },
  colRate: { width: 96, textAlign: "right" },
  colAmount: { width: 112, textAlign: "right" },
  itemName: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#111827" },
  itemDesc: { fontSize: 10, color: "#6b7280", marginTop: 2 },
  cell: { fontSize: 14, color: "#374151" },
  cellBold: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#111827" },

  totalsWrap: { alignItems: "flex-end", marginTop: 8, marginBottom: 32 },
  totalsTable: { width: 256 },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 },
  totalsLabel: { fontSize: 14, color: "#4b5563" },
  totalsValue: { fontSize: 14, color: "#111827" },
  totalsDivider: { borderTopWidth: 2, borderTopColor: "#1f2937" },
  totalLabel: { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#111827", paddingTop: 12 },
  totalValue: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#111827", paddingTop: 12 },

  notes: { backgroundColor: "#f9fafb", padding: 16, borderRadius: 8 },
  notesLabel: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#374151", textTransform: "uppercase", marginBottom: 4 },
  notesText: { fontSize: 14, color: "#4b5563" },

  footer: { position: "absolute", bottom: 40, left: 72, right: 72, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: "#e5e7eb", paddingTop: 12 },
  footerText: { fontSize: 10, color: "#6b7280" },
});

export default function Invoice(props: InvoiceProps) {
  const { number, date, dueDate, customer, items, taxRate, notes, company } = { ...defaults, ...props };
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <Document title={`Invoice ${number}`}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View>
            <Text style={s.companyName}>{company.name}</Text>
            <Text style={s.companyAddress}>{company.address}</Text>
          </View>
          <View>
            <Text style={s.invoiceTitle}>INVOICE</Text>
            <Text style={s.invoiceNumber}>{number}</Text>
          </View>
        </View>

        <View style={s.detailsRow}>
          <View>
            <Text style={s.sectionLabel}>Bill To</Text>
            <Text style={s.customerName}>{customer.name}</Text>
            <Text style={s.customerDetail}>{customer.address}</Text>
            <Text style={s.customerDetail}>{customer.city}</Text>
          </View>
          <View style={s.detailRight}>
            <View style={s.detailLine}>
              <Text style={s.detailLabel}>Invoice Date:</Text>
              <Text style={s.detailValue}>{date}</Text>
            </View>
            <View style={s.detailLine}>
              <Text style={s.detailLabel}>Due Date:</Text>
              <Text style={s.detailValue}>{dueDate}</Text>
            </View>
            <View style={[s.detailLine, { marginTop: 4 }]}>
              <Text style={s.amountDueLabel}>Amount Due:</Text>
              <Text style={s.amountDueValue}>{fmt(total)}</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={s.tableHeader}>
            <Text style={[s.tableHeaderText, s.colDesc]}>Description</Text>
            <Text style={[s.tableHeaderText, s.colQty]}>Qty</Text>
            <Text style={[s.tableHeaderText, s.colRate]}>Rate</Text>
            <Text style={[s.tableHeaderText, s.colAmount]}>Amount</Text>
          </View>
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <View style={i % 2 !== 0 ? [s.tableRow, s.tableRowAlt] : s.tableRow}>
                <View style={s.colDesc}>
                  <Text style={s.itemName}>{item.name}</Text>
                  {item.description && <Text style={s.itemDesc}>{item.description}</Text>}
                </View>
                <Text style={[s.cell, s.colQty]}>{item.qty}</Text>
                <Text style={[s.cell, s.colRate]}>{fmt(item.price)}</Text>
                <Text style={[s.cellBold, s.colAmount]}>{fmt(item.qty * item.price)}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        <View style={s.totalsWrap}>
          <View style={s.totalsTable}>
            <View style={s.totalsRow}>
              <Text style={s.totalsLabel}>Subtotal</Text>
              <Text style={s.totalsValue}>{fmt(subtotal)}</Text>
            </View>
            <View style={s.totalsRow}>
              <Text style={s.totalsLabel}>Tax ({(taxRate * 100).toFixed(0)}%)</Text>
              <Text style={s.totalsValue}>{fmt(tax)}</Text>
            </View>
            <View style={[s.totalsRow, s.totalsDivider]}>
              <Text style={s.totalLabel}>Total Due</Text>
              <Text style={s.totalValue}>{fmt(total)}</Text>
            </View>
          </View>
        </View>

        {notes ? (
          <View style={s.notes}>
            <Text style={s.notesLabel}>Notes</Text>
            <Text style={s.notesText}>{notes}</Text>
          </View>
        ) : null}

        <View style={s.footer} fixed>
          <Text style={s.footerText}>
            {company.name} {"\u2022"} {company.email} {"\u2022"} {company.phone}
          </Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
