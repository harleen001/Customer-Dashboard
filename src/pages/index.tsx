import { CustomerTable } from "../components/dashboard/CustomerTable";
import { CustomerFormModal } from "../components/dashboard/CustomerForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-[1440px] py-10 px-4 md:px-10">
        <CustomerTable />
        <CustomerFormModal />
      </div>
    </div>
  );
};

export default Index;
