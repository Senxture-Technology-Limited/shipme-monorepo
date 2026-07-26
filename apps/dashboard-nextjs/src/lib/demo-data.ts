import type { Account, Order, RateCard, Shipment } from "./types";

export const shipments: Shipment[] = [
  { id: "SHP-20481", tracking: "DHL-7048-2231", destination: "Singapore", carrier: "DHL", service: "Express Worldwide", status: "In transit", eta: "28 Jul", amount: 428, progress: 68 },
  { id: "SHP-20480", tracking: "FDX-8931-4590", destination: "London, UK", carrier: "FedEx", service: "International Priority", status: "Pending approval", eta: "31 Jul", amount: 612, progress: 12 },
  { id: "SHP-20476", tracking: "UPS-2904-1175", destination: "Tokyo, Japan", carrier: "UPS", service: "Worldwide Saver", status: "Delivered", eta: "24 Jul", amount: 286, progress: 100 },
  { id: "SHP-20471", tracking: "DHL-5820-9134", destination: "Sydney, AU", carrier: "DHL", service: "Express Worldwide", status: "Exception", eta: "Delayed", amount: 534, progress: 45 },
  { id: "SHP-20468", tracking: "FDX-4491-7752", destination: "Berlin, DE", carrier: "FedEx", service: "Economy", status: "In transit", eta: "2 Aug", amount: 398, progress: 52 },
  { id: "SHP-20460", tracking: "UPS-3302-8419", destination: "Seoul, KR", carrier: "UPS", service: "Worldwide Expedited", status: "Delivered", eta: "21 Jul", amount: 255, progress: 100 },
  { id: "SHP-20452", tracking: "DHL-6301-0284", destination: "Toronto, CA", carrier: "DHL", service: "Express Worldwide", status: "Draft", eta: "—", amount: 472, progress: 0 },
  { id: "SHP-20443", tracking: "FDX-7823-5510", destination: "Bangkok, TH", carrier: "FedEx", service: "International Priority", status: "Delivered", eta: "18 Jul", amount: 196, progress: 100 },
];

export const orders: Order[] = [
  { id: "ORD-8172", account: "Northstar Labs", route: "HKG → SFO", parcels: 4, value: 1284, submitted: "8 min ago", risk: "Standard", status: "Pending" },
  { id: "ORD-8171", account: "Aperture Retail", route: "HKG → LHR", parcels: 12, value: 4680, submitted: "18 min ago", risk: "Review", status: "Pending" },
  { id: "ORD-8169", account: "Morrow Studio", route: "HKG → NRT", parcels: 2, value: 548, submitted: "42 min ago", risk: "Standard", status: "Pending" },
  { id: "ORD-8164", account: "Juniper Works", route: "HKG → SYD", parcels: 7, value: 2350, submitted: "1 hr ago", risk: "Review", status: "Approved" },
  { id: "ORD-8158", account: "Orchid Commerce", route: "HKG → SIN", parcels: 3, value: 870, submitted: "3 hrs ago", risk: "Standard", status: "Approved" },
];

export const rateCards: RateCard[] = [
  { id: "RC-140", carrier: "DHL", service: "Express Worldwide", zone: "Asia Pacific", pricePerKg: 86, fuelSurcharge: 18.5, updated: "22 Jul 2026", status: "Active" },
  { id: "RC-139", carrier: "FedEx", service: "International Priority", zone: "North America", pricePerKg: 104, fuelSurcharge: 16, updated: "20 Jul 2026", status: "Active" },
  { id: "RC-138", carrier: "UPS", service: "Worldwide Saver", zone: "Europe", pricePerKg: 98, fuelSurcharge: 17.25, updated: "18 Jul 2026", status: "Active" },
  { id: "RC-137", carrier: "DHL", service: "Economy Select", zone: "Europe", pricePerKg: 72, fuelSurcharge: 14.5, updated: "16 Jul 2026", status: "Draft" },
  { id: "RC-136", carrier: "FedEx", service: "International Economy", zone: "Asia Pacific", pricePerKg: 65, fuelSurcharge: 15.75, updated: "14 Jul 2026", status: "Active" },
];

export const accounts: Account[] = [
  { id: "ACC-0318", company: "Northstar Labs", contact: "Maya Chen", email: "maya@northstarlabs.co", tier: "Enterprise", orders: 184, spend: 126400, status: "Active" },
  { id: "ACC-0311", company: "Aperture Retail", contact: "Jon Bell", email: "jon@apertureretail.com", tier: "Growth", orders: 92, spend: 68450, status: "Review" },
  { id: "ACC-0304", company: "Morrow Studio", contact: "Amelia Wu", email: "amelia@morrow.studio", tier: "Starter", orders: 27, spend: 12820, status: "Active" },
  { id: "ACC-0296", company: "Juniper Works", contact: "Theo Martin", email: "theo@juniperworks.co", tier: "Growth", orders: 71, spend: 49780, status: "Active" },
  { id: "ACC-0282", company: "Orchid Commerce", contact: "Sam Lai", email: "sam@orchidcommerce.hk", tier: "Enterprise", orders: 246, spend: 178320, status: "Suspended" },
];

export const money = (value: number) =>
  new Intl.NumberFormat("en-HK", {
    style: "currency",
    currency: "HKD",
    maximumFractionDigits: 0,
  }).format(value);
