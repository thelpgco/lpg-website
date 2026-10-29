import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import PriceBlock from "@/components/PriceBlock";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { itemsFor, media } from "@/lib/media";
import { fmtDate, notifications, pkr } from "@/lib/prices";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/why-lpg-prices-change-in-pakistan/" });

const faqs = [
  { q: "Why does the LPG price change every month in Pakistan?", a: "OGRA notifies a new consumer price each month. Public reporting links the change mainly to the international LPG contract price and the rupee-dollar exchange rate, with freight, taxes and margins also in the mix. Check the notification itself for the official figure." },
  { q: "Who decides the LPG price?", a: "The Oil and Gas Regulatory Authority (OGRA) notifies the monthly price. Marketers and distributors then sell within the rules. Delivery, deposit and exchange terms can change your final bill." },
  { q: "When does the new LPG price start?", a: "Usually from the first day of the month. Each notification states its own effective date, and we show that date on our price pages." },
  { q: "Why is my local price different from the OGRA figure?", a: "The OGRA figure is the notified gas price per kg. A shop may add delivery, cylinder deposit, or charge for a smaller refill. Ask for the gas rate, the delivery charge and the deposit separately." },
  { q: "Is it worth stocking extra cylinders before a price rise?", a: "No. Extra full cylinders are a safety risk, and a price move can go either way. Keep the cylinders you use, stored upright and ventilated, and refill on your normal schedule." },
  { q: "Does the dollar rate affect LPG prices?", a: "Yes. A large share of LPG supply is priced in dollars, so a weaker rupee raises the rupee cost of imported gas. A stronger rupee can reduce it. It is only one of several inputs." },
  { q: "Is the OGRA rate the same in every city?", a: terms.sameOgraRateAllCities ? "Yes for the notified gas price per kg — the same OGRA rate applies nationwide. Delivery and deposit can still differ by area." : "Check the notification and ask your supplier to separate gas, delivery and deposit." },
  { q: "How does THE LPG CO. quote prices?", a: `${company.shortName} quotes gas from the verified OGRA notification, then confirms delivery and any deposit before you agree. See our pricing policy and order LPG when you are ready.` },
];

export default function Page() {
  const latest = notifications[0];
  const previous = notifications[1];
  const delta = latest && previous ? latest.perKgPkr - previous.perKgPkr : undefined;
  const pct = latest && previous ? (delta! / previous.perKgPkr) * 100 : undefined;
  return (
    <PageShell
      crumbs={[
        { name: "LPG price in Pakistan", href: "/lpg-price-in-pakistan/" },
        { name: "Why LPG prices change", href: "/why-lpg-prices-change-in-pakistan/" },
      ]}
      h1="Why LPG prices change in Pakistan every month"
      intro={`${company.shortName} quotes cylinder gas from the OGRA notification that applies nationwide. OGRA resets the consumer price once a month. It moves with international LPG prices, the rupee–dollar rate, shipping cost, taxes and margins — here is what each input does, with the latest verified change.`}
      aside={<SiteLeadForm heading="Get today's full quote" />}
    >
      <Note title="Short answer" tone="info">
        <p>
          The price is reset monthly. When global LPG prices or the dollar go up, the next notification usually goes up.
          When they fall, it can go down. A price change does not always mean a shortage.
        </p>
      </Note>

      <PriceBlock />

      {latest && previous && delta !== undefined && pct !== undefined ? (
        <>
          <H2>Latest month-to-month change we have verified</H2>
          <SpecTable
            head={["Month", "Per kg", "11.8 kg cylinder (gas only)"]}
            rows={[
              [`${fmtDate(latest.effectiveFrom)} (latest)`, pkr(latest.perKgPkr), pkr(Math.round(latest.perKgPkr * 11.8))],
              [fmtDate(previous.effectiveFrom), pkr(previous.perKgPkr), pkr(Math.round(previous.perKgPkr * 11.8))],
              [
                "Change",
                `${delta >= 0 ? "+" : "-"}${pkr(Math.abs(Math.round(delta * 100) / 100))} (${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%)`,
                `${delta >= 0 ? "+" : "-"}${pkr(Math.abs(Math.round(delta * 11.8)))}`,
              ],
            ]}
            caption="Figures from the OGRA notifications we have checked. Gas price only."
          />
          <P>
            See the full table on <Link className="underline" href="/lpg-price-in-pakistan/history/">LPG price history</Link>.
            We do not state why one particular month moved unless we can cite a dated source for it.
          </P>
        </>
      ) : null}

      <ContentImage src={media.ograPriceScreen.src} alt={media.ograPriceScreen.alt} caption="OGRA notified price" />

      <H2>What drives the monthly price</H2>
      <SpecTable
        head={["Input", "What it is", "Effect when it rises"]}
        rows={[
          ["International LPG price", "The regional contract price that import cost is built on, often reported as the Saudi Aramco contract price", "Pushes the next notification up"],
          ["Exchange rate (PKR per USD)", "Imported gas is paid for in dollars", "Weaker rupee raises the rupee price"],
          ["Freight and insurance", "Shipping from the Gulf to Pakistani ports", "Adds to the delivered cost"],
          ["Taxes, duties and levies", "Government charges on the product", "Changes in rates move the final price"],
          ["Local production cost", "Gas processing and refinery LPG sold locally", "Linked to the import benchmark"],
          ["Distribution margins and transport", "Bottling, trucking, distributor and delivery cost", "Adds to what you pay at the door"],
        ]}
        caption="Based on public reporting and the general structure of the LPG chain. OGRA's notification is the final word."
      />

      <H2>Why price changes and shortages are not the same thing</H2>
      <P>
        A monthly rise or fall is a price event. A shortage is about stock not reaching cylinders. They can overlap —
        for example when buyers rush before a change — but they are separate. See{" "}
        <Link className="underline" href="/lpg-shortage-pakistan/">LPG shortage in Pakistan</Link> and how{" "}
        <Link className="underline" href="/lpg-supply-in-pakistan/">LPG supply in Pakistan</Link> works.
      </P>

      <H2>How a per-kg change reaches your cylinder</H2>
      <SpecTable
        head={["Change per kg", "5 kg", "11.8 kg", "15 kg", "45.4 kg"]}
        rows={[
          ["Rs 5", "Rs 25", "Rs 59", "Rs 75", "Rs 227"],
          ["Rs 10", "Rs 50", "Rs 118", "Rs 150", "Rs 454"],
          ["Rs 20", "Rs 100", "Rs 236", "Rs 300", "Rs 908"],
          ["Rs 50", "Rs 250", "Rs 590", "Rs 750", "Rs 2,270"],
        ]}
        caption="Cylinder change = change per kg multiplied by the kilograms of gas."
      />

      <H2>What else appears on your bill</H2>
      <UL
        items={[
          <span key="d">{terms.deposit}</span>,
          <span key="e">{terms.exchange}</span>,
          <span key="del">{terms.delivery}</span>,
        ]}
      />

      <H2>How to handle price changes</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>
          Check the notified rate on the 1st of the month on{" "}
          <Link className="underline" href="/lpg-price-in-pakistan/">
            LPG price in Pakistan
          </Link>
          .
        </li>
        <li>Work out your own cost: per kg multiplied by the weight of your cylinder.</li>
        <li>Ask your supplier for gas, delivery and deposit separately.</li>
        <li>Keep the usual number of cylinders. Do not store extra to beat a change.</li>
        <li>
          If a quote looks far above the notified rate, ask what the extra covers, or compare with another licensed
          supplier — see{" "}
          <Link className="underline" href="/how-to-choose-a-licensed-lpg-supplier/">
            how to choose a licensed supplier
          </Link>
          .
        </li>
      </ol>

      <H2>Where the official figure is published</H2>
      <P>
        OGRA publishes the notification on its website under LPG notified prices. We copy a month into our price file
        only after a team member checks it. Read the page on the{" "}
        <Link className="underline" href="/ogra-lpg-notified-price/">OGRA notified LPG price</Link> and how we{" "}
        <Link className="underline" href="/pricing-policy/">quote prices</Link>.
      </P>

      <H2>Order at the current rate</H2>
      <P>
        {company.shortName} (licence {company.licenceNumber}) confirms the full price before you agree. See{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/why-lpg-prices-change-in-pakistan/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/why-lpg-prices-change-in-pakistan/",
          headline: "Why LPG prices change in Pakistan every month",
          description:
            "Why OGRA's LPG price changes each month: international prices, the dollar rate, freight, taxes and margins, with a verified month-to-month change.",
        })}
      />
    </PageShell>
  );
}
