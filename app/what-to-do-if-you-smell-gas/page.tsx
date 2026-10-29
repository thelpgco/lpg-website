import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SafetyReview from "@/components/SafetyReview";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/what-to-do-if-you-smell-gas/" });

const steps = [
  [
    "Do not create a spark",
    "No flames, matches or lighters. Do not switch lights or fans on or off, and do not use plugs or electrical switches near the smell.",
  ],
  [
    "Close the cylinder valve, if it is safe",
    "If you can reach the valve without going into a strong gas smell, turn it off. If the smell is strong, do not go in.",
  ],
  [
    "Open doors and windows",
    "Let air in. LPG is heavier than air and collects low, so ventilate near the floor if you can.",
  ],
  [
    "Get everyone out",
    "Take people and animals outside, away from the building, and keep them away.",
  ],
  [
    "Call for help from outside",
    "From a safe distance, call 1122 (rescue and emergency) or your local fire service, then your gas supplier. If 1122 is not active in your area, use your local emergency number. Use your phone only once you are outside.",
  ],
  [
    "Do not go back in",
    "Do not re-enter or switch the gas on again until a qualified person has checked and said it is safe.",
  ],
];

const faqs = [
  {
    q: "What does LPG gas smell like?",
    a: "It is usually described as rotten eggs or cabbage. The smell comes from an odorant added to the gas, because LPG has almost no smell of its own.",
  },
  {
    q: "Why is my LPG flame yellow?",
    a: "A healthy LPG flame is mostly blue. A yellow or orange flame often means the gas and air are not mixing well, for example because a burner is blocked or dirty. It can make carbon monoxide, so switch it off and have it checked.",
  },
  {
    q: "Should I open windows if I smell gas?",
    a: "Yes, if you can do it without creating a spark or going deeper into the smell. Then leave and call for help from outside.",
  },
  {
    q: "Should I use my phone inside if I smell gas?",
    a: "No. Do not use a phone, switch or doorbell inside the gas smell. Call 1122 only after you are outside at a safe distance.",
  },
  {
    q: "What if I cannot smell the odorant well?",
    a: "Some people cannot detect the smell clearly, and the odorant can fade. Do not rely on your nose alone — check joints with soapy water whenever you change a cylinder, and consider a low-mounted LPG leak detector.",
  },
  {
    q: "Can LPG gas kill you?",
    a: "Yes, indirectly. LPG is not very toxic, but a leak can catch fire or explode, and in a closed room it can push out the air you breathe. A poorly burning LPG appliance also makes carbon monoxide, which is poisonous.",
  },
  {
    q: "Who should I call after 1122?",
    a: `Once you are safe outside, call your gas supplier. For ${company.shortName} customers: ${site.phoneDisplay}. Do not call from inside the gas smell.`,
  },
  {
    q: "When can I use the cylinder again?",
    a: "Only after a qualified person has inspected the cylinder, hose, regulator and connections and said it is safe. Do not reopen the valve yourself after a serious leak.",
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "LPG safety", href: "/lpg-safety/" },
        { name: "If you smell gas", href: "/what-to-do-if-you-smell-gas/" },
      ]}
      h1="What to do if you smell LPG gas (and why LPG gas smells)"
      intro="A gas smell is an emergency — follow these steps in order and put your safety first. LPG has almost no smell of its own: a strong-smelling chemical is added so that you notice a leak. That is why LPG gas smells."
    >
      <Note tone="danger" title="Do not use the order form in an emergency">
        <p>
          Leave the area first, then call <strong>1122</strong> from a safe distance.
        </p>
      </Note>
      <ol className="mt-6 space-y-3">
        {steps.map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>

      <H2>What not to do</H2>
      <UL
        items={[
          "Do not light a match or lighter to look for the leak.",
          "Do not use a phone, switch or doorbell inside the gas smell.",
          "Do not start a vehicle or generator near the leak.",
          "Do not rely on your nose alone. Some people cannot smell the odorant well, and the smell can fade.",
        ]}
      />

      <H2>Why does LPG gas smell?</H2>
      <P>
        LPG itself has almost no smell. Suppliers add a strong-smelling odorant, commonly described as rotten eggs or
        cabbage, so that a leak is noticed before gas reaches a dangerous level. If you smell it, treat it as a real
        leak. To learn more about the gas itself, read <Link className="underline" href="/what-is-lpg/">what LPG is</Link>{" "}
        and <Link className="underline" href="/lpg-composition-and-properties/">composition and properties</Link>.
      </P>

      <H2>Can LPG gas kill you?</H2>
      <P>
        Yes, indirectly. LPG is not very toxic, but a leak can catch fire or explode, and in a closed room it can push
        out the air you breathe. A poorly burning LPG stove, geyser or heater also makes carbon monoxide, a poisonous
        gas with no smell. This is why leaks must be taken seriously and appliances need fresh air. See the full{" "}
        <Link className="underline" href="/lpg-safety/">LPG hazards and safety guide</Link>.
      </P>

      <H2>Why LPG collects low</H2>
      <P>
        LPG vapour is heavier than air. It sinks and can collect near floors, in basements and in drains. That is why
        you ventilate near the floor, never store cylinders below ground, and mount an{" "}
        <Link className="underline" href="/lpg-leak-detector/">LPG leak detector</Link> low — about 30 cm above the
        floor — not high on the wall like a natural-gas alarm.
      </P>

      <H2>After the leak</H2>
      <P>
        Have the cylinder, hose, regulator and connections inspected before you use them again. Check{" "}
        <Link className="underline" href="/lpg-regulator-problems-and-repair/">regulator problems and repair</Link> if
        the leak was at the valve or hose. We can help with an{" "}
        <Link className="underline" href="/services/lpg-safety-audit-and-inspection/">LPG safety inspection</Link>. You
        can reach {company.shortName} on {site.phoneDisplay}, but do not call from inside the gas smell.
      </P>

      <H2>When you need a replacement cylinder</H2>
      <P>
        After the area is declared safe, order a certified replacement through{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link> or see{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link>. Until then, keep everyone out and
        leave the old cylinder closed.
      </P>

      <ImageGallery items={itemsFor("/what-to-do-if-you-smell-gas/")} title="Photos" />
      <Faq items={faqs} />
      <SafetyReview path="/what-to-do-if-you-smell-gas/" name="What to do if you smell LPG gas" />
      <JsonLd
        data={articleNode({
          path: "/what-to-do-if-you-smell-gas/",
          headline: "What to do if you smell LPG gas (and why LPG gas smells)",
          description:
            "The steps to take straight away if you smell LPG, what not to do, why LPG gas smells, why it collects low, and when you can use the cylinder again.",
        })}
      />
    </PageShell>
  );
}
