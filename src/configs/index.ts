import {
  BoundingBox,
  CombineXyz,
  Cube,
  CurveCircle,
  CurveToMesh,
  Cylinder,
  FilletCurve,
  Grid,
  GroupInput,
  GroupOutput,
  InputIndex,
  InstanceOnPoints,
  JoinGeometry,
  MapRange,
  Points,
  Quadrilateral,
  SeparateXyz,
  SetMaterial,
  Transform,
  UvSphere,
  Value,
  Vector,
  VectorMath,
  Viewer,
  Math,
} from "@/components/nodes";
import { camelCase, flatMap, map, pick } from "lodash";
import { NodeTypes } from "reactflow";

export const sidebarNavigation = [
  {
    label: "Utilities",
    children: [
      {
        name: "Map Range",
        component: MapRange,
      },
      { name: "Math", component: Math },
    ],
  },
  {
    label: "Vector",
    children: [
      { name: "Combine XYZ", component: CombineXyz },
      { name: "Separate XYZ", component: SeparateXyz },
      { name: "Vector Math", component: VectorMath },
    ],
  },
  {
    label: "Input",
    children: [
      { name: "Index", component: InputIndex },
      { name: "Value", component: Value },
      { name: "Vector", component: Vector },
    ],
  },
  {
    label: "Output",
    children: [{ name: "Viewer", component: Viewer }],
  },
  {
    label: "Point",
    children: [{ name: "Points", component: Points }],
  },
  {
    label: "Instances",
    children: [{ name: "Instance on Points", component: InstanceOnPoints }],
  },
  {
    label: "Curve Primitives",
    children: [
      { name: "Curve Circle", component: CurveCircle },
      { name: "Quadrilateral", component: Quadrilateral },
    ],
  },
  {
    label: "Curve",
    children: [
      { name: "Curve to Mesh", component: CurveToMesh },
      { name: "Fillet Curve", component: FilletCurve },
    ],
  },
  {
    label: "Mesh Primitives",
    children: [
      { name: "Cube", component: Cube },
      { name: "Cylinder", component: Cylinder },
      { name: "UV Sphere", component: UvSphere },
      { name: "Grid", component: Grid },
    ],
  },
  {
    label: "Geometry",
    children: [
      { name: "Join Geometry", component: JoinGeometry },
      { name: "Transform", component: Transform },
      { name: "Bounding Box", component: BoundingBox },
    ],
  },
  {
    label: "Material",
    children: [{ name: "Set Material", component: SetMaterial }],
  },
  {
    label: "Group",
    children: [
      { name: "Group Input", component: GroupInput },
      { name: "Group Output", component: GroupOutput },
    ],
  },
].sort((a, b) => a.label.localeCompare(b.label));

export const generatedNodeTypes: NodeTypes = Object.assign(
  {},
  ...flatMap(sidebarNavigation, (item) =>
    flatMap(item.children, (child) => {
      return pick(child, ["name", "component"]);
    })
  ).map((node) => ({
    [camelCase(node.name)!]: node.component,
  }))
);
