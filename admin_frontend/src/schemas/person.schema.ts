import { z } from "zod";

/* ---------- ADDRESS ---------- */
export const addressSchema = z.object({
  addressType: z.string().optional(),
  country: z.string().min(1, "Country required"),
  state: z.string().min(1, "State required"),
  city: z.string().min(1, "City required"),
  zip: z.string().optional(),
  street: z.string().optional(),
});

/* ---------- COMMON PERSON FIELDS ---------- */
export const basePersonSchema = {
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters"),

  middleName: z.string().optional(),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .min(3, "Last name must be at least 3 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must contain @ and valid domain (.com, .in, etc.)"),


  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
};
