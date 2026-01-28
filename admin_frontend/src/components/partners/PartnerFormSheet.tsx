import {
  Sheet,
  SheetContent,
 
} from "../ui/sheet";
import PartnerForm from "./PartnerForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function PartnerFormSheet({
  open,
  onOpenChange,
  onSuccess,
}: Props) {
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
        <div className="border-b px-6 py-4 bg-red-50">
          <h2 className="text-lg font-semibold">
            Add Partner
          </h2>
          <p className="text-sm text-muted-foreground">
            Fill the form and add a new partner
          </p>
        </div>

        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-6">
          <PartnerForm
            onSuccess={() => {
              onOpenChange(false);
              onSuccess();
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
