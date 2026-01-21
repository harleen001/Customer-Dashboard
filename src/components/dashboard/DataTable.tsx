import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useCustomerStore } from "../../store/useCustomerStore";
import type { Customer, CustomerStatus } from "../../types/customer";

// Status color mapping based on assessment requirements
const statusStyles: Record<CustomerStatus, string> = {
  Open: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  Inactive: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100",
  Paid: "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  Due: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
};

export function CustomerTable({ data }: { data: Customer[] }) {
  const { selectedCustomerIds, toggleSelection } = useCustomerStore();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead className="text-right">Deposit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No Data Found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((customer) => (
              <TableRow 
                key={customer.id}
                data-state={selectedCustomerIds.includes(customer.id) && "selected"}
              >
                <TableCell>
                  <input 
                    type="checkbox" 
                    checked={selectedCustomerIds.includes(customer.id)}
                    onChange={() => toggleSelection(customer.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.description}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusStyles[customer.status]}>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${customer.rate.toFixed(2)}</TableCell>
                <TableCell className="text-right">${customer.balance.toFixed(2)}</TableCell>
                <TableCell className="text-right">${customer.deposit.toFixed(2)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}