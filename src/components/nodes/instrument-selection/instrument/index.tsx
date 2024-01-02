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
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { IField } from "@/layouts";
import {
  Handle,
  Node,
  Position,
  useReactFlow,
  getConnectedEdges,
} from "reactflow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";

import { useNodeDataChange } from "@/hooks/useUpdateNode";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import _, { lowerCase, snakeCase } from "lodash";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/useThemeStore";

const fields: IField[] = [
  {
    label: "Segments",
    name: "segments",
    type: "select",
    options: ["NFO-OPT", "EQT", "CNC"],
  },
];

const segments = {
  "NFO-OPT": [
    {
      label: "Trading Symbol",
      name: "Trading Symbol",
      type: "select",
      options: ["Nifty", "Bank Nifty"],
    },
    {
      label: "Expiry Date",
      name: "Expiry Date",
      type: "select",
      options: ["19-10-2023", "26-10-2023", "02-11-2023", "09-11-2023"],
    },
  ],
  EQT: [
    {
      label: "Index",
      name: "Index",
      type: "select",
      options: ["Nifty 50", "Nifty 100", "Bank 50", "Nifty IT"],
    },
    {
      label: "Expiry Date",
      name: "Expiry Date",
      type: "select",
      options: ["19-10-2023", "26-10-2023", "02-11-2023", "09-11-2023"],
    },
  ],
  CNC: [
    {
      label: "Commodity",
      name: "Commodity",
      type: "select",
      options: ["Crude", "Silver", "Gold"],
    },
  ],
};

export const Instrument = (nodeProps: Node) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedSegment, setSelectedSegment] = useState<keyof typeof segments>(
    nodeProps?.data["segments"]
  );
  const [collapseCard, setCollapseCard] = React.useState(true);
  const { updateNodeData } = useNodeDataChange();
  const { themeStyle } = useThemeStore();
  const { getNodes, setEdges, getEdges, setNodes } = useReactFlow();

  const dropNode = () => {
    const node = nodeProps;
    if (!node) return;
    const edges = getEdges();
    const connectedEdges = getConnectedEdges([node], edges);
    setNodes(() => getNodes()?.filter((item) => item.id !== node.id));
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
        style={{ top: "33.3%" }}
      />
      <Handle
        type="source"
        isConnectable={true}
        id={nodeProps?.type + "_right_2"}
        position={Position.Right}
        style={{ top: `${33.3 * 2}%` }}
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
        style={{
          top: "33.3%",
        }}
        position={Position.Left}
      />
      <Handle
        type="target"
        isConnectable={true}
        id={nodeProps?.type + "_left_2"}
        style={{
          top: `${33.3 * 2}%`,
        }}
        position={Position.Left}
      />
      <div
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
          {!collapseCard && (
            <CardContent className="pt-3">
              <form>
                <div className="grid w-full items-center gap-4">
                  {fields.map((field) => {
                    const fieldId = `${field.name}_${nanoid()}`;
                    return (
                      <div
                        key={field.label}
                        className="flex flex-col space-y-1.5"
                      >
                        <Label htmlFor={fieldId}>{field.label}</Label>
                        {field.type === "select" ? (
                          <Select
                            defaultValue={
                              nodeProps?.data["segments"] ?? selectedSegment
                            }
                            name={field.name}
                            onValueChange={(value: keyof typeof segments) => {
                              setSelectedSegment(value);
                              updateNodeData(nodeProps?.id, {
                                [snakeCase(field.name)]: value,
                              });
                            }}
                          >
                            <SelectTrigger id={fieldId}>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            name={field.name}
                            id={fieldId}
                            type={field.type}
                            defaultValue={
                              nodeProps?.data[snakeCase(field.name)]
                            }
                            onBlur={(e) => {
                              e.stopPropagation();
                              updateNodeData(nodeProps?.id, {
                                [snakeCase(field.name)]: e.target.value,
                              });
                            }}
                            placeholder={`Enter your ${lowerCase(field.name)}`}
                          />
                        )}
                      </div>
                    );
                  })}
                  {selectedSegment &&
                    segments[selectedSegment]?.map(
                      (field: (typeof segments.CNC)[0]) => {
                        const fieldId = `${field.name}_${nanoid()}`;
                        return (
                          <div
                            key={field.label}
                            className="flex flex-col space-y-1.5"
                          >
                            <Label htmlFor={fieldId}>{field.label}</Label>
                            {field.type === "select" ? (
                              <Select
                                defaultValue={
                                  nodeProps?.data[snakeCase(field.name)]
                                }
                                name={field.name}
                                onValueChange={(value) => {
                                  updateNodeData(nodeProps?.id, {
                                    [snakeCase(field.name)]: value,
                                  });
                                }}
                              >
                                <SelectTrigger id={fieldId}>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  {field.options?.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                name={field.name}
                                id={fieldId}
                                type={field.type}
                                defaultValue={
                                  nodeProps?.data[snakeCase(field.name)]
                                }
                                onBlur={(e) => {
                                  e.stopPropagation();
                                  updateNodeData(nodeProps?.id, {
                                    [snakeCase(field.name)]: e.target.value,
                                  });
                                }}
                                placeholder={`Enter your ${lowerCase(
                                  field.name
                                )}`}
                              />
                            )}
                          </div>
                        );
                      }
                    )}
                </div>
              </form>
            </CardContent>
          )}
          <div
            className={cn(
              "flex items-center justify-center rounded-b-xl",
              themeStyle === "base-style" ? "bg-transparent" : "bg-background"
            )}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapseCard((prev) => !prev)}
            >
              {collapseCard ? (
                <TriangleDownIcon className="h-5 w-5" />
              ) : (
                <TriangleUpIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};
