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
    type: "text",
  },
  {
    label: "Auth Type",
    name: "auth_type",
    type: "select",
    options: ["TOTP", "PIN"],
  },
  {
    label: "T-OTP Secret",
    name: "t_otp_secret",
    type: "text",
  },
  {
    label: "PIN",
    name: "pin",
    type: "text",
  },
];

export const Zerodha = (props: Node) => {
  return <NodeLayout title="Zerodha" nodeProps={props} fields={fields} />;
};
