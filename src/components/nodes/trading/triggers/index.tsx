import React from "react";
import { NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const Triggers = (props: Node) => {
  return (
    <NodeLayout
      title="Triggers"
      nodeProps={props}
      fields={input_edge_outputFields}
    />
  );
};
