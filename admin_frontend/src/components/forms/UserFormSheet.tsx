import {
  Sheet,
  SheetContent,
} from "../../components/ui/sheet";

import InviteMemberForm from "./InviteMemberForm";

interface UserFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function UserFormSheet({
  open,
  onOpenChange,
  onSuccess,
}: UserFormSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="
          w-full
          sm:w-[700px]
          lg:w-[900px]
          sm:max-w-[700px]
          lg:max-w-[900px]
          h-full
          overflow-hidden
          p-0
        "
      >
        {/* ✅ FIXED HEADER */}
        <div className="border-b px-6 py-4 bg-red-50">
          <h2 className="text-lg font-semibold">
            Invite Practice
          </h2>
          <p className="text-sm text-muted-foreground">
            Fill the form and invite a new practice
          </p>
        </div>

        {/* ✅ ONLY SCROLLABLE AREA */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-6">
          <InviteMemberForm
           onSuccess={() => {
            onSuccess?.();     // 🔁 refresh table
            onOpenChange(false); // ❌ close AFTER refresh trigger
          }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
