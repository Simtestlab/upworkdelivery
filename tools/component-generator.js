import pkg from "lodash";
import fs from "fs";
import path from "path";

const { camelCase, kebabCase, upperFirst } = pkg;
const __dirname = path.resolve();

export const sidebarNavigation = [
  {
    label: "Utilities",
    children: [
      { name: "Map Range", component: "BaseNode" },
      { name: "Math", component: "Math" },
    ],
  },
  {
    label: "Vector",
    children: [
      { name: "Combine XYZ", component: "CombineXYZ" },
      { name: "Separate XYZ", component: "SeparateXYZ" },
      { name: "Vector Math", component: "VectorMath" },
    ],
  },
  {
    label: "Input",
    children: [
      { name: "Index", component: "Index" },
      { name: "Value", component: "Value" },
      { name: "Vector", component: "InputVector" },
    ],
  },
  {
    label: "Output",
    children: [{ name: "Viewer", component: "Viewer" }],
  },
  {
    label: "Point",
    children: [{ name: "Points", component: "Points" }],
  },
  {
    label: "Instances",
    children: [{ name: "Instance on Points", component: "InstanceOnPoints" }],
  },
  {
    label: "Curve Primitives",
    children: [
      { name: "Curve Circle", component: "CurvePrimitiveCircle" },
      { name: "Quadrilateral", component: "CurvePrimitiveQuadrilateral" },
    ],
  },
  {
    label: "Curve",
    children: [
      { name: "Curve to Mesh", component: "CurveToMesh" },
      { name: "Fillet Curve", component: "FilletCurve" },
    ],
  },
  {
    label: "Mesh Primitives",
    children: [
      { name: "Cube", component: "MeshPrimitiveCube" },
      { name: "Cylinder", component: "MeshPrimitiveCylinder" },
      { name: "UV Sphere", component: "MeshPrimitiveUvSphere" },
      { name: "Grid", component: "MeshPrimitiveGrid" },
    ],
  },
  {
    label: "Geometry",
    children: [
      { name: "Join Geometry", component: "JoinGeometry" },
      { name: "Transform", component: "Transform" },
      { name: "Bounding Box", component: "BoundingBox" },
    ],
  },
  {
    label: "Material",
    children: [{ name: "Set Material", component: "SetMaterial" }],
  },
  {
    label: "Group",
    children: [
      { name: "Group Input", component: "GroupInput" },
      { name: "Group Output", component: "GroupOutput" },
    ],
  },
];

const componentCode = (name) => {
  return `
import React from "react";
import { BaseNode } from "@/layouts";
import { Node } from "reactflow";

export const ${upperFirst(camelCase(name))} = (props: Node) => {
  return <BaseNode title="${name}" node={props} />;
};
`;
};

sidebarNavigation.forEach((navigation) => {
  const rootDirectory = path.join(
    __dirname,
    `/src/components/nodes/${kebabCase(navigation.label)}`
  );
  const nodesDirectory = path.join(__dirname, `/src/components/nodes`);

  navigation.children.forEach((child) => {
    if (child.children) {
      const childDirectory = `${rootDirectory}/${kebabCase(child.label)}`;

      child.children.forEach((grandChild) => {
        const file = `${childDirectory}/${kebabCase(grandChild.name)}`;
        if (!fs.existsSync(file)) {
          fs.mkdirSync(file, { recursive: true });
        }

        fs.writeFileSync(file + "/index.tsx", componentCode(grandChild.name));
        fs.appendFileSync(
          childDirectory + "/index.ts",
          `export * from "./${kebabCase(grandChild.name)}"\n`
        );
      });
      if (child.label) {
        fs.appendFileSync(
          rootDirectory + "/index.ts",
          `export * from "./${kebabCase(child.label)}"\n`
        );
      }
    } else {
      const file = `${rootDirectory}/${kebabCase(child.name)}`;
      if (!fs.existsSync(file)) {
        fs.mkdirSync(file, { recursive: true });
      }
      fs.writeFileSync(file + "/index.tsx", componentCode(child.name));
      fs.appendFileSync(
        rootDirectory + "/index.ts",
        `export * from "./${kebabCase(child.name)}"\n`
      );
      console.log("creating", child.name);
    }
  });

  fs.appendFileSync(
    nodesDirectory + "/index.ts",
    `export * from "./${kebabCase(navigation.label)}"\n`
  );
});
