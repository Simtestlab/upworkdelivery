"use client";

import { sidebarNavigation } from "@/configs";
import Link from "next/link";
import { camelCase } from "lodash";
import React, { DragEvent, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";

const Sidebar = () => {
  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: string,
    nodeLabel: string
  ) => {
    console.log({ nodeType });
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/reactflow/nodeLabel", nodeLabel);
    event.dataTransfer.effectAllowed = "move";
  };

  const [keyword, setKeyword] = useState("");

  const filteredSidebar = sidebarNavigation.filter((section) => {
    const filteredChildren = section.children.filter((child) =>
      child?.name?.toLowerCase().includes(keyword.toLowerCase())
    );

    return filteredChildren.length > 0;
  });

  return (
    <aside className="w-72 min-h-screen bg-gray-100 dark:bg-background">
      <Link
        href="/"
        className="h-20 grid place-content-center text-center font-bold text-3xl bg-primary text-white"
      >
        ERender
      </Link>
      <div className="p-2">
        <div className="border bg-background h-24 flex flex-col justify-center items-center">
          Project tree structure goes here
        </div>
      </div>
      <div className="p-2">
        <div className="border bg-background">
          <h3 className="py-3 text-center text-xl font-bold">Blocks</h3>
          <div className="flex flex-col gap-y-3 p-5">
            <Input
              className="bg-background"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search For block"
            />
            <Accordion type="single" collapsible>
              {filteredSidebar.map((navigation, index) => (
                <AccordionItem key={index} value={navigation.label}>
                  <AccordionTrigger>{navigation.label}</AccordionTrigger>

                  <AccordionContent>
                    <div className="flex flex-col gap-2 p-1 pb-4">
                      {navigation.children.map((child) => {
                        if (child.children) {
                          return (
                            <Accordion
                              key={child.label}
                              type="single"
                              collapsible
                            >
                              <AccordionItem
                                key={index}
                                value={navigation.label}
                              >
                                <AccordionTrigger>
                                  {child.label}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="flex flex-col gap-2 p-1 pb-4">
                                    {child.children.map((grandChild) => (
                                      <div
                                        draggable
                                        onDragStart={(event) =>
                                          onDragStart(
                                            event,
                                            camelCase(grandChild.name),
                                            grandChild.name
                                          )
                                        }
                                        className="bg-background cursor-grab flex w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm transition-colors"
                                        key={grandChild.name}
                                      >
                                        {grandChild.name}
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          );
                        } else {
                          return (
                            <div
                              draggable
                              onDragStart={(event) =>
                                onDragStart(
                                  event,
                                  camelCase(child.name),
                                  child.name
                                )
                              }
                              className="bg-background cursor-grab flex w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm transition-colors"
                              key={child.name}
                            >
                              {child.name}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
