import { create } from "zustand";

interface CustomerUIState {
  selectedIds: Set<string>;
  searchQuery: string;
  isModalOpen: boolean;
  editingCustomerId: string | null;
  rowsPerPage: number;
  currentPage: number;
  
  // Actions
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  setSearchQuery: (query: string) => void;
  openAddModal: () => void;
  openEditModal: (id: string) => void;
  closeModal: () => void;
  setRowsPerPage: (count: number) => void;
  setCurrentPage: (page: number) => void;
}

export const useCustomerStore = create<CustomerUIState>((set) => ({
  selectedIds: new Set(),
  searchQuery: "",
  isModalOpen: false,
  editingCustomerId: null,
  rowsPerPage: 10,
  currentPage: 1,

  toggleSelection: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return { selectedIds: newSet };
    }),

  selectAll: (ids) =>
    set((state) => {
      const allSelected = ids.every((id) => state.selectedIds.has(id));
      if (allSelected) {
        return { selectedIds: new Set() };
      }
      return { selectedIds: new Set(ids) };
    }),

  clearSelection: () => set({ selectedIds: new Set() }),

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

  openAddModal: () => set({ isModalOpen: true, editingCustomerId: null }),

  openEditModal: (id) => set({ isModalOpen: true, editingCustomerId: id }),

  closeModal: () => set({ isModalOpen: false, editingCustomerId: null }),

  setRowsPerPage: (count) => set({ rowsPerPage: count, currentPage: 1 }),

  setCurrentPage: (page) => set({ currentPage: page }),
}));
