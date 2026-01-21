import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Customer } from "../types/customer";

export function useCustomers() {
  const queryClient = useQueryClient();

  // Fetching data
  const query = useQuery({
    queryKey: ["customers"],
    queryFn: api.fetchCustomers,
  });

  // Mutating (Saving/Updating)
  const saveMutation = useMutation({
    mutationFn: api.saveCustomer,
    onSuccess: () => {
      // This tells TanStack Query to re-fetch the data automatically
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  // Mutating (Deleting)
  const deleteMutation = useMutation({
    mutationFn: api.deleteCustomers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return {
    customers: query.data ?? [],
    isLoading: query.isLoading,
    saveCustomer: saveMutation.mutate,
    deleteCustomers: deleteMutation.mutate,
    isSaving: saveMutation.isPending,
  };
}