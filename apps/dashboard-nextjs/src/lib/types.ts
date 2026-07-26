export type ShipmentStatus =
  | "Draft"
  | "Pending approval"
  | "In transit"
  | "Delivered"
  | "Exception";

export type Shipment = {
  id: string;
  tracking: string;
  destination: string;
  carrier: "DHL" | "FedEx" | "UPS";
  service: string;
  status: ShipmentStatus;
  eta: string;
  amount: number;
  progress: number;
};

export type Order = {
  id: string;
  account: string;
  route: string;
  parcels: number;
  value: number;
  submitted: string;
  risk: "Standard" | "Review";
  status: "Pending" | "Approved" | "Rejected";
};

export type RateCard = {
  id: string;
  carrier: "DHL" | "FedEx" | "UPS";
  service: string;
  zone: string;
  pricePerKg: number;
  fuelSurcharge: number;
  updated: string;
  status: "Active" | "Draft";
};

export type Account = {
  id: string;
  company: string;
  contact: string;
  email: string;
  tier: "Starter" | "Growth" | "Enterprise";
  orders: number;
  spend: number;
  status: "Active" | "Review" | "Suspended";
};
