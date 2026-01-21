import type { CustomerStatus } from "../../types/customer";
import { cn } from "../../lib/utils";

interface StatusBadgeProps {
  status: CustomerStatus;
}

const statusStyles: Record<CustomerStatus, string> = {
  Open: "bg-status-open-bg text-status-open border border-status-open/30",
  Paid: "bg-status-paid-bg text-status-paid border border-status-paid/30",
  Inactive: "bg-status-inactive-bg text-status-inactive border border-status-inactive/30",
  Due: "bg-status-due-bg text-status-due border border-status-due/30",
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
};
