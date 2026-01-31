import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { partnerSchema, type PartnerFormValues } from "./partner.schema";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SearchSelect from "../common/SearchSelect";
import RequiredLabel from "../common/RequiredLabel";

import { useCountries } from "../../hooks/useCountries";
import { useStates } from "../../hooks/useStates";
import { useCities } from "../../hooks/useCities";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

interface Props {
  onSuccess: () => void;
}

export default function PartnerForm({ onSuccess }: Props) {
  const countries = useCountries();

  /* ---------- COMMON CLASSES ---------- */
  const inputClass =
    "h-9 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";

  const selectClass =
    "h-9 w-full rounded-md border px-3 text-sm shadow-none focus:outline-none focus:ring-0";

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      practitionerType: "",
      country: "",
      state: "",
      city: "",
      street: "",
      house_no: "",
    },
  });

  /* ---------- WATCH DEPENDENCIES ---------- */
  const selectedCountry = form.watch("country");
  const selectedState = form.watch("state");

  /* ---------- DEPENDENT DATA ---------- */
  const states = useStates(selectedCountry);
  const cities = useCities(selectedCountry, selectedState);

  /* ---------- RESET CASCADE ---------- */
  if (!selectedCountry && form.getValues("state")) {
    form.setValue("state", "");
    form.setValue("city", "");
  }

  if (!selectedState && form.getValues("city")) {
    form.setValue("city", "");
  }

  const onSubmit = async (data: PartnerFormValues) => {
    await axios.post("http://localhost:5000/partners", {
      ...data,
      practitionerType: data.practitionerType || null,
      street: data.street || null,
      house_no: data.house_no || null,
      status: "Active",
    });

    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="text-sm font-bold">Personal Information</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* ---------- BASIC INFO ---------- */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredLabel>Partner name</RequiredLabel>
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

          {/* ---------- PROVIDER TYPE ---------- */}
          <FormField
            control={form.control}
            name="practitionerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provider Type</FormLabel>
                <FormControl>
                  <select {...field} className={selectClass}>
                    <option value="">Select</option>
                    <option value="Lab">Lab</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* ---------- LOCATION ---------- */}
        <h3 className="text-sm font-bold">Addresses</h3>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredLabel>Country</RequiredLabel>
                </FormLabel>
                <SearchSelect
                  placeholder="Country"
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    form.setValue("state", "");
                    form.setValue("city", "");
                  }}
                  options={countries.map((c) => ({
                    label: c,
                    value: c,
                  }))}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredLabel>State</RequiredLabel>
                </FormLabel>
                <SearchSelect
                  placeholder="State"
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    form.setValue("city", "");
                  }}
                  options={states.map((s) => ({
                    label: s,
                    value: s,
                  }))}
                  disabled={!selectedCountry}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <RequiredLabel>City</RequiredLabel>
                </FormLabel>
                <SearchSelect
                  placeholder="City"
                  value={field.value}
                  onChange={field.onChange}
                  options={cities.map((c) => ({
                    label: c,
                    value: c,
                  }))}
                  disabled={!selectedState}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input {...field} className={inputClass} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="house_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House No</FormLabel>
                <FormControl>
                  <Input {...field} className={inputClass} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* ---------- ACTION ---------- */}
        <div className="flex justify-end">
          <Button
            type="submit"
            style={{ background: "var(--brand-orange)" }}
            className="hover:opacity-70 transition-opacity duration-200"
          >
            Add partner
          </Button>
        </div>
      </form>
    </Form>
  );
}
