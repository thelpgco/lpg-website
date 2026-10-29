import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { itemsFor } from "@/lib/media";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-plant-in-pakistan/" });

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-ink">
          <tr>
            {head.map((h) => (
              <th key={h} className="p-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-ink-700">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="p-3 align-top">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const faqs = [
  {
    q: "What is an LPG plant?",
    a: "The term covers several things: a bottling or filling plant where cylinders are filled, a storage and tanker-loading facility, and an on-site installation at a factory that stores and vaporises LPG for process use. They differ in size, licensing and equipment.",
  },
  {
    q: "Can I set up an LPG plant in Pakistan?",
    a: "Setting up a bottling or storage plant is a licensed, regulated activity. You need approvals before construction and before operation, plus compliant site, equipment and safety systems. Confirm current requirements with OGRA and the other authorities that apply before you commit money.",
  },
  {
    q: "Do you build LPG bottling plants?",
    a: "We do not advertise turnkey bottling plant construction on this page. Our engineering team handles storage tanks, pipelines, manifolds, vaporiser connections and air-LPG systems for sites. If your project is outside our scope we say so plainly.",
  },
  {
    q: "What equipment does an LPG plant need?",
    a: "Depending on type: storage tanks, pumps or compressors, filling machines and scales for cylinders, vaporisers, pipework with valves and relief devices, gas detection, fire protection and cylinder testing facilities. The final list comes from the design, not from a general checklist.",
  },
  {
    q: "What is an air-LPG or SNG plant?",
    a: "An air-LPG system mixes vaporised LPG with air to produce a gas that can be used like piped natural gas by appliances designed for it. It is used where natural gas is not available. Design and approval are specific to the site.",
  },
  {
    q: "How much does an LPG plant cost?",
    a: "There is no single cost. It depends on capacity, equipment, land, approvals and site works. We do not publish figures. If you need an engineering scope for part of a project, request a quotation.",
  },
  {
    q: "Do you supply LPG to plants?",
    a: "Yes, we take enquiries for gas supply to industrial plants and installations. See industrial LPG supply and bulk LPG supply.",
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "LPG plant in Pakistan", href: "/lpg-plant-in-pakistan/" }]}
      h1="LPG plant in Pakistan: types, equipment and licensing"
      intro={`An LPG plant can mean a cylinder filling plant, a storage and loading terminal or an on-site plant at a factory. ${site.name} (OGRA licence ${site.licenceNumber}) explains the types and takes engineering and supply enquiries for storage, pipework and related systems.`}
      aside={<SiteLeadForm defaultRequest="engineering" heading="Ask about plant engineering" buttonLabel="Request quotation" />}
    >
      <Note title="Short answer">
        <p>
          Building or running a bottling or storage plant needs licences and approvals before you start. We can help
          with site-level engineering such as tanks, pipelines, manifolds and air-LPG systems, and with gas supply to
          plants. We do not publish plant prices or past plant projects here. Describe your project and we tell you
          honestly what we can and cannot do.
        </p>
      </Note>

      <H2>Types of LPG plant</H2>
      <Table
        head={["Type", "What it does", "Main points to plan for"]}
        rows={[
          ["Bottling plant", "Fills cylinders from bulk storage", "Storage, filling machines, scales, cylinder checks and licensing before operation"],
          ["Storage and loading terminal", "Receives, stores and loads gas into tankers", "Tanks, pumps or compressors, loading arms, fire protection and approvals"],
          ["On-site industrial plant", "Stores and vaporises LPG for a factory", "Tank siting, vaporiser, pipework and safety distances"],
          ["Air-LPG (SNG) plant", "Mixes vaporised LPG with air for piped use", "Mixing equipment, controls, pipe network and approvals"],
        ]}
      />

      <H2>What an LPG plant is made of</H2>
      <UL
        items={[
          "Storage tanks with valves, gauges and relief devices",
          "Transfer equipment: pumps or compressors, and hoses or loading arms",
          "Filling machines and calibrated scales for cylinders (bottling plants)",
          "Vaporisers where liquid LPG must be turned into gas for supply",
          "Pipework, manifolds, regulators and isolation valves",
          "Gas detection, fire protection and emergency shut-off",
          "Cylinder inspection and testing arrangements",
        ]}
      />
      <P>
        See <Link className="underline" href="/lpg-vaporizers/">LPG vaporizers</Link>, the{" "}
        <Link className="underline" href="/tools/lpg-tank-size-calculator/">tank size calculator</Link> and{" "}
        <Link className="underline" href="/how-lpg-is-produced-and-supplied/">how LPG is produced and supplied</Link>.
      </P>

      <H2>Licensing and approvals</H2>
      <P>
        LPG storage, bottling and marketing are licensed by OGRA, and other authorities set safety and land-use
        requirements. Because the rules depend on activity, size and province, check the current position with OGRA
        and the relevant approvals bodies before you buy land or equipment. Read{" "}
        <Link className="underline" href="/ogra-lpg-regulations-pakistan/">OGRA LPG regulations in Pakistan</Link> and see how we
        are licensed on <Link className="underline" href="/licences-and-compliance/">licences and compliance</Link>.
      </P>

      <H2>Where we can help</H2>
      <Table
        head={["Need", "What we offer", "Next step"]}
        rows={[
          ["Gas supply to a plant", "Industrial or bulk supply, quoted after site details", "Request quotation"],
          ["Storage tank at a site", "Siting advice, installation, testing and handover", "See storage tank installation"],
          ["Pipework and manifolds", "Design, installation and pressure testing", "See pipeline installation"],
          ["Air-LPG system", "Assessment and design for suitable sites", "See air-LPG and SNG systems"],
          ["Safety review of a plant", "Audit and inspection with a written report", "See safety audit"],
          ["Turnkey bottling plant", "Not offered on this page; tell us your scope and we advise", "Request quotation"],
        ]}
      />
      <UL
        items={[
          <Link key="1" className="underline" href="/services/lpg-storage-tank-installation/">LPG storage tank installation</Link>,
          <Link key="2" className="underline" href="/services/lpg-pipeline-installation/">LPG pipeline installation</Link>,
          <Link key="3" className="underline" href="/services/lpg-air-sng-systems/">Air-LPG and SNG systems</Link>,
          <Link key="4" className="underline" href="/services/lpg-safety-audit-and-inspection/">Safety audit and inspection</Link>,
          <Link key="5" className="underline" href="/industrial-lpg-supply/">Industrial LPG supply</Link>,
          <Link key="6" className="underline" href="/lpg-bowser/">LPG bowser</Link>,
          <Link key="7" className="underline" href="/lpg-business-in-pakistan/">LPG business in Pakistan</Link>,
        ]}
      />

      <Note title="Talk to us now" tone="info">
        <p>
          Call {site.phoneDisplay} or message us on <a className="underline" href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>.
        </p>
      </Note>

      <ImageGallery items={itemsFor("/lpg-plant-in-pakistan/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}
