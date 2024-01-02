import React from "react";
import { IField, NODE_COMMON_FIELDS, NodeLayout } from "@/layouts";
import { Node } from "reactflow";

export const input_edge_outputFields: IField[] = [
  {
    ...NODE_COMMON_FIELDS[0],
    label: "Input Connection 1",
  },
  {
    ...NODE_COMMON_FIELDS[1],
    label: "Input Connection 2",
  },
  {
    label: "Edge Type",
    name: "edge_type",
    type: "select",
    options: NODE_COMMON_FIELDS[NODE_COMMON_FIELDS.length - 1].options,
  },
  {
    ...NODE_COMMON_FIELDS[NODE_COMMON_FIELDS.length - 1],
    label: "Output Connection 1",
  },
  {
    ...NODE_COMMON_FIELDS[NODE_COMMON_FIELDS.length - 1],
    label: "Output Connection 2",
  },
];

export const IfElse = (props: Node) => {
  return (
    <NodeLayout
      title="IF_else"
      nodeProps={props}
      fields={input_edge_outputFields}
    />
  );
};
