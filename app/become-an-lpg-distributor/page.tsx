import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { directorySummary, topCitiesByListings } from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { hubCities } from "@/lib/network";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/become-an-lpg-distributor/" });

const faqs = [
  {
    q: "Do I need an OGRA licence to become a distributor?",
    a: "It depends on your exact role. Marketing, bottling and certain storage activities are licensed by OGRA. Many distributors and shops work under appointment from a licensed marketer. Tell us your current licensing and registration in the application — we explain what applies to your proposed role; we do not invent a licence path that does not exist.",
  },
  {
    q: "What does it cost to join?",
    a: "There is no published join fee or fixed deposit amount on this page. Commercial terms — stock, credit, territory and any security — are discussed on the call after we understand your city and operation. Ask for every figure in writing before you invest.",
  },
  {
    q: "How fast do you reply to applications?",
    a: `${terms.responseTime} Complex applications may need a follow-up call or a visit. Call ${site.phoneDisplay} if your enquiry is urgent.`,
  },
  {
    q: "Can I apply from a small town?",
    a: "Yes. Smaller towns, Azad Kashmir, Gilgit-Baltistan and parts of Balochistan are a priority where listings are thinner. Send your city and delivery radius even if you are unsure.",
  },
  {
    q: "Will customer orders in my area come to me automatically?",
    a: "When we agree territory and standards, orders for your covered streets are routed to you when you can fulfil them. We tell the customer who is delivering before they agree. Coverage of a street is never assumed from a map alone.",
  },
];

export default function Page() {
  const dir = directorySummary.counts;
  const dense = topCitiesByListings(5);

  return (
    <PageShell
      crumbs={[{ name: "Become a distributor", href: "/become-an-lpg-distributor/" }]}
      h1="Become an LPG distributor or partner with THE LPG CO."
      intro={`${company.shortName} is an OGRA-licensed marketer and distributor (licence ${company.licenceNumber}), operating since ${company.foundedYear}. We appoint distributors and shops who deliver certified cylinders across Pakistan — and we want more coverage outside the densest cities. Here is the process, what we look for, where we need partners, and how to apply.`}
      aside={
        <SiteLeadForm
          defaultRequest="distributor"
          heading="Apply to join our network"
          buttonLabel="Send application"
          subheading="City, premises type and phone — we call to discuss terms."
        />
      }
    >
      <Note title="Who this is for" tone="info">
        <p>
          Shop owners, agencies, dealers and delivery operators who can handle cylinders safely and answer the phone.
          It is not a franchise brochure with invented fees — terms are confirmed on a call after we review your area.
        </p>
      </Note>

      <H2>How partnership works</H2>
      <P>
        Customers order through our phone, WhatsApp and website. We match the order to a partner who can serve that
        street, confirm price and timing with the customer, and name who will deliver before they agree. You supply under
        the standards we share; we supply gas and cylinders through our licensed role according to the commercial terms
        we set with you.
      </P>
      <P>
        Order flow for customers:{" "}
        <Link className="underline" href="/how-it-works/">
          how it works
        </Link>
        . Network size today:{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>{" "}
        ({(dir.owner_network + dir.market_listing).toLocaleString("en-PK")} network dealers listed;{" "}
        {dir.cities_indexed.toLocaleString("en-PK")} cities with local listings).
      </P>

      <H2>Application process</H2>
      <ol className="mt-3 space-y-3">
        {[
          [
            "Send the form",
            "City, area, shop or depot address, phone/WhatsApp, and a short note on what you already sell or deliver.",
          ],
          [
            "We review and call",
            `We check licensing and operations against partner standards and call you (${terms.responseTime} aim during active hours).`,
          ],
          [
            "Discuss commercial terms",
            "Territory, stock, pricing discipline, certified-cylinder rule, and any deposit or credit — all confirmed before you join. No surprise doorstep fees invented later.",
          ],
          [
            "Onboarding",
            "If both sides agree, you join the network, receive orders for agreed streets, and stay accountable to safety and price honesty.",
          ],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>

      <H2>Requirements</H2>
      <SpecTable
        head={["Requirement", "What we mean"]}
        rows={[
          ["Real premises or fleet", "A shop, depot or delivery operation that can store and move cylinders safely"],
          ["Contactability", "A phone or WhatsApp number that is answered during active hours"],
          ["Safety discipline", "Upright ventilated storage, no smoking near stock, trained handling"],
          ["Certified cylinders only", terms.partnersCertifiedRule],
          ["Honest pricing", "Gas follows OGRA; you state delivery and cylinder terms before the customer agrees"],
          ["Licensing clarity", "Tell us what approvals you hold; we align your role with OGRA and our appointment"],
        ]}
      />
      <P>
        Full list:{" "}
        <Link className="underline" href="/partner-standards/">
          partner standards
        </Link>
        . Business context:{" "}
        <Link className="underline" href="/lpg-business-in-pakistan/">
          LPG business in Pakistan
        </Link>
        .
      </P>

      <H2>Where we need partners</H2>
      <P>
        Dense listing cities already have many named dealers — for example{" "}
        {dense.map((c, i) => (
          <span key={c.slug}>
            <Link className="underline" href={`/lpg-in-${c.slug}/`}>
              {c.name}
            </Link>
            {i < dense.length - 1 ? ", " : ""}
          </span>
        ))}
        . We still welcome strong operators there, but priority goes to thinner coverage: Azad Kashmir,
        Gilgit-Baltistan, Balochistan and smaller towns in every province. Tell us your area even if you are unsure —
        we say honestly whether we already have coverage.
      </P>
      <P>
        Main hubs we already serve heavily:{" "}
        {hubCities.map((c, i) => (
          <span key={c.slug}>
            <Link className="underline" href={`/lpg-in-${c.slug}/`}>
              {c.name}
            </Link>
            {i < hubCities.length - 1 ? ", " : "."}
          </span>
        ))}
      </P>

      <H2>What you get</H2>
      <UL
        items={[
          "Orders routed for agreed streets when customers request supply and you can fulfil",
          "Clear commercial terms discussed before you join — not buried after the first delivery",
          "Access to cylinder and appliance supply where stock allows (exact stock confirmed when you order)",
          "Shared safety expectations and certified-cylinder rule across the network",
          `Nationwide brand backing from an OGRA-licensed marketer (licence ${company.licenceNumber}) since ${company.foundedYear}`,
        ]}
      />
      <P>
        Delivery promise we give customers (you help us keep it): {terms.delivery}
      </P>

      <H2>What we do not promise on this page</H2>
      <UL
        items={[
          "A published join fee, margin table or deposit amount — those are quote-confirmed for your case",
          "Automatic exclusivity for an entire city without written territory terms",
          "That every street in Pakistan already has a partner",
        ]}
      />

      <Note title="Apply now" tone="info">
        <p>
          Use the form, or call / WhatsApp {site.phoneDisplay}. Office: {company.officeAddress}. We reply{" "}
          {company.responseTime} during active hours.
        </p>
      </Note>

      <ImageGallery items={itemsFor("/become-an-lpg-distributor/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}
