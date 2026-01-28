export type PartnerStatus = "Active" | "Inactive";

export interface PartnerAddress {
  country: string;
  state: string;
  city: string;
  street?: string;
  houseNo?: string;
}

export interface Partner {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  practitionerType?: string;
  addresses: PartnerAddress[];
  status: PartnerStatus;
}
