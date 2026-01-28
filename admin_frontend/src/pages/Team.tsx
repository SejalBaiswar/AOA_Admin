import { useEffect, useState } from "react";
import UserFormSheet from "../components/forms/UserFormSheet";
import ViewMemberSheet from "../components/forms/ViewMemberSheet";
import ActionMenu from "../components/ActionMenu";
import type { Member, MemberStatus } from "../types/member";

/* ---------- TYPES ---------- */

export default function Team() {
  const [openSheet, setOpenSheet] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  /* ---------- FETCH MEMBERS ---------- */
  const fetchMembers = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:5000/members");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error("Failed to fetch members", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  /* ---------- STATUS TOGGLE (unchanged) ---------- */
  const toggleStatus = async (member: Member): Promise<void> => {
    const newStatus: MemberStatus =
      member.status === "Active" ? "Inactive" : "Active";

    await fetch(`http://localhost:5000/members/${member.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setMembers((prev) =>
      prev.map((m) => (m.id === member.id ? { ...m, status: newStatus } : m)),
    );
  };

  return (
    <>
      {/* Breadcrumb */}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-semibold">Practices</h1>

        <button
          onClick={() => setOpenSheet(true)}
          style={{
            height: "36px",
            backgroundColor: "var(--brand-red)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "0 16px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Invite a Practice
        </button>
      </div>

      {/* ---------- SHEET ---------- */}
      <UserFormSheet
        open={openSheet}
        onOpenChange={setOpenSheet}
        onSuccess={fetchMembers}
      />
      <ViewMemberSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        member={selectedMember}
      />

      {/* ---------- TABLE ---------- */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          height: "100vh",
        }}
      >
        <table className="w-full text-sm"
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            fontSize: "14px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "var(--table-header)",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {[
                "First name",
                "Last name",
                "Email",
                "Speciality",
                "Role",
                "Location",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    fontWeight: 700,
                    color: "#374151",
                    fontSize: "13px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} style={emptyCell}>
                  Loading...
                </td>
              </tr>
            )}

            {!loading && members.length === 0 && (
              <tr>
                <td colSpan={8} style={emptyCell}>
                  No members found
                </td>
              </tr>
            )}

            {members.map((m) => {
              const address = m.addresses?.[0];
              const status: MemberStatus = m.status ?? "Active";

              return (
                <tr key={m.id}>
                  <td style={cell}>{m.firstName}</td>
                  <td style={cell}>{m.lastName}</td>
                  <td style={{ ...cell, color: "#2563eb" }}>{m.email}</td>
                  <td style={cell}>
                    {m.specialization ?? m.professionalInfo?.specialization ?? "-"}
                  </td>
                  <td style={cell}>
                    {m.practitionerType ?? m.professionalInfo?.practitionerType ?? "-"}
                  </td>
                  <td style={cell}>
                    {address ? `${address.city}, ${address.state}` : "-"}
                  </td>
                  <td style={cell}>
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 500,
                        background: status === "Active" ? "#dcfce7" : "#fee2e2",
                        color: status === "Active" ? "#166534" : "#991b1b",
                      }}
                    >
                      {status === "Active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={cell}>
                    <ActionMenu
                      member={m}
                      status={status}
                      onToggleStatus={toggleStatus}
                      onView={(member) => {
                        setSelectedMember(member);
                        setViewOpen(true);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ---------- STYLES ---------- */

const cell: React.CSSProperties = {
  padding: "14px 16px",
  color: "#374151",
  verticalAlign: "middle",
};

const emptyCell: React.CSSProperties = {
  padding: "24px",
  textAlign: "center",
  color: "#6b7280",
};
