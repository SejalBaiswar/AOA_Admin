import { Controller, type UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import SearchSelect from "./SearchSelect";
import { useStates } from "../../hooks/useStates";
import { useCities } from "../../hooks/useCities";

import type { InviteMemberFormValues } from "../staff/inviteMember.schema";

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

  const inputClass =
    "h-9 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";

  return (
    <div className="space-y-4">
      {/* ---------- ROW 1 : ADDRESS TYPE + COUNTRY ---------- */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Address type"
          {...form.register(`addresses.${index}.addressType`)}
          className={inputClass}
        />

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
      </div>

      {/* ---------- ROW 2 : STATE + CITY ---------- */}
      <div className="grid grid-cols-2 gap-4">
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
      </div>

      {/* ---------- ROW 3 : ZIP + STREET ---------- */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="ZIP"
          {...form.register(`addresses.${index}.zip`)}
          className={inputClass}
        />

        <Input
          placeholder="Street"
          {...form.register(`addresses.${index}.street`)}
          className={inputClass}
        />
      </div>

      {/* ---------- ROW 4 : HOUSE NO ---------- */}
      <Input
        placeholder="House No"
        {...form.register(`addresses.${index}.house_no`)}
        className={inputClass + " w-84  text-sm px-2"}
      />

      {/* ---------- ROW 5 : REMOVE BUTTON ---------- */}
      {canRemove && (
        <div>
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Remove address
          </Button>
        </div>
      )}
    </div>
  );
}
