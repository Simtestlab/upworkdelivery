
import React from "react";
import { NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const Pnl = (props: Node) => {
  return <NodeLayout title="PNL" nodeProps={props} fields={input_edge_outputFields} />;
};
