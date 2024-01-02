
import React from "react";
import {  NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const CancelOpenOrder = (props: Node) => {
  return <NodeLayout title="Cancel Open Order" nodeProps={props} fields={input_edge_outputFields} />;
};
