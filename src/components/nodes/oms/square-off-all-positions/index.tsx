
import React from "react";
import { NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const SquareOffAllPositions = (props: Node) => {
  return <NodeLayout title="Square Off All Positions" nodeProps={props} fields={input_edge_outputFields} />;
};
