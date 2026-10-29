import demoProducts from "@/data/demo/products.json";
import { isDemo } from "@/lib/mode";
import { cylinderPrice, latestPrice, pkr } from "@/lib/prices";

export type CylinderProduct = {
  id: string;
  sku: string;
  name: string;
  type: string;
  gasKg: number;
  tareKgApprox?: number;
  heightMmApprox?: number;
  diameterMmApprox?: number;
  typicalUse: string;
  demoDepositPkr?: number;
  demoNewEmptyPkr?: number;
  demoDeliveryFeePkr?: number;
  valve?: string;
  demoStock?: string;
};

export type ApplianceProduct = {
  id: string;
  name: string;
  category: string;
  demoPricePkr?: number;
  demoPriceNote?: string;
  features?: string[];
};

const demoCylinders = (demoProducts as { cylinders: CylinderProduct[] }).cylinders;
const demoAppliances = (demoProducts as { appliances: ApplianceProduct[] }).appliances;

/** Production catalogue stays empty of invented SKUs until owner inventory is filed. */
const productionCylinders: CylinderProduct[] = [
  {
    id: "cyl-5",
    sku: "CYL-STEEL-5",
    name: "5 kg domestic LPG cylinder",
    type: "steel",
    gasKg: 5,
    typicalUse: "Light home use, portable stoves, small kitchens",
    valve: "Standard domestic valve (confirm regulator fit on order)",
  },
  {
    id: "cyl-118",
    sku: "CYL-STEEL-118",
    name: "11.8 kg domestic LPG cylinder (often called 12 kg)",
    type: "steel",
    gasKg: 11.8,
    typicalUse: "Standard Pakistan household cylinder",
    valve: "Standard domestic valve",
  },
  {
    id: "cyl-15",
    sku: "CYL-STEEL-15",
    name: "15 kg LPG cylinder",
    type: "steel",
    gasKg: 15,
    typicalUse: "Larger households and small food businesses",
    valve: "Standard domestic / light commercial valve",
  },
  {
    id: "cyl-454",
    sku: "CYL-STEEL-454",
    name: "45.4 kg commercial LPG cylinder",
    type: "steel",
    gasKg: 45.4,
    typicalUse: "Restaurants, hotels, commercial kitchens",
    valve: "Commercial valve — trained handling required",
  },
  {
    id: "cyl-comp-125",
    sku: "CYL-COMP-125",
    name: "Composite fibre LPG cylinder",
    type: "composite",
    gasKg: 12.5,
    typicalUse: "Homes wanting a lighter bottle and visible liquid level — city stock confirmed on order",
    valve: "Composite-compatible regulator required",
  },
];

export function cylinders(): CylinderProduct[] {
  return isDemo() ? demoCylinders : productionCylinders;
}

export function cylinderByGasKg(kg: number): CylinderProduct | undefined {
  return cylinders().find((c) => Math.abs(c.gasKg - kg) < 0.05);
}

export function appliances(): ApplianceProduct[] {
  return isDemo() ? demoAppliances : [];
}

export function gasCostLabel(kg: number): string | null {
  const n = cylinderPrice(kg);
  return n != null ? pkr(n) : null;
}

export function shellCostLabel(c: CylinderProduct, kind: "deposit" | "newEmpty"): string {
  if (isDemo()) {
    const v = kind === "deposit" ? c.demoDepositPkr : c.demoNewEmptyPkr;
    return v != null ? pkr(v) : "Quoted on order";
  }
  return "Quoted for your size and city before you agree";
}

export function deliveryFeeLabel(c: CylinderProduct): string {
  if (isDemo() && c.demoDeliveryFeePkr != null) {
    return pkr(c.demoDeliveryFeePkr);
  }
  return "Confirmed with the distributor for your area before you agree";
}

export function priceMonthLabel(): string {
  return latestPrice?.month || "current month";
}
