import { create } from 'zustand';

interface CustomerUIState {
  selectedCustomerIds: string[];
  // Logic to select/unselect a single row
  toggleSelection: (id: string) => void;
  // Logic to select all rows at once
  setSelection: (ids: string[]) => void;
  // Clear everything (e.g., after a successful delete)
  clearSelection: () => void;
}

export const useCustomerStore = create<CustomerUIState>((set) => ({
  selectedCustomerIds: [],
  
  toggleSelection: (id) =>
    set((state) => ({
      selectedCustomerIds: state.selectedCustomerIds.includes(id)
        ? state.selectedCustomerIds.filter((i) => i !== id)
        : [...state.selectedCustomerIds, id],
    })),

  setSelection: (ids) => set({ selectedCustomerIds: ids }),
  
  clearSelection: () => set({ selectedCustomerIds: [] }),
}));