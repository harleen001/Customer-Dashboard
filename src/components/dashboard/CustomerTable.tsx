import { useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox";
import { Skeleton } from "../../components/ui/skeleton";
import { CustomerTableHeader } from "./CustomerTableHeader";
import { CustomerTableRow } from "./CustomerTableRow";
import { CustomerTablePagination } from "./CustomerTablePagination";
import { useCustomers } from "../../hooks/useCustomers";
import { useCustomerStore } from "../../store/customerStore";

export const CustomerTable = () => {
  const { data: customers, isLoading } = useCustomers();
  const { searchQuery, rowsPerPage, currentPage, selectedIds, selectAll } = useCustomerStore();

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];
    if (!searchQuery) return customers;
    
    const query = searchQuery.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.customerId.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.status.toLowerCase().includes(query)
    );
  }, [customers, searchQuery]);

  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredCustomers.slice(start, start + rowsPerPage);
  }, [filteredCustomers, currentPage, rowsPerPage]);

  const currentPageIds = paginatedCustomers.map((c) => c.id);
  const allOnPageSelected = currentPageIds.length > 0 && currentPageIds.every((id) => selectedIds.has(id));
  const someOnPageSelected = currentPageIds.some((id) => selectedIds.has(id));

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-table-border shadow-sm">
        <div className="p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-table-border shadow-sm overflow-hidden">
      <CustomerTableHeader totalSelected={selectedIds.size} />
      
     
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-table-header-bg border-b border-table-border">
            {/* Added border-l-4 transparent to match the row alignment */}
            <tr className="border-l-4 border-l-transparent">
              <th className="px-4 py-3 w-12">
                <Checkbox
                  checked={allOnPageSelected}
                  onCheckedChange={() => selectAll(currentPageIds)}
                  aria-label="Select all on page"
                  // FIX: Applied square styling and brand blue
                  className="h-5 w-5 rounded-[4px] border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
              </th>
                  <th className="px-4 py-3 w-16">
                    <div className="flex items-center justify-center gap-1 text-xs font-medium text-muted-foreground uppercase">
                      #
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase">
                      Name
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      Description
                    </span>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase">
                      Status
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      Rate
                    </span>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      Balance
                    </span>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      Deposit
                    </span>
                  </th>
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer, idx) => (
                  <CustomerTableRow
                    key={customer.id}
                    customer={customer}
                    index={(currentPage - 1) * rowsPerPage + idx + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <CustomerTablePagination totalItems={filteredCustomers.length} />
        </>
      
    </div>
  );
};
