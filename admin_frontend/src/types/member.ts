/* ---------- ADDRESS ---------- */
export type Address = {
  addressType?: string;
  country: string;
  state: string;
  city: string;
  zip?: string;
  zipCode?: string;
  street?: string;
  houseNo?: string;
};

/* ---------- PROFESSIONAL INFO ---------- */
export type ProfessionalInfo = {
  specialization?: string;
  practitionerType?: string;
};

/* ---------- MEMBER STATUS ---------- */
export type MemberStatus = "Active" | "Inactive";

/* ---------- MEMBER ---------- */
export type Member = {
  id: number;

  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;

  phoneNumber?: string;

  specialization?: string;
  practitionerType?: string;

  status?: MemberStatus;

  professionalInfo?: ProfessionalInfo;
  addresses?: Address[];
};
