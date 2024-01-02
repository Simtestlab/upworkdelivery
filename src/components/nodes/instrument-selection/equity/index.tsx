import React from "react";
import { IField, NODE_COMMON_FIELDS, NodeLayout } from "@/layouts";
import { Node } from "reactflow";

const fields: IField[] = [
  ...NODE_COMMON_FIELDS,
  {
    label: "Output Connection 2",
    name: "output_connection_2",
    type: "select",
    options: NODE_COMMON_FIELDS[NODE_COMMON_FIELDS.length - 1].options,
  },
  {
    label: "Output Connection 3",
    name: "output_connection_3",
    type: "select",
    options: NODE_COMMON_FIELDS[NODE_COMMON_FIELDS.length - 1].options,
  },
];

export const Equity = (props: Node) => {
  return <NodeLayout title="Equity" nodeProps={props} {...{ fields }} />;
};
