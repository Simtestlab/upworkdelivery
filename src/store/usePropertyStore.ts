import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PropertyStore {
  showProperty: boolean;
  properties: Record<string, any> | null;
  setShowProperty: (show: boolean) => void;
  setProperties: (properties: Record<string, any> | null) => void;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  showProperty: false,
  properties: null,
  setShowProperty: (show) => set({ showProperty: show }),
  setProperties: (properties) => set({ properties: properties }),
}));
