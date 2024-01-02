import React from "react";
import { NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const WhileLoop = (props: Node) => {
  return (
    <NodeLayout
      title="While Loop"
      nodeProps={props}
      fields={input_edge_outputFields}
    />
  );
};
