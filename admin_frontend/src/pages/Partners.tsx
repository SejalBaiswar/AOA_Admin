import { useEffect, useState } from "react";
import PartnerFormSheet from "../components/partners/PartnerFormSheet";
import ViewPartnerSheet from "../components/partners/ViewPartnerSheet";
import type { Partner, PartnerStatus } from "../types/partner";
import PartnerActionMenu from "../components/partners/PartnerActionMenu";

export default function Partners() {
  const [openSheet, setOpenSheet] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPartners = async () => {
    try {
      const res = await fetch("http://localhost:5000/partners");
      const data = await res.json();
      setPartners(data);
    } catch (e) {
      console.error(e && "Failed to fetch partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const toggleStatus = async (partner: Partner) => {
    const newStatus: PartnerStatus =
      partner.status === "Active" ? "Inactive" : "Active";

    await fetch(`http://localhost:5000/partners/${partner.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setPartners((prev) =>
      prev.map((p) => (p.id === partner.id ? { ...p, status: newStatus } : p)),
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-semibold">Partners</h1>

        <button
          onClick={() => setOpenSheet(true)}
          className="h-9 rounded-md bg-red-600 px-4 text-sm font-medium text-white"
          style={{ backgroundColor: "var(--brand-red)" }}
        >
          Add Partner
        </button>
      </div>

      <PartnerFormSheet
        open={openSheet}
        onOpenChange={setOpenSheet}
        onSuccess={fetchPartners}
      />
      <ViewPartnerSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        partner={selectedPartner}
      />

      <div
        className=""
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          height: "100vh",
        }}
      >
        <table className="w-full text-sm">
          <thead style={{ background: "var(--table-header)" }}>
            <tr>
              {["Name", "Email", "Phone", "Location", "Status", "Action"].map(
                (h) => (
                  <th key={h}  style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    fontWeight: 700,
                    color: "#374151",
                    fontSize: "13px",
                    borderBottom: "1px solid #e5e7eb",
                  }}>
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              partners.map((p) => {
                const addr = p.addresses[0];
                return (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3 text-blue-600">{p.email}</td>
                    <td className="px-4 py-3">
                      {p.phoneNumber || "-"}
                    </td>
                    <td className="px-4 py-3">
                      {addr ? `${addr.city}, ${addr.state}` : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          p.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <PartnerActionMenu
                        partner={p}
                        onToggleStatus={toggleStatus}
                        onView={(partner) => {
                          setSelectedPartner(partner);
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
