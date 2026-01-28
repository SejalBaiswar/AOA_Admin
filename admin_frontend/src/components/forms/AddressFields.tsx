import { Controller, type UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import SearchSelect from "./SearchSelect";
import { useStates } from "../../hooks/useStates";
import { useCities } from "../../hooks/useCities";

import type { InviteMemberFormValues } from "../forms/inviteMember.schema";

/* ---------- TYPES ---------- */

interface AddressFieldsProps {
  form: UseFormReturn<InviteMemberFormValues>;
  index: number;
  countries: string[];
  remove: (index: number) => void;
  canRemove: boolean;
}

export default function AddressFields({
  form,
  index,
  countries,
  remove,
  canRemove,
}: AddressFieldsProps) {
  const country = form.watch(`addresses.${index}.country`);
  const state = form.watch(`addresses.${index}.state`);

  const states = useStates(country);
  const cities = useCities(country, state);

  return (
    <div className="rounded-lg border p-4 space-y-4">
      {/* Address Type */}
      <Input
        placeholder="Address type"
        {...form.register(`addresses.${index}.addressType`)}
      />

      {/* COUNTRY */}
      <Controller
        control={form.control}
        name={`addresses.${index}.country`}
        render={({ field }) => (
          <SearchSelect
            placeholder="Country"
            value={field.value}
            onChange={(v: string) => {
              field.onChange(v);
              form.setValue(`addresses.${index}.state`, "");
              form.setValue(`addresses.${index}.city`, "");
            }}
            options={countries.map((c) => ({
              label: c,
              value: c,
            }))}
          />
        )}
      />

      {/* STATE */}
      <Controller
        control={form.control}
        name={`addresses.${index}.state`}
        render={({ field }) => (
          <SearchSelect
            placeholder="State"
            value={field.value}
            disabled={!country}
            onChange={(v: string) => {
              field.onChange(v);
              form.setValue(`addresses.${index}.city`, "");
            }}
            options={states.map((s) => ({
              label: s,
              value: s,
            }))}
          />
        )}
      />

      {/* CITY */}
      <Controller
        control={form.control}
        name={`addresses.${index}.city`}
        render={({ field }) => (
          <SearchSelect
            placeholder="City"
            value={field.value}
            disabled={!state}
            onChange={(v: string) => field.onChange(v)}
            options={cities.map((c) => ({
              label: c,
              value: c,
            }))}
          />
        )}
      />

      {/* ZIP / STREET / HOUSE NO */}
      <div className="grid grid-cols-3 gap-4">
        <Input placeholder="ZIP" {...form.register(`addresses.${index}.zip`)} />
        <Input
          placeholder="Street"
          {...form.register(`addresses.${index}.street`)}
        />
        <Input
          placeholder="House No"
          {...form.register(`addresses.${index}.house_no`)}
        />
      </div>

      {/* REMOVE */}
      {canRemove && (
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(index)}
          style={{ background: "var(--brand-red)" }}
        >
          Remove address
        </Button>
      )}
    </div>
  );
}
