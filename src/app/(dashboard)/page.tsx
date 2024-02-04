"use client";

import React, { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from "reactflow";
import { useFlow } from "@/hooks/useFlow";
import { Input } from "@/components/ui/input";

import "reactflow/dist/style.css";

import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";

import { useThemeStore } from "@/store/useThemeStore";
import { useLocalStorage } from "usehooks-ts";
import { useDiagramStore } from "@/store/useDiagramStore";

import Header from "@/components/header";
import { cn } from "@/lib/utils";
import { usePropertyStore } from "@/store/usePropertyStore";
import { Properties } from "@/components";

const proOptions = { hideAttribution: true };

type Props = {};

const HomePage = (props: Props) => {
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const {
    nodes,
    nodeTypes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    reactFlowWrapper,
    setReactFlowInstance,
    onDrop,
    onDragOver,
    setEdgeStyleType,
    edgeStyleType,
    diagramName,
    setDiagramName,
  } = useFlow();

  const { setTheme, theme, systemTheme } = useTheme();
  const { themeStyle, setThemeStyle } = useThemeStore();
  const { showProperty, properties, setProperties, setShowProperty } =
    usePropertyStore();

  useEffect(() => {
    if (themeStyle === "turbo-flow") {
      document.documentElement.style.setProperty(
        "--edge-path-stroke",
        "url(#edge-gradient)"
      );
    } else {
      document.documentElement.style.setProperty("--edge-path-stroke", "black");
    }
  }, [themeStyle, theme]);

  // Prevent Page Leave
  const rootNodes = getNodes();
  const rootEdges = getEdges();

  useEffect(() => {
    if (rootNodes.length <= 0 && rootEdges.length <= 0 && diagramName === "")
      return;

    function handleOnBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = "Are you sure to leave this page?");
    }
    window.addEventListener("beforeunload", handleOnBeforeUnload, {
      capture: true,
    });

    return () =>
      window.removeEventListener("beforeunload", handleOnBeforeUnload, {
        capture: true,
      });
  }, [rootNodes, rootEdges, diagramName]);

  return (
    <React.Fragment>
      <Header {...{ setDiagramName, diagramName }} />
      <div className="px-5">
        <div className="pb-5">
          <div className="w-full flex pb-5 gap-5">
            <div
              className={cn(
                "!h-[calc(100vh-64px-1.25rem-36px-156px)] transition-['width'] duration-300",

                showProperty ? "w-[75%]" : "w-full"
              )}
              ref={reactFlowWrapper}
            >
              <ReactFlow
                {...{
                  proOptions,
                  nodeTypes,
                  nodes,
                  onNodesChange,
                  onEdgesChange,
                  onConnect,
                  onDrop,
                  onDragOver,
                  edges,
                }}
                nodesConnectable={true}
                maxZoom={2}
                minZoom={0.3}
                deleteKeyCode={`Delete`}
                onInit={setReactFlowInstance}
                fitView
                fitViewOptions={{ maxZoom: 0.8 }}
                className="border rounded-md"
                id="canvas"
              >
                <svg className="absolute">
                  <defs>
                    <linearGradient id="edge-gradient">
                      <stop offset="0%" stopColor="#ae53ba" />
                      <stop offset="100%" stopColor="#2a8af6" />
                    </linearGradient>

                    <marker
                      id="edge-circle"
                      viewBox="-5 -5 10 10"
                      refX="0"
                      refY="0"
                      markerUnits="strokeWidth"
                      markerWidth="10"
                      markerHeight="10"
                      orient="auto"
                    >
                      <circle
                        stroke="#2a8af6"
                        strokeOpacity="0.75"
                        r="2"
                        cx="0"
                        cy="0"
                      />
                    </marker>
                  </defs>
                </svg>
                <Input
                  type="text"
                  // defaultValue="untitled"
                  value={diagramName ?? "untitled"}
                  onChange={(e) => setDiagramName(e.target.value)}
                  className="max-w-xs w-full relative z-50 top-3 left-3 bg-background border-2"
                  placeholder="Enter Diagram Name"
                />
                {/* <div className="flex items-center absolute z-50 top-3 right-3 gap-3">
                  {themeStyle === "light-dark" && (
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="light-dark-switch">Switch</Label>
                      <Switch
                        id="light-dark-switch"
                        // defaultChecked={theme === "light"}
                        checked={isDarkMode}
                        onCheckedChange={(checked) =>
                          setTheme(checked ? "dark" : "light")
                        }
                      />
                    </div>
                  )}
                  <Select
                    defaultValue={edgeStyleType}
                    onValueChange={setEdgeStyleType}
                  >
                    <SelectTrigger className="w-[180px] bg-background border-2">
                      <SelectValue placeholder="Connection Line" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="smoothstep">Smooth Step</SelectItem>
                        <SelectItem value="step">Step</SelectItem>
                        <SelectItem value="default">Bezier</SelectItem>
                        <SelectItem value="straight">Straight</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    defaultValue={themeStyle}
                    onValueChange={(value) => setThemeStyle(value)}
                  >
                    <SelectTrigger className="w-[180px] bg-background border-2">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="light-dark">
                          Light + Dark Mode
                        </SelectItem>
                        <SelectItem value="tailwind">Tailwind</SelectItem>
                        <SelectItem value="turbo-flow">Turbo Flow</SelectItem>
                        <SelectItem value="base-style">Base Style</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div> */}
                <Background />
                <Controls />
                <MiniMap zoomable pannable />
                <style jsx>{`
                  .react-flow__edge-path {
                    stroke: url(#edge-gradient) !important;
                    stroke-width: 2;
                    stroke-opacity: 0.75;
                  }
                `}</style>
              </ReactFlow>
            </div>
            <Properties />
          </div>

          <div className="space-y-1">
            <Label htmlFor="diagram">Logs</Label>
            <div className="bg-black overflow-auto max-h-32">
              <pre className="text-green-400 p-3">
                {JSON.stringify({ nodes, edges }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
