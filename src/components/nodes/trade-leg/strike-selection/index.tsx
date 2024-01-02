import React from "react";
import { NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const StrikeSelection = (props: Node) => {
  return (
    <NodeLayout
      title="Strike Selection"
      nodeProps={props}
      fields={input_edge_outputFields}
    />
  );
};
