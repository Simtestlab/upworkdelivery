
import React from "react";
import { NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "@/components/nodes";

export const PremiumBelow = (props: Node) => {
  return <NodeLayout title="Premium Below" nodeProps={props} fields={input_edge_outputFields} />;
};
