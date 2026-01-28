import { useForm, useFieldArray} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddressFields from "./AddressFields";
import RequiredLabel from "./RequiredLabel";

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

// import SearchSelect from "./SearchSelect";

import { useCountries } from "../../hooks/useCountries";

import {
  inviteMemberSchema,
  type InviteMemberFormValues,
} from "./inviteMember.schema";

export default function InviteMemberForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
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
    console.log("Form Data", data);
    console.log("Submit Triggered");

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
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <RequiredLabel> Last name</RequiredLabel>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabel>Email</RequiredLabel>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ---------- PHONE ---------- */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabel>Phone number</RequiredLabel>
              </FormLabel>
              <FormControl>
                <Input placeholder="9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ---------- PROFESSIONAL INFO ---------- */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="h-9 w-full rounded-md border px-3"
                  >
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
                  <select
                    {...field}
                    className="h-9 w-full rounded-md border px-3"
                  >
                    <option value="">Select</option>
                    <option>Practice</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* ---------- ADDRESSES ---------- */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Addresses</h3>

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
        </div>

        {/* ---------- ACTIONS ---------- */}
        <div className="flex justify-end">
          <Button type="submit" style={{ background: "var(--brand-red)" }}>
            Invite Practice
          </Button>
        </div>
      </form>
    </Form>
  );
}
