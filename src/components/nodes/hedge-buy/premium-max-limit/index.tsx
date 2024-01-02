
import React from "react";
import {  NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const PremiumMaxLimit = (props: Node) => {
  return <NodeLayout title="Premium Max Limit" nodeProps={props} fields={input_edge_outputFields} />;
};
