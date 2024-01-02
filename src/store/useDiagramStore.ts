import { Edge, Node } from "reactflow";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DiagramStore {
  default: string;
  diagram: {
    nodes: Node[];
    edges: Edge[];
  };
  setDefault: (name: string) => void;
  loadDiagram: (payload: DiagramStore["diagram"]) => void;
}

export const useDiagramStore = create(
  persist<DiagramStore>(
    (set) => ({
      default: "",
      diagram: {
        nodes: [],
        edges: [],
      },
      loadDiagram: (payload: DiagramStore["diagram"]) =>
        set((state) => ({ ...state, diagram: payload })),
      setDefault: (name: string) =>
        set((state) => ({ ...state, default: name })),
    }),
    { name: "diagram-store" }
  )
);
