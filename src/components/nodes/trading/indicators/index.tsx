import React from "react";
import { NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const Indicators = (props: Node) => {
  return (
    <NodeLayout
      title="Indicators"
      nodeProps={props}
      fields={input_edge_outputFields}
    />
  );
};
