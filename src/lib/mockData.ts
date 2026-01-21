import type { Customer, CustomerStatus } from "../types/customer";

const statuses: CustomerStatus[] = ["Open", "Paid", "Inactive", "Due"];

const names = [
  "Ann Culhane",
  "Ahmad Rosser",
  "Zain Calzoni",
  "Leo Stanton",
  "Kaiya Vetrovs",
  "Ryan Westervelt",
  "Corey Stanton",
  "Adison Aminoff",
  "Alfredo Aminoff",
  "Maria Garcia",
  "James Wilson",
  "Sarah Johnson",
  "Michael Brown",
  "Emily Davis",
  "Robert Miller",
  "Jennifer Taylor",
  "David Anderson",
  "Lisa Thomas",
  "William Jackson",
  "Patricia White",
];

const generateCustomerId = (index: number): string => {
  return `5684236${526 + index}`;
};

const generateBalance = (): number => {
  const balances = [-270, 270, -20, 600, -350, -270, 30, -270, 460, 150, -180, 320];
  return balances[Math.floor(Math.random() * balances.length)];
};

export const generateMockCustomers = (count: number = 97): Customer[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `customer-${index + 1}`,
    name: names[index % names.length],
    customerId: generateCustomerId(index),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: statuses[index % statuses.length],
    rate: 70.0,
    balance: generateBalance(),
    deposit: 500.0,
  }));
};

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Local storage key
const STORAGE_KEY = "customer_data";

// Initialize data
const initializeData = (): Customer[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  const initial = generateMockCustomers();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

// Mock API functions
export const mockApi = {
  getCustomers: async (): Promise<Customer[]> => {
    await delay(300);
    return initializeData();
  },

  addCustomer: async (data: Omit<Customer, "id" | "customerId">): Promise<Customer> => {
    await delay(300);
    const customers = initializeData();
    const newCustomer: Customer = {
      ...data,
      id: `customer-${Date.now()}`,
      customerId: generateCustomerId(customers.length),
    };
    customers.push(newCustomer);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    return newCustomer;
  },

  updateCustomer: async (id: string, data: Partial<Customer>): Promise<Customer> => {
    await delay(300);
    const customers = initializeData();
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Customer not found");
    customers[index] = { ...customers[index], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    return customers[index];
  },

  deleteCustomers: async (ids: string[]): Promise<void> => {
    await delay(300);
    const customers = initializeData();
    const filtered = customers.filter((c) => !ids.includes(c.id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
};
