import React from "react";
import { NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const Instruments = (props: Node) => {
  return (
    <NodeLayout
      title="Instruments"
      nodeProps={props}
      fields={input_edge_outputFields}
    />
  );
};
