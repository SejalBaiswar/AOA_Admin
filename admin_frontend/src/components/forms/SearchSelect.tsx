import { useEffect, useMemo, useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface SearchSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: Option[];
  disabled?: boolean;
}

export default function SearchSelect({
  value,
  onChange,
  placeholder,
  options,
  disabled,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  /* ---------- SELECTED LABEL ---------- */
  const selectedLabel = useMemo(() => {
    return options.find((o) => o.value === value)?.label ?? "";
  }, [options, value]);

  /* ---------- OUTSIDE CLICK (USE CLICK, NOT MOUSEDOWN) ---------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  /* ---------- FILTER ---------- */
  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();

    return options.filter((o) => {
      return (
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
      );
    });
  }, [options, search]);

  return (
    <div ref={ref} className="relative">
      {/* DISPLAY */}
      <input
        readOnly
        disabled={disabled}
        value={selectedLabel}
        placeholder={placeholder}
        onClick={() => {
          if (disabled) return;
          setSearch("");
          setOpen(true);
        }}
        className="h-9 w-full rounded-md border px-3 cursor-pointer bg-white"
      />

      {open && (
        <div
          className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow"
          onClick={(e) => e.stopPropagation()} // ✅ CRITICAL
        >
          {/* SEARCH */}
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full border-b px-3 py-2 text-sm outline-none"
          />

          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-500">No results</div>
            )}

            {filteredOptions.map((o) => (
              <div
                key={`${o.value}-${o.label}`} // ✅ UNIQUE
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                {o.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
