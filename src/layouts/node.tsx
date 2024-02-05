import { usePropertyStore } from "@/store/usePropertyStore";

import React from "react";
import { Handle, Node, Position } from "reactflow";

interface IOProps {
  name: string;
  identifier: string;
  type: string;
  links: any[]; // You may replace 'any' with a more specific type if you know the structure of the 'links' array
  display_shape: string;
  is_multi_input: boolean;
  value: any;
}

interface NodeData {
  label: string;
  inputs: IOProps[];
  outputs: IOProps[];
  background: string;
  operations?: string[];
  operation?: string;
}

export interface NodeProperties extends Node {
  data: NodeData;
}

interface Props {
  node?: NodeProperties;
  title: string;
}

export const BaseNode = (props: Props) => {
  const { node, title } = props;

  const { setShowProperty, setProperties } = usePropertyStore();

  return (
    <div
      className="rounded-md bg-background w-48 border overflow-hidden"
      onClick={() => {
        setShowProperty(true);
        setProperties(node);
      }}
    >
      <h3
        className="text-lg py-1 px-3 text-white"
        style={{ background: node?.data?.background }}
      >
        {title}
      </h3>
      <div className="py-2">
        {node?.data.operation && (
          <div className="px-2 uppercase font-bold">
            {node?.data?.operation}
          </div>
        )}
        {node?.data?.outputs?.map((item, index) => (
          <div key={item.name} className="relative">
            <p className="text-right px-2">{item?.name}</p>
            <Handle
              type="target"
              isConnectable
              id={node?.type + "_" + item.name}
              position={Position.Right}
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                borderTopLeftRadius: "50%",
                borderBottomLeftRadius: "50%",
              }}
            />
          </div>
        ))}
        {node?.data?.inputs?.map((item) => (
          <div key={item.name} className="relative">
            <p className="px-2">{item.name}</p>
            <Handle
              type="source"
              isConnectable
              id={node?.type + "_" + item.name}
              position={Position.Left}
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                borderTopLeftRadius: "50%",
                borderBottomLeftRadius: "50%",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
