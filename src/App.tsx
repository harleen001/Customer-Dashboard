import { useCustomers } from "./hooks/useCustomers";
import { CustomerTable } from "./components/dashboard/DataTable";
import { useCustomerStore } from "./store/useCustomerStore";

export default function App() {
  const { customers, isLoading, deleteCustomers } = useCustomers();
  const { selectedCustomerIds, clearSelection } = useCustomerStore();

  const handleDelete = () => {
    deleteCustomers(selectedCustomerIds, {
      onSuccess: () => clearSelection(),
    });
  };

  if (isLoading) return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="p-10 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Payments</h1>
        
        <div className="space-x-2">
          {selectedCustomerIds.length > 0 && (
            <button 
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete Selected ({selectedCustomerIds.length})
            </button>
          )}
          <button className="bg-black text-white px-4 py-2 rounded-md">
            {selectedCustomerIds.length === 1 ? "Update Customer" : "Add Customer"}
          </button>
        </div>
      </div>

      <CustomerTable data={customers} />
    </div>
  );
}