import { useEffect, useRef, useState } from "react";
import type { Member } from "../types/member";
interface ActionMenuProps {
  member: Member;
  status: "Active" | "Inactive";
  onToggleStatus: (member: Member) => void;
  onView: (member: Member) => void;
}

export default function ActionMenu({
  member,
  status,
  onToggleStatus,
  onView,
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Three dots button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        ⋯
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "28px",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 50,
            minWidth: "140px",
          }}
        >
          <div
            onClick={() => {
              onToggleStatus(member);
              setOpen(false);
            }}
            style={menuItem}
          >
            {status === "Active" ? "Deactivate" : "Activate"}
          </div>

          <div
            onClick={() => {
              onView(member);
              setOpen(false);
            }}
            style={menuItem}
          >
            View details
          </div>
        </div>
      )}
    </div>
  );
}

const menuItem: React.CSSProperties = {
  padding: "10px 12px",
  fontSize: "13px",
  cursor: "pointer",
  borderBottom: "1px solid #f1f5f9",
};


