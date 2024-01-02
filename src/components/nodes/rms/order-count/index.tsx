
import React from "react";
import { NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const OrderCount = (props: Node) => {
  return <NodeLayout title="Order Count" nodeProps={props} fields={input_edge_outputFields} />;
};
