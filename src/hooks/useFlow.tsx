"use client";
import { generatedNodeTypes } from "@/configs";
import { EdgeStyleTypes } from "@/types/edge";
import { useLocalStorage } from "usehooks-ts";
import { nanoid } from "nanoid";
import {
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Edge,
  MarkerType,
  Node,
  ReactFlowInstance,
  addEdge,
  getConnectedEdges,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { useDiagramStore } from "@/store/useDiagramStore";
import { properties } from "@/data/properties";
import { HEADER_COLORS } from "@/styles";
import { snakeCase } from "lodash";

export const useFlow = () => {
  const { default: defaultDiagram, diagram } = useDiagramStore();
  const [diagrams, setDiagrams] = useLocalStorage("diagrams", {});
  const {
    getNode,
    getEdges,
    getNodes,
    setNodes: setRootNodes,
    setEdges: setRootEdges,
  } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(diagram.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(diagram.edges);
  const [edgeStyleType, setEdgeStyleType] = useState<string>(
    EdgeStyleTypes.SIMPLE_BEZIER
  );
  const [diagramName, setDiagramName] = useState(defaultDiagram);
  const nodeTypes = useMemo(() => generatedNodeTypes, []);

  useEffect(() => {
    setRootNodes(diagram.nodes);
    setRootEdges(diagram.edges);
  }, [diagram]);

  const onConnect = useCallback(
    (params: any) => {
      if (params.source === params.target) return;
      const prevNode: any = getNode(params.source);
      const getConnectedEdge = getConnectedEdges([prevNode], getEdges());

      const addNewEdge: Edge = {
        id: nanoid(),
        source: params.source,
        target: params.target,
        type: edgeStyleType,
        style: { stroke: "black", strokeWidth: "1.3" },
        labelBgBorderRadius: 4,
        markerEnd: { type: MarkerType.ArrowClosed, color: "black" },
      };

      if (prevNode?.type === "ifElse") {
        const existYes = getConnectedEdge.findIndex((n) => n.label === "Yes");

        if (existYes === -1) {
          Object.assign(addNewEdge, {
            label: "Yes",
          });
        } else {
          Object.assign(addNewEdge, {
            label: "No",
          });
        }

        const existingYesNoEdges = getConnectedEdge.filter(
          (el) => el?.label === "Yes" || el?.label === "No"
        );

        if (existingYesNoEdges.length === 2) return;
      }

      setEdges((eds: Edge[]) => addEdge({ ...addNewEdge, ...params }, eds));
    },
    [setEdges, edgeStyleType]
  );

  useEffect(() => {
    const els = [...edges];
    const maped = els.map((x) => ({
      ...x,
      type: edgeStyleType,
    }));
    setEdges(maped);
  }, [edgeStyleType]);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds: any =
        reactFlowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow/type");
      const label = event.dataTransfer.getData("application/reactflow/label");

      if (typeof type === "undefined") {
        return;
      }
      // if (typeof type === "undefined" || !type || !reactFlowBounds) {
      //   return;
      // }

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      if (!position) return;

      const background = type
        ? HEADER_COLORS[snakeCase(type).toUpperCase()] || "#000"
        : "#000";

      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { label, ...properties[type], background },
      };

      setNodes((nds: Node[]) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDiagramSave = () => {
    if (diagramName !== "") {
      setDiagrams(
        Object.assign(diagrams, {
          [diagramName]: { nodes: getNodes(), edges: getEdges() },
        })
      );
    } else {
      alert("Please enter a diagram name");
    }
  };

  const createNewDiagram = () => {
    setDiagramName("");
    setRootNodes([]);
    setRootEdges([]);
  };

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    nodeTypes,
    reactFlowWrapper,
    setReactFlowInstance,
    edgeStyleType,
    setEdgeStyleType,
    diagramName,
    setDiagramName,
    onDiagramSave,
    createNewDiagram,
  };
};
