
import React from "react";
import {  NodeLayout } from "@/layouts";
import { Node } from "reactflow";
import { input_edge_outputFields } from "../..";

export const TradeLegs = (props: Node) => {
  return <NodeLayout title="Trade Legs" nodeProps={props} fields={input_edge_outputFields} />;
};
