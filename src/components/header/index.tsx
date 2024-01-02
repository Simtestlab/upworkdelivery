import React, { Dispatch, SetStateAction } from "react";
import {
  ArrowDownToLine,
  BookMarked,
  Copy,
  Crop,
  Eraser,
  FilePlus2,
} from "lucide-react";
import { useReactFlow } from "reactflow";
import { toJSON } from "@/lib/utils";
import { TooltipFlow } from "../ui/tooltip";
import useCopyImage from "@/hooks/useCopyImage";
import { useDiagramStore } from "@/store/useDiagramStore";

interface HeaderProps {
  diagramName: string;
  setDiagramName: Dispatch<SetStateAction<string>>;
}

const Header = ({ setDiagramName, diagramName }: HeaderProps) => {
  const { setDefault } = useDiagramStore();
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const { handleButtonClick } = useCopyImage();
  const controls = [
    {
      icon: <BookMarked color="#333" size={22} />,
      onClick: () => {
        setDefault(diagramName);
      },
      title: "Default",
    },
    {
      icon: <Crop color="#333" size={22} />,
      onClick: () => {
        setNodes(() => []);
        setEdges(() => []);
      },
      title: "Blank",
    },
    {
      icon: <FilePlus2 color="#333" size={22} />,
      onClick: () => {
        setDiagramName("");
        setNodes(() => []);
        setEdges(() => []);
      },
      title: "New",
    },
    {
      icon: <Copy color="#333" size={22} />,
      onClick: () => handleButtonClick(),
      title: "Copy",
    },
    {
      icon: <ArrowDownToLine color="#333" size={22} />,
      onClick: () => toJSON({ nodes: getNodes(), edges: getEdges() }),
      title: "Download",
    },
    {
      icon: <Eraser color="#333" size={22} />,
      onClick: () => {
        setDiagramName("");
        setNodes(() => []);
        setEdges(() => []);
      },
      title: "Clear",
    },
  ];
  return (
    <React.Fragment>
      <header className="bg-primary h-20 px-5 flex items-center justify-end"></header>
      <div
        // ref={ref}
        className="py-2 px-5 flex justify-between items-center gap-10"
      >
        <h3 className="text-center text-xl font-bold">Flow Diagram</h3>
        <div className="flex items-center gap-2">
          <button className="border rounded-md py-1 px-3">Blacktest</button>
          <button className="border rounded-md py-1 px-3">Live</button>
        </div>
        <div className="flex items-center gap-2">
          {controls.map(({ onClick, icon, title }, index) => (
            <TooltipFlow title={title} key={index}>
              <button onClick={onClick} className="border rounded-md py-2 px-3">
                {icon}
              </button>
            </TooltipFlow>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
