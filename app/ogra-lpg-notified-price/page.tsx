import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import PriceBlock from "@/components/PriceBlock";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { absPct, gasFor, momChange, monthLong, priceMeta, signedPct, signedPkr, verb } from "@/lib/money";
import { fmtDate, latestPrice, notifications, pkr } from "@/lib/prices";
import { site } from "@/lib/site";

const PATH = "/ogra-lpg-notified-price/";
const OGRA_URL = "https://www.ogra.org.pk/lpg-notified-prices";

export const metadata = priceMeta(
  PATH,
  (n) => [
    `OGRA LPG Price in Pakistan: ${pkr(n.perKgPkr)}/kg from ${fmtDate(n.effectiveFrom).replace(/ 20\d\d$/, "")}`,
    `OGRA LPG Price: ${pkr(n.perKgPkr)} per kg, ${monthLong(n.month)}`,
  ],
  (n) => [
    `The OGRA notified LPG price for ${monthLong(n.month)} is ${pkr(n.perKgPkr)} per kg, effective ${fmtDate(n.effectiveFrom)}. How to read the notification, what it covers and past months.`,
    `OGRA LPG notified price: ${pkr(n.perKgPkr)} per kg from ${fmtDate(n.effectiveFrom)}, how the monthly notice works, what it excludes and the months on file.`,
  ],
);

export default function Page() {
  const n = latestPrice;
  const mom = momChange();

  const faqs = [
    {
      q: "What is the OGRA LPG notified price?",
      a: n
        ? `It is the consumer price per kg that OGRA notifies for LPG each month. The ${monthLong(n.month)} notification is ${pkr(n.perKgPkr)} per kg, effective ${fmtDate(n.effectiveFrom)}.`
        : "It is the consumer price per kg that OGRA notifies for LPG each month. Call or WhatsApp us for the current figure.",
    },
    {
      q: "How often does OGRA notify the LPG price?",
      a: "Monthly. A new notification normally applies from the 1st of the month and replaces the previous month's figure.",
    },
    {
      q: "Does the notified price include the cylinder and delivery?",
      a: "It is the reference price for the gas by weight. Cylinder deposit or purchase, delivery and exchange are separate and confirmed with you before you agree.",
    },
    {
      q: "Where can I check the notification myself?",
      a: "On the LPG notified prices section of the OGRA website (ogra.org.pk). Treat the official notice as final if it ever differs from a summary elsewhere.",
    },
    {
      q: "How do you source the price on this site?",
      a: n
        ? `We enter the figure from press coverage of the OGRA notification, record who checked it and when (${n.verifiedBy}, ${fmtDate(n.verifiedOn)}), and re-check the official PDF once it is posted.`
        : "We enter a figure only after checking the OGRA notification.",
    },
  ];

  return (
    <PageShell
      crumbs={[
        { name: "LPG price in Pakistan", href: "/lpg-price-in-pakistan/" },
        { name: "OGRA notified price", href: PATH },
      ]}
      h1={n ? `OGRA LPG notified price: ${pkr(n.perKgPkr)} per kg (${monthLong(n.month)})` : "OGRA LPG notified price in Pakistan"}
      intro={
        n
          ? `OGRA notified an LPG consumer price of ${pkr(n.perKgPkr)} per kg effective ${fmtDate(n.effectiveFrom)}, which puts the gas in an 11.8 kg cylinder at ${pkr(gasFor(n, 11.8))}.${
              mom ? ` The previous month was ${pkr(mom.from.perKgPkr)} per kg, so the rate is ${verb(mom)} ${absPct(mom.pct)}.` : ""
            }`
          : "OGRA notifies the LPG consumer price every month. This page explains how to read the notification and how it turns into a cylinder price."
      }
      aside={<SiteLeadForm heading="Ask about today's price" />}
    >
      <PriceBlock />

      <H2>How to read an OGRA LPG notification</H2>
      <ol className="mt-3 list-decimal space-y-2 pl-6 text-ink-700">
        <li>
          <strong>Effective date.</strong> The notice applies from a stated date, normally the 1st of the month, until the next
          notification replaces it.
        </li>
        <li>
          <strong>Price per kg.</strong> This is the consumer price for gas by weight. Every filled-cylinder price is this figure
          times the kilograms of gas.
        </li>
        <li>
          <strong>Cylinder equivalent.</strong> Press coverage usually quotes the 11.8 kg domestic cylinder as well.
          {n ? ` At ${pkr(n.perKgPkr)} per kg that is ${pkr(gasFor(n, 11.8))}.` : ""}
        </li>
        <li>
          <strong>What it leaves out.</strong> The notification does not set your delivery charge, cylinder deposit or exchange
          terms. {company.shortName} confirms those separately before you agree.
        </li>
      </ol>

      {n ? (
        <>
          <H2>Months on file</H2>
          <SpecTable
            head={["Effective from", "Price per kg", "11.8 kg cylinder (gas)", "Change on previous month"]}
            rows={notifications.map((row, i) => {
              const prev = notifications[i + 1];
              const delta = prev ? Math.round((row.perKgPkr - prev.perKgPkr) * 100) / 100 : undefined;
              return [
                fmtDate(row.effectiveFrom),
                pkr(row.perKgPkr),
                pkr(gasFor(row, 11.8)),
                prev && delta !== undefined ? `${signedPkr(delta)} (${signedPct((delta / prev.perKgPkr) * 100)})` : "First month on file",
              ];
            })}
            caption="Gas price only. Newest first."
          />
          <P>
            Full table with bars and the 45.4 kg cylinder:{" "}
            <Link className="underline" href="/lpg-price-in-pakistan/history/">
              LPG price history in Pakistan
            </Link>
            .
          </P>
        </>
      ) : null}

      <H2>Where the official notice is published</H2>
      <P>
        OGRA publishes the notification on its website under{" "}
        <a className="underline" href={OGRA_URL} target="_blank" rel="noopener noreferrer">
          LPG notified prices
        </a>
        . If anything on this site differs from the official notification, the official notification is the final word.
      </P>

      <H2>From notification to your bill</H2>
      <UL
        items={[
          <span key="a">
            Gas for your cylinder size:{" "}
            <Link className="underline" href="/lpg-price-in-pakistan/">
              LPG price in Pakistan
            </Link>
          </span>,
          <span key="b">
            Single per-kg view:{" "}
            <Link className="underline" href="/lpg-price-per-kg-in-pakistan/">
              LPG 1 kg price
            </Link>
          </span>,
          <span key="c">
            Gas, deposit and delivery by size:{" "}
            <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
              price of LPG cylinder
            </Link>
          </span>,
          <span key="d">
            Why the figure moves:{" "}
            <Link className="underline" href="/why-lpg-prices-change-in-pakistan/">
              why LPG prices change
            </Link>
          </span>,
          <span key="e">
            Rules behind the notice:{" "}
            <Link className="underline" href="/ogra-lpg-regulations-pakistan/">
              OGRA LPG regulations
            </Link>
          </span>,
        ]}
      />

      <Note title={`Licensed marketer: ${company.shortName}`} tone="info">
        <p>
          We operate under OGRA licence {company.licenceNumber} and apply the notified per-kg rate in every city we serve. Order
          on{" "}
          <Link className="underline" href="/order-lpg/">
            Order LPG
          </Link>{" "}
          or call {site.phoneDisplay}.
        </p>
      </Note>

      <ImageGallery items={itemsFor(PATH)} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}
