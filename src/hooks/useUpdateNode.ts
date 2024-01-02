import { useReactFlow } from "reactflow";

export const useNodeDataChange = () => {
  const { getNodes, setNodes } = useReactFlow();
  const nodes = getNodes();
  const updateNodeData = (id: any, data: Record<string,any>) => {
    if(!id) return;
      const findIndex = nodes.findIndex(item => item.id === id);
      if(findIndex !== -1) {
        Object.assign(nodes[findIndex].data, data);
        setNodes(nodes)
      }
  };

  return {
    updateNodeData,
  };
};
