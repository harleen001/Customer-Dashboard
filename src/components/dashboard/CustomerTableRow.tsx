import type { Customer } from "../../types/customer";
import { StatusBadge } from "./StatusBadge";
import { Checkbox } from "../ui/checkbox";
import { useCustomerStore } from "../../store/CustomerStore";
import { useDeleteCustomers } from "../../hooks/useCustomers";
import { cn } from "../../lib/utils";
import { MoreVertical, Pencil, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface CustomerTableRowProps {
  customer: Customer;
  index: number;
}

export const CustomerTableRow = ({ customer, index }: CustomerTableRowProps) => {
  const { selectedIds, toggleSelection, openEditModal } = useCustomerStore();
  const deleteCustomers = useDeleteCustomers();
  const isSelected = selectedIds.has(customer.id);

  const formatCurrency = (value: number) => {
    const formatted = Math.abs(value).toFixed(2);
    return value < 0 ? `-$${formatted}` : `$${formatted}`;
  };

  const handleEdit = () => {
    openEditModal(customer.id);
  };

  const handleDelete = async () => {
    await deleteCustomers.mutateAsync([customer.id]);
  };

  return (
    <tr
      className={cn(
        // border-l-4 adds the vertical bar slot
        "border-b border-table-border transition-colors border-l-4",
        isSelected 
          ? "bg-table-row-selected border-l-primary" // Figma Blue background & side bar
          : "border-l-transparent hover:bg-table-row-hover"
      )}
    >
      <td className="px-4 py-3 w-12">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => toggleSelection(customer.id)}
          aria-label={`Select ${customer.name}`}
          // Square style with 4px radius and custom data-state colors
          className="h-5 w-5 rounded-[4px] border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
      </td>
      <td className="px-4 py-3 w-16 text-center text-sm text-muted-foreground">
        {index + 1} {/* index usually starts at 0, so adding 1 for UI */}
      </td>
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-foreground leading-none mb-1">{customer.name}</p>
          <p className="text-xs text-muted-foreground">{customer.customerId}</p>
        </div>
      </td>
      <td className="px-4 py-3 max-w-[250px]">
        <p className="text-sm text-muted-foreground truncate">
          {customer.description}
        </p>
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={customer.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <p className="font-medium text-sm">${customer.rate.toFixed(2)}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">CAD</p>
      </td>
      <td className="px-4 py-3 text-right">
        <p
          className={cn(
            "font-medium text-sm",
            customer.balance < 0 ? "text-balance-negative" : "text-balance-positive"
          )}
        >
          {formatCurrency(customer.balance)}
        </p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">CAD</p>
      </td>
      <td className="px-4 py-3 text-right">
        <p className="font-medium text-sm">${customer.deposit.toFixed(2)}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">CAD</p>
      </td>
      <td className="px-4 py-3 w-12">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}