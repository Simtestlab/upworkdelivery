
import React from "react";
import {  NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const OrderFilter = (props: Node) => {
  return <NodeLayout title="Order Filter" nodeProps={props} fields={input_edge_outputFields} />;
};
