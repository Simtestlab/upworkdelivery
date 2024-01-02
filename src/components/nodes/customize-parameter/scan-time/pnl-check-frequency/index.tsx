import React from "react";
import { IField, NODE_COMMON_FIELDS, NodeLayout } from "@/layouts";
import { Node } from "reactflow";

const fields: IField[] = [
  ...NODE_COMMON_FIELDS,
  {
    label: "Output Connection",
    name: "output_connection_2",
    type: "select",
    options: NODE_COMMON_FIELDS[NODE_COMMON_FIELDS.length - 1].options,
  },
];

export const PnlCheckFrequency = (props: Node) => {
  return (
    <NodeLayout title="PNL Check Frequency" nodeProps={props} {...{ fields }} />
  );
};
