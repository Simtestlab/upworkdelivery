import React from "react";
import { NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "@/components/nodes";

export const AllBuy = (props: Node) => {
  return (
    <NodeLayout
      title="All Buy"
      nodeProps={props}
      fields={input_edge_outputFields}
    />
  );
};
