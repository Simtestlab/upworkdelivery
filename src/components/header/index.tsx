import React, { Dispatch, SetStateAction, useState } from "react";
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
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useFlow } from "@/hooks/useFlow";
import { useLocalStorage } from "usehooks-ts";

interface HeaderProps {
  diagramName: string;
  setDiagramName: Dispatch<SetStateAction<string>>;
}

// const controls = [
//   {
//     icon: <BookMarked color="#333" size={22} />,
//     onClick: () => {
//       setDefault(diagramName);
//     },
//     title: "Default",
//   },
//   {
//     icon: <Crop color="#333" size={22} />,
//     onClick: () => {
//       setNodes(() => []);
//       setEdges(() => []);
//     },
//     title: "Blank",
//   },
//   {
//     icon: <FilePlus2 color="#333" size={22} />,
//     onClick: () => {
//       setDiagramName("");
//       setNodes(() => []);
//       setEdges(() => []);
//     },
//     title: "New",
//   },
//   {
//     icon: <Copy color="#333" size={22} />,
//     onClick: () => handleButtonClick(),
//     title: "Copy",
//   },
//   {
//     icon: <ArrowDownToLine color="#333" size={22} />,
//     onClick: () => toJSON({ nodes: getNodes(), edges: getEdges() }),
//     title: "Download",
//   },
//   {
//     icon: <Eraser color="#333" size={22} />,
//     onClick: () => {
//       setDiagramName("");
//       setNodes(() => []);
//       setEdges(() => []);
//     },
//     title: "Clear",
//   },
// ];
const Header = ({ setDiagramName, diagramName }: HeaderProps) => {
  const { setDefault } = useDiagramStore();
  const [diagrams, setDiagrams] = useLocalStorage("diagrams", {});
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const { handleButtonClick } = useCopyImage();

  const onDiagramSave = () => {
    if (diagramName !== "") {
      setDiagrams(
        Object.assign(diagrams, {
          [diagramName]: { nodes: getNodes(), edges: getEdges() },
        })
      );
    } else {
      alert("Please enter a diagram name");
    }
  };

  return (
    <React.Fragment>
      {/* <header className="bg-primary h-20 px-5 flex items-center justify-end"></header> */}
      <div
        // ref={ref}
        className="p-5 flex justify-between items-center gap-10"
      >
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                onClick={() => {
                  setDiagramName("");
                  setNodes(() => []);
                  setEdges(() => []);
                }}
              >
                New Diagram <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={() => setShowSaveDialog(true)}>
                Save Diagram
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                onClick={() => toJSON({ nodes: getNodes(), edges: getEdges() })}
              >
                Export
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => window.print()}>
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Crop</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => handleButtonClick()}>
                Copy
              </MenubarItem>
              <MenubarItem
                onClick={() => {
                  setDiagramName("");
                  setNodes(() => []);
                  setEdges(() => []);
                }}
              >
                Clear
              </MenubarItem>
              {/*
              <MenubarItem>Paste</MenubarItem> */}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Toggle Fullscreen</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Hide Sidebar</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {/* <div className="flex items-center gap-2">
          <button className="border rounded-md py-1 px-3">Blacktest</button>
          <button className="border rounded-md py-1 px-3">Live</button>
        </div> */}
      </div>
      {diagramName === "" ? (
        <AlertDialog open={showSaveDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Please, first enter your{" "}
                <span className="text-red-500">diagram name</span>, then save
                it.
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowSaveDialog(false)}>
                Okay
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <AlertDialog open={showSaveDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you want to save the{" "}
                <strong className="text-green-600">{diagramName}</strong>{" "}
                diagram?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You have made changes to the {diagramName} diagram. Saving it
                will preserve your edits and ensure you can access it later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowSaveDialog(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onDiagramSave();
                  setShowSaveDialog(false);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </React.Fragment>
  );
};

export default Header;
