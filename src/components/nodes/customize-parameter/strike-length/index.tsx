import React from "react";
import { NODE_COMMON_FIELDS, NodeLayout } from "@/layouts";
import { Node } from "reactflow";

export const StrikeLength = (props: Node) => {
  return (
    <NodeLayout
      title="Strike Length"
      nodeProps={props}
      fields={NODE_COMMON_FIELDS}
    />
  );
};
