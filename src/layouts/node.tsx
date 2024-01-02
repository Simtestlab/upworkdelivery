"use client";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Handle,
  Node,
  Position,
  useReactFlow,
  getConnectedEdges,
} from "reactflow";
import { Button } from "@/components/ui/button";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useNodeDataChange } from "@/hooks/useUpdateNode";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/useThemeStore";
import { XIcon } from "lucide-react";
import _, { snakeCase } from "lodash";
import { usePropertyStore } from "@/store/usePropertyStore";

export interface IField {
  label: string;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  options?: string[];
}

export interface NodeLayoutProps {
  title: string;
  fields: IField[];
  nodeProps?: Node;
}

export const NodeLayout = (props: NodeLayoutProps) => {
  const { nodeProps, fields } = props;
  const [isEditing, setIsEditing] = React.useState(false);
  const [collapseCard, setCollapseCard] = React.useState(true);
  const { setShowProperty, setProperties } = usePropertyStore();
  const { updateNodeData } = useNodeDataChange();
  const { themeStyle } = useThemeStore();
  const { getNodes, setEdges, getEdges, setNodes } = useReactFlow();

  const dropNode = () => {
    const node = nodeProps;
    if (!node) return;

    const edges = getEdges();
    const nodes = getNodes();

    const connectedEdges = getConnectedEdges([node], edges);

    setNodes(() => {
      const copyNodes = [...nodes];
      const filteredNodes = copyNodes.filter((item) => item.id !== node.id);
      return filteredNodes;
    });
    const eliminated = _.differenceBy(edges, connectedEdges, "id");
    setEdges(() => eliminated);
  };

  return (
    <React.Fragment>
      <Handle
        type="target"
        isConnectable={true}
        id={nodeProps?.type + "_top"}
        position={Position.Top}
      />
      <Handle
        type="source"
        isConnectable={true}
        id={nodeProps?.type + "_right_1"}
        position={Position.Right}
      />
      <Handle
        type="source"
        isConnectable={true}
        id={nodeProps?.type + "_bottom"}
        position={Position.Bottom}
      />
      <Handle
        type="target"
        isConnectable={true}
        id={nodeProps?.type + "_left_1"}
        position={Position.Left}
      />
      <div
        onClick={() => {
          setShowProperty(true);
          setProperties(nodeProps?.data);
        }}
        className={cn("relative group", {
          "gradient rounded-md overflow-hidden p-1":
            themeStyle === "turbo-flow",
        })}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              title="delete"
              type="button"
              className="absolute top-0 right-0 p-1 bg-background border-primary hidden group-hover:inline-block border-2"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                node and connected edges.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={dropNode}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Card
          className={cn(
            "w-64 divide-y-2",
            themeStyle === "base-style"
              ? "rounded-none border-black bg-transparent"
              : themeStyle === "turbo-flow"
              ? "border-none shadow-none rounded-sm"
              : "border-2 border-primary shadow-primary/20 shadow-xl rounded-md"
          )}
        >
          <CardHeader className="py-3">
            <CardTitle>
              {isEditing ? (
                <Input
                  className="rounded-none border-none shadow-none h-auto focus-visible:ring-0 px-0"
                  onBlur={(e) => {
                    e.stopPropagation();
                    setIsEditing(false);
                    updateNodeData(nodeProps?.id, {
                      nodeLabel: e.target.value,
                    });
                  }}
                  defaultValue={nodeProps?.data?.nodeLabel}
                />
              ) : (
                <span
                  className="block"
                  onDoubleClick={() => setIsEditing(true)}
                >
                  {nodeProps?.data?.nodeLabel}
                </span>
              )}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </React.Fragment>
  );
};

export const NODE_COMMON_FIELDS: IField[] = [
  {
    label: "Input Correction",
    name: "input_correction",
    type: "select",
    options: ["next", "sveltekit", "astro", "nuxt"],
  },
  {
    label: "Value 1",
    name: "value_1",
    type: "select",
    options: ["next", "sveltekit", "astro", "nuxt"],
  },
  {
    label: "Value 2",
    name: "value_2",
    type: "select",
    options: ["next", "sveltekit", "astro", "nuxt"],
  },
  {
    label: "Value 3",
    name: "value_3",
    type: "select",
    options: ["next", "sveltekit", "astro", "nuxt"],
  },
  {
    label: "Output Correction",
    name: "output_correction",
    type: "select",
    options: ["next", "sveltekit", "astro", "nuxt"],
  },
];
