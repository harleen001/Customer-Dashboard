import { Filter, Search, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCustomerStore } from "../../store/customerStore";
import { useDeleteCustomers } from "../../hooks/useCustomers";

interface CustomerTableHeaderProps {
  totalSelected: number;
}

export const CustomerTableHeader = ({ totalSelected }: CustomerTableHeaderProps) => {
  const { searchQuery, setSearchQuery, openAddModal, openEditModal, selectedIds, clearSelection } = useCustomerStore();
  const deleteCustomers = useDeleteCustomers();

  const handleDelete = async () => {
    if (selectedIds.size > 0) {
      await deleteCustomers.mutateAsync(Array.from(selectedIds));
      clearSelection();
    }
  };

  const handleAction = () => {
    if (totalSelected === 1) {
      const selectedId = Array.from(selectedIds)[0];
      openEditModal(selectedId);
    } else {
      openAddModal();
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-4 border-b border-table-border">
      <div className="flex items-center gap-3">
        {totalSelected > 0 ? (
          <>
            <span className="text-sm font-medium text-foreground">
              {totalSelected} selected
            </span>
          </>
        ) : (
          <>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[200px] lg:w-[300px]"
              />
            </div>
          </>
        )}
      </div>

      {totalSelected > 1 ? (
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleteCustomers.isPending}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete ({totalSelected})
        </Button>
      ) : totalSelected === 1 ? (
        <Button onClick={handleAction} className="gap-2">
          <Plus className="h-4 w-4" />
          Update Customer
        </Button>
      ) : (
        <Button onClick={handleAction} className="gap-2">
          <Plus className="h-4 w-4" />
          Add customer
        </Button>
      )}
    </div>
  );
};
