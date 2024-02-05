import { useReactFlow } from "reactflow";

export const useNodeDataChange = () => {
  const { getNodes, setNodes } = useReactFlow();
  const nodes = getNodes();
  const updateNodeData = (
    id: any,
    index: number,
    type: string,
    data: Record<string, any>
  ) => {
    if (!id) return;
    const findIndex = nodes.findIndex((item) => item.id === id);
    if (findIndex !== -1) {
      Object.assign(nodes[findIndex].data[type][index], data);
      console.log(nodes[findIndex].data[type][index]);
      // setNodes(nodes);
    }
  };

  return {
    updateNodeData,
  };
};
