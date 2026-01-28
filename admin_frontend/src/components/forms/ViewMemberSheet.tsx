import { Sheet, SheetContent,} from "../ui/sheet";

import type { Member } from "../../types/member";
import {
  User,
  
  Phone,
  Briefcase,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

/* ---------- TYPES ---------- */

interface ViewMemberSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member | null;
}

/* ---------- SMALL REUSABLE FIELD ---------- */
function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold text-black-700">{label}</span>
      <span className="text-sm font-medium text-gray-600">{value || "-"}</span>
    </div>
  );
}

export default function ViewMemberSheet({
  open,
  onOpenChange,
  member,
}: ViewMemberSheetProps) {
  if (!member) return null;

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
      <h2 className="text-lg font-semibold">Practice Details</h2>
    </div>

    <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-6 space-y-6">
      {/* ================= PERSONAL INFO ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <User className="h-4 w-4 text-gray-600" />
          <CardTitle className="text-sm">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            <Field label="First name" value={member.firstName} />
            <Field label="Middle name" value={member.middleName} />
            <Field label="Last name" value={member.lastName} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Field label="Email" value={member.email} />
          </div>
        </CardContent>
      </Card>

      {/* ================= CONTACT INFO ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Phone className="h-4 w-4 text-gray-600" />
          <CardTitle className="text-sm">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Field label="Phone number" value={member.phoneNumber} />
        </CardContent>
      </Card>

      {/* ================= PROFESSIONAL INFO ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Briefcase className="h-4 w-4 text-gray-600" />
          <CardTitle className="text-sm">Professional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <Field
              label="Specialization"
              value={member.professionalInfo?.specialization}
            />
            <Field
              label="Role"
              value={member.professionalInfo?.practitionerType}
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= STATUS ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-gray-600" />
          <CardTitle className="text-sm">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Field label="Current status" value={member.status} />
        </CardContent>
      </Card>

      {/* ================= ADDRESS INFO ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-600" />
          <CardTitle className="text-sm">Address Information</CardTitle>
        </CardHeader>
        <CardContent>
          {member.addresses && member.addresses.length > 0 ? (
            <div className="space-y-6">
              {member.addresses.map((address, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 space-y-4 bg-muted/30"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <Field label="Address type" value={address.addressType} />
                    <Field label="Country" value={address.country} />
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <Field label="State" value={address.state} />
                    <Field label="City" value={address.city} />
                    <Field
                      label="ZIP / Pincode"
                      value={address.zip || address.zipCode}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <Field label="Street" value={address.street} />
                    <Field label="House No" value={address.houseNo} />
                  </div>
                </div>
              ))}
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
  )};