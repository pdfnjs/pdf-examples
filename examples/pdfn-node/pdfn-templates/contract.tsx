import { Document, Page, PageNumber, TotalPages, NoBreak } from "@pdfn/react";
import { Tailwind } from "@pdfn/tailwind";

/**
 * Professional Contract template using Tailwind CSS
 *
 * Demonstrates:
 * - NoBreak for keeping clauses together
 * - PageNumber and TotalPages in footer
 * - PreviewProps pattern for dev preview data
 */

interface Party {
  name: string;
  address: string;
  representative?: string;
  title?: string;
}

interface Clause {
  title: string;
  content: string;
}

interface ContractProps {
  title: string;
  contractNumber: string;
  effectiveDate: string;
  partyA: Party;
  partyB: Party;
  recitals: string[];
  clauses: Clause[];
  governingLaw: string;
  signatureDate: string;
}

function Contract({
  title,
  contractNumber,
  effectiveDate,
  partyA,
  partyB,
  recitals,
  clauses,
  governingLaw,
}: ContractProps) {
  return (
    <Document title={`${title} - ${contractNumber}`}>
      <Tailwind>
        <Page
          size="A4"
          margin="1in"
          footer={
            <div className="flex justify-between items-center text-[10px] text-gray-500 border-t border-gray-200 pt-3">
              <div>{contractNumber}</div>
              <div>
                Page <PageNumber /> of <TotalPages />
              </div>
            </div>
          }
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-gray-900 tracking-wide">
              {title}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Contract No: {contractNumber}
            </div>
          </div>

          {/* Parties Introduction */}
          <div className="text-sm text-gray-700 leading-relaxed mb-6">
            <p className="mb-4">
              This Agreement (the "Agreement") is entered into as of{" "}
              <span className="font-semibold">{effectiveDate}</span> (the
              "Effective Date"), by and between:
            </p>

            <div className="ml-4 mb-4">
              <p className="mb-2">
                <span className="font-semibold">{partyA.name}</span>, a company
                with its principal place of business at {partyA.address}{" "}
                (hereinafter referred to as "Party A"),
              </p>
              <p className="text-center my-2 font-semibold">and</p>
              <p>
                <span className="font-semibold">{partyB.name}</span>, a company
                with its principal place of business at {partyB.address}{" "}
                (hereinafter referred to as "Party B").
              </p>
            </div>

            <p>
              Party A and Party B may be referred to individually as a "Party"
              and collectively as the "Parties."
            </p>
          </div>

          {/* Recitals */}
          <div className="mb-6">
            <div className="text-sm font-bold text-gray-900 uppercase mb-3">
              Recitals
            </div>
            <div className="text-sm text-gray-700 leading-relaxed">
              {recitals.map((recital, i) => (
                <p key={i} className="mb-2 ml-4">
                  {recital}
                </p>
              ))}
              <p className="mt-4">
                NOW, THEREFORE, in consideration of the mutual covenants and
                agreements contained herein, and for other good and valuable
                consideration, the receipt and sufficiency of which are hereby
                acknowledged, the Parties agree as follows:
              </p>
            </div>
          </div>

          {/* Clauses */}
          <div className="mb-8">
            {clauses.map((clause, i) => (
              <NoBreak key={i}>
                <div className="mb-5">
                  <div className="text-sm font-bold text-gray-900 mb-2">
                    {i + 1}. {clause.title}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed ml-4">
                    {clause.content}
                  </p>
                </div>
              </NoBreak>
            ))}
          </div>

          {/* Governing Law */}
          <NoBreak>
            <div className="mb-8">
              <div className="text-sm font-bold text-gray-900 mb-2">
                {clauses.length + 1}. Governing Law
              </div>
              <p className="text-sm text-gray-700 leading-relaxed ml-4">
                This Agreement shall be governed by and construed in accordance
                with the laws of the {governingLaw}, without regard to its
                conflict of laws principles. Any dispute arising out of or
                relating to this Agreement shall be subject to the exclusive
                jurisdiction of the courts located in the {governingLaw}.
              </p>
            </div>
          </NoBreak>

          {/* Signature Block */}
          <NoBreak>
            <div className="mt-10">
              <p className="text-sm text-gray-700 mb-8">
                IN WITNESS WHEREOF, the Parties have executed this Agreement as
                of the date first written above.
              </p>

              <div className="flex justify-between">
                {/* Party A Signature */}
                <div className="w-[45%]">
                  <div className="text-[10px] font-bold text-gray-900 uppercase mb-4">
                    {partyA.name}
                  </div>
                  <div className="border-b border-gray-400 mb-2 h-8"></div>
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold">{partyA.representative}</p>
                    <p className="text-[10px] text-gray-500">{partyA.title}</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-[10px] text-gray-500">Date:</div>
                    <div className="border-b border-gray-300 mt-1 w-32 h-5"></div>
                  </div>
                </div>

                {/* Party B Signature */}
                <div className="w-[45%]">
                  <div className="text-[10px] font-bold text-gray-900 uppercase mb-4">
                    {partyB.name}
                  </div>
                  <div className="border-b border-gray-400 mb-2 h-8"></div>
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold">{partyB.representative}</p>
                    <p className="text-[10px] text-gray-500">{partyB.title}</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-[10px] text-gray-500">Date:</div>
                    <div className="border-b border-gray-300 mt-1 w-32 h-5"></div>
                  </div>
                </div>
              </div>
            </div>
          </NoBreak>
        </Page>
      </Tailwind>
    </Document>
  );
}

Contract.PreviewProps = {
  title: "SERVICE AGREEMENT",
  contractNumber: "CONTRACT-2025-001",
  effectiveDate: "January 15, 2025",
  partyA: {
    name: "Acme Corporation",
    address: "123 Business Avenue, Suite 500, San Francisco, CA 94102",
    representative: "John Smith",
    title: "Chief Executive Officer",
  },
  partyB: {
    name: "Tech Solutions Inc.",
    address: "456 Innovation Drive, Austin, TX 78701",
    representative: "Jane Doe",
    title: "Managing Director",
  },
  recitals: [
    "WHEREAS, Party A desires to engage Party B to provide certain services as described herein;",
    "WHEREAS, Party B has the expertise, resources, and capability to provide such services;",
    "WHEREAS, both parties wish to establish the terms and conditions governing their relationship;",
  ],
  clauses: [
    {
      title: "Scope of Services",
      content:
        "Party B agrees to provide the services described in Exhibit A attached hereto and incorporated herein by reference. Party B shall perform such services in a professional and workmanlike manner consistent with industry standards.",
    },
    {
      title: "Term",
      content:
        "This Agreement shall commence on the Effective Date and shall continue for a period of twelve (12) months, unless earlier terminated in accordance with the provisions hereof. This Agreement may be renewed for successive one-year terms upon mutual written agreement of the parties.",
    },
    {
      title: "Compensation",
      content:
        "In consideration for the services rendered by Party B, Party A agrees to pay Party B the fees set forth in Exhibit B. Payment shall be due within thirty (30) days of receipt of a proper invoice. Late payments shall accrue interest at a rate of 1.5% per month.",
    },
    {
      title: "Confidentiality",
      content:
        'Each party agrees to maintain the confidentiality of all proprietary information disclosed by the other party during the term of this Agreement. "Proprietary Information" includes, but is not limited to, trade secrets, business plans, customer lists, financial information, and technical data.',
    },
    {
      title: "Intellectual Property",
      content:
        "All intellectual property developed by Party B in the course of performing services under this Agreement shall be the sole and exclusive property of Party A. Party B hereby assigns all right, title, and interest in such intellectual property to Party A.",
    },
    {
      title: "Termination",
      content:
        "Either party may terminate this Agreement upon thirty (30) days' prior written notice to the other party. Either party may terminate this Agreement immediately upon written notice if the other party materially breaches any provision of this Agreement and fails to cure such breach within fifteen (15) days after receiving written notice thereof.",
    },
  ],
  governingLaw: "State of California",
  signatureDate: "January 15, 2025",
} satisfies ContractProps;

export default Contract;
