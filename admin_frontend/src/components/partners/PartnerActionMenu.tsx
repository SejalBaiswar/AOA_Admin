import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import type { Partner } from "../../types/partner";

interface Props {
  partner: Partner;
  onToggleStatus: (partner: Partner) => void;
  onView: (partner: Partner) => void;
}

export default function PartnerActionMenu({
  partner,
  onToggleStatus,
  onView,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded">
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(partner)}>
          View details
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onToggleStatus(partner)}>
          {partner.status === "Active"
            ? "Deactivate"
            : "Activate"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
