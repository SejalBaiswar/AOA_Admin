import { z } from "zod";

export const partnerSchema = z.object({
  name: z
    .string()
    .min(1, "Partner name is required")
    .min(3, "Partner name must be at least 3 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must contain @ and valid domain (.com, .in, etc.)"),

  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),

  practitionerType: z.string().optional(),

  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().optional(),
  house_no: z.string().optional(),
});

export type PartnerFormValues = z.infer<typeof partnerSchema>;
