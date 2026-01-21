export type CustomerStatus = "Open" | "Paid" | "Inactive" | "Due";

export interface Customer {
  id: string;
  name: string;
  customerId: string;
  description: string;
  status: CustomerStatus;
  rate: number;
  balance: number;
  deposit: number;
}

export interface CustomerFormData {
  name: string;
  description: string;
  status: CustomerStatus;
  rate: number;
  balance: number;
  deposit: number;
}
