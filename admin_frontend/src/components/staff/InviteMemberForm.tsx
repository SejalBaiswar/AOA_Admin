import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddressFields from "../common/AddressFields";
import RequiredLabel from "../common/RequiredLabel";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useCountries } from "../../hooks/useCountries";

import {
  inviteMemberSchema,
  type InviteMemberFormValues,
} from "../staff/inviteMember.schema";

export default function InviteMemberForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const inputClass =
    "h-9 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";

  const selectClass =
    "h-9 w-full rounded-md border px-3 text-sm shadow-none focus:outline-none focus:ring-0";

  const form = useForm<InviteMemberFormValues>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      specialization: "",
      practitionerType: "",
      addresses: [
        {
          addressType: "",
          country: "",
          state: "",
          city: "",
          zip: "",
          zipCode: "",
          street: "",
          house_no: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  const countries = useCountries();

  const onSubmit = async (data: InviteMemberFormValues) => {
    const payload = {
      firstName: data.firstName,
      middleName: data.middleName || null,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      specialization: data.specialization || null,
      practitionerType: data.practitionerType || null,
      status: "Active",
      addresses: data.addresses.map((addr) => ({
        addressType: addr.addressType,
        country: addr.country,
        state: addr.state,
        city: addr.city,
        zip: addr.zip,
        zipCode: addr.zipCode || addr.zip,
        street: addr.street,
        house_no: addr.house_no,
      })),
    };

    await fetch("http://localhost:5000/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    form.reset();
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* ---------- PERSONAL INFO ---------- */}
        <h3 className="text-sm font-bold">Personal Information</h3>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredLabel>First name</RequiredLabel>
                </FormLabel>
                <FormControl>
                  <Input {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle name</FormLabel>
                <FormControl>
                  <Input {...field} className={inputClass} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredLabel>Last name</RequiredLabel>
                </FormLabel>
                <FormControl>
                  <Input {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredLabel>Email</RequiredLabel>
                </FormLabel>
                <FormControl>
                  <Input {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredLabel>Phone number</RequiredLabel>
                </FormLabel>
                <FormControl>
                  <Input {...field} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ---------- PROFESSIONAL INFO ---------- */}
        <h3 className="text-sm font-bold">Professional Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <select {...field} className={selectClass}>
                    <option value="">Select</option>
                    <option>General Dentist</option>
                    <option>Orthodontist</option>
                    <option>Endodontics</option>
                    <option>Periodontist</option>
                    <option>Dental Anesthesiology</option>
                    <option>Dentistry</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="practitionerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provider Type</FormLabel>
                <FormControl>
                  <select {...field} className={selectClass}>
                    <option value="">Select</option>
                    <option>Practice</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* ---------- ADDRESSES (FLAT LIKE PARTNER FORM) ---------- */}
        <h3 className="text-sm font-bold">Addresses</h3>

        {fields.map((item, index) => (
          <AddressFields
            key={item.id}
            form={form}
            index={index}
            countries={countries}
            remove={remove}
            canRemove={fields.length > 1}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              addressType: "",
              country: "",
              state: "",
              city: "",
              zip: "",
              zipCode: "",
              street: "",
              house_no: "",
            })
          }
        >
          + Add another address
        </Button>

        {/* ---------- ACTION ---------- */}
        <div className="flex justify-end">
          <Button
            type="submit"
            style={{ background: "var(--brand-orange)" }}
            className="hover:opacity-70 transition-opacity duration-200"
          >
            Invite Practice
          </Button>
        </div>
      </form>
    </Form>
  );
}
