import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

interface InvoiceProps {
  number?: string;
  date?: string;
  dueDate?: string;
  customer?: {
    name: string;
    address: string;
    city: string;
  };
  items?: Array<{
    name: string;
    description?: string;
    qty: number;
    price: number;
  }>;
  taxRate?: number;
  notes?: string;
  company?: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
}

const styles = StyleSheet.create({
  page: {
    padding: 72, // ~1 inch
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#111827",
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  companyName: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  companyAddress: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
  },
  invoiceTitle: {
    fontSize: 30,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    letterSpacing: -0.5,
    textAlign: "right",
  },
  invoiceNumber: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#4b5563",
    marginTop: 4,
    textAlign: "right",
  },
  // Details section
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#6b7280",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  customerName: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  customerDetail: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 2,
  },
  detailRight: {
    alignItems: "flex-end",
  },
  detailLine: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 2,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginRight: 16,
  },
  detailValue: {
    fontSize: 14,
    color: "#111827",
    width: 130,
    textAlign: "right",
  },
  amountDueLabel: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#6b7280",
    marginRight: 16,
  },
  amountDueValue: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    width: 130,
    textAlign: "right",
  },
  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1f2937",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "white",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  tableRowAlt: {
    backgroundColor: "#f9fafb",
  },
  colDescription: {
    flex: 1,
  },
  colQty: {
    width: 64,
    textAlign: "center",
  },
  colRate: {
    width: 96,
    textAlign: "right",
  },
  colAmount: {
    width: 112,
    textAlign: "right",
  },
  itemName: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  itemDescription: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 2,
  },
  cellText: {
    fontSize: 14,
    color: "#374151",
  },
  cellTextBold: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  // Totals
  totalsContainer: {
    alignItems: "flex-end",
    marginTop: 8,
    marginBottom: 32,
  },
  totalsTable: {
    width: 256,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  totalsLabel: {
    fontSize: 14,
    color: "#4b5563",
  },
  totalsValue: {
    fontSize: 14,
    color: "#111827",
  },
  totalsDivider: {
    borderTopWidth: 2,
    borderTopColor: "#1f2937",
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    paddingTop: 12,
  },
  totalValue: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    paddingTop: 12,
  },
  // Notes
  notesContainer: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: "#4b5563",
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 40,
    left: 72,
    right: 72,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
  },
  footerText: {
    fontSize: 10,
    color: "#6b7280",
  },
});

export default function Invoice({
  number = "INV-2025-001",
  date = "January 15, 2025",
  dueDate = "February 14, 2025",
  customer = {
    name: "Acme Corporation",
    address: "456 Enterprise Blvd, Suite 100",
    city: "Austin, TX 78701",
  },
  items = [
    { name: "Web Development", description: "Frontend development with React", qty: 40, price: 150 },
    { name: "API Integration", description: "REST API setup and configuration", qty: 20, price: 175 },
    { name: "UI/UX Design", description: "User interface design", qty: 15, price: 125 },
  ],
  taxRate = 0.1,
  notes = "Payment is due within 30 days. Thank you for your business!",
  company = {
    name: "Your Company",
    address: "123 Business St, San Francisco, CA 94102",
    email: "hello@yourcompany.com",
    phone: "+1 (555) 123-4567",
  },
}: InvoiceProps) {
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const formatCurrency = (amount: number) =>
    "$" + amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Document title={`Invoice ${number}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>{company.name}</Text>
            <Text style={styles.companyAddress}>{company.address}</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>{number}</Text>
          </View>
        </View>

        {/* Invoice Details & Bill To */}
        <View style={styles.detailsRow}>
          <View>
            <Text style={styles.sectionLabel}>Bill To</Text>
            <Text style={styles.customerName}>{customer.name}</Text>
            <Text style={styles.customerDetail}>{customer.address}</Text>
            <Text style={styles.customerDetail}>{customer.city}</Text>
          </View>
          <View style={styles.detailRight}>
            <View style={styles.detailLine}>
              <Text style={styles.detailLabel}>Invoice Date:</Text>
              <Text style={styles.detailValue}>{date}</Text>
            </View>
            <View style={styles.detailLine}>
              <Text style={styles.detailLabel}>Due Date:</Text>
              <Text style={styles.detailValue}>{dueDate}</Text>
            </View>
            <View style={[styles.detailLine, { marginTop: 4 }]}>
              <Text style={styles.amountDueLabel}>Amount Due:</Text>
              <Text style={styles.amountDueValue}>{formatCurrency(total)}</Text>
            </View>
          </View>
        </View>

        {/* Items Table */}
        <View>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDescription]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.colQty]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.colRate]}>Rate</Text>
            <Text style={[styles.tableHeaderText, styles.colAmount]}>Amount</Text>
          </View>
          {/* Table Body */}
          {items.map((item, i) => (
            <View key={i} style={[styles.tableRow, i % 2 !== 0 && styles.tableRowAlt]}>
              <View style={styles.colDescription}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.description && <Text style={styles.itemDescription}>{item.description}</Text>}
              </View>
              <Text style={[styles.cellText, styles.colQty]}>{item.qty}</Text>
              <Text style={[styles.cellText, styles.colRate]}>{formatCurrency(item.price)}</Text>
              <Text style={[styles.cellTextBold, styles.colAmount]}>{formatCurrency(item.qty * item.price)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsTable}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Subtotal</Text>
              <Text style={styles.totalsValue}>{formatCurrency(subtotal)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Tax ({(taxRate * 100).toFixed(0)}%)</Text>
              <Text style={styles.totalsValue}>{formatCurrency(tax)}</Text>
            </View>
            <View style={[styles.totalsRow, styles.totalsDivider]}>
              <Text style={styles.totalLabel}>Total Due</Text>
              <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        {notes ? (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{notes}</Text>
          </View>
        ) : null}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            {company.name} {"\u2022"} {company.email} {"\u2022"} {company.phone}
          </Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
