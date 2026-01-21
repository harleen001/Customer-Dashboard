import type { Customer } from "../types/customer";

const STORAGE_KEY = "customer_payment_dashboard_data";

// Helper to simulate network latency (standard in technical assessments)
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const api = {
  // READ: Get all customers
  fetchCustomers: async (): Promise<Customer[]> => {
    await delay(500);
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // CREATE/UPDATE: Save a customer
  saveCustomer: async (customer: Customer): Promise<void> => {
    await delay(500);
    const customers = await api.fetchCustomers();
    const index = customers.findIndex((c) => c.id === customer.id);

    if (index !== -1) {
      customers[index] = customer; // Update
    } else {
      customers.push(customer); // Create
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  },

  // DELETE: Remove multiple customers (as required by selection logic)
  deleteCustomers: async (ids: string[]): Promise<void> => {
    await delay(500);
    const customers = await api.fetchCustomers();
    const filtered = customers.filter((c) => !ids.includes(c.id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
};