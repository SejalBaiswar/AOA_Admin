import { Sheet, SheetContent } from "../ui/sheet";
import type { Partner } from "../../types/partner";
 import {
  User,
  Phone,
  Briefcase,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";

interface ViewPartnerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partner: Partner | null;
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold text-black-700">{label}</span>
      <span className="text-sm font-medium text-gray-600">{value || "-"}</span>
    </div>
  );
}

export default function ViewPartnerSheet({
  open,
  onOpenChange,
  partner,
}: ViewPartnerSheetProps) {
  if (!partner) return null;

  const address = partner.addresses?.[0];

  return (
  

<Sheet open={open} onOpenChange={onOpenChange}>
  <SheetContent
    side="right"
    className="
      w-full
      sm:w-[700px]
      lg:w-[500px]
      sm:max-w-[700px]
      lg:max-w-[900px]
      h-full
      overflow-hidden
      p-0
    "
  >
    {/* HEADER */}
    <div className="border-b px-6 py-4 bg-red-50">
      <h2 className="text-lg font-semibold">Partner Details</h2>
    </div>

    <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-6 space-y-6">
      {/* ================= BASIC INFO ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <User className="h-4 w-4 text-gray-600" />
          <CardTitle className="text-sm">Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Field label="Partner name" value={partner.name} />
          <Field label="Email" value={partner.email} />
        </CardContent>
      </Card>

      {/* ================= CONTACT INFO ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Phone className="h-4 w-4 text-gray-600" />
          <CardTitle className="text-sm">Contact Information</CardTitle>
        </CardHeader>

        <CardContent>
          <Field label="Phone number" value={partner.phoneNumber} />
        </CardContent>
      </Card>

      {/* ================= PROFESSIONAL INFO ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Briefcase className="h-4 w-4 text-gray-600" />
          <CardTitle className="text-sm">Professional Information</CardTitle>
        </CardHeader>

        <CardContent>
          <Field
            label="Producer Type"
            value={partner.practitionerType}
          />
        </CardContent>
      </Card>

      {/* ================= STATUS ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-gray-600" />
          <CardTitle className="text-sm">Status</CardTitle>
        </CardHeader>

        <CardContent>
          <Field label="Current status" value={partner.status} />
        </CardContent>
      </Card>

      {/* ================= ADDRESS ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-600" />
          <CardTitle className="text-sm">Address Information</CardTitle>
        </CardHeader>

        <CardContent>
          {address ? (
            <div className="rounded-lg border p-4 space-y-4 bg-muted/30">
              <Field label="Country" value={address.country} />

              <div className="grid grid-cols-2 gap-6">
                <Field label="State" value={address.state} />
                <Field label="City" value={address.city} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Field label="Street" value={address.street} />
                <Field label="House No" value={address.houseNo} />
              </div>
            </div>
          ) : (
            <span className="text-sm text-gray-500">
              No address information available
            </span>
          )}
        </CardContent>
      </Card>
    </div>
  </SheetContent>
</Sheet>

  );
}
