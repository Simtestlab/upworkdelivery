import React from "react";
import { NODE_COMMON_FIELDS, NodeLayout } from "@/layouts";
import { Node } from "reactflow";

const fields = [
  {
    label: "User ID",
    name: "user_id",
    type: "text",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
  },
  {
    label: "API Key",
    name: "API_key",
    type: "text",
  },
  {
    label: "Secret Key",
    name: "secret_key",
    type: "text",
  },
];

export const IIFL = (props: Node) => {
  return <NodeLayout title="IIFL" nodeProps={props} fields={fields} />;
};
