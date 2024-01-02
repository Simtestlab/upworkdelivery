import {
  AllBuy,
  AllSell,
  Zerodha,
  IIFL,
  Buying,
  CancelOpenOrder,
  Equity,
  ForLoop,
  IfElse,
  Indicators,
  Instruments,
  LotSize,
  OrderCount,
  OrderFilter,
  Pnl,
  PnlCheckFrequency,
  PremiumAbove,
  PremiumBelow,
  PremiumMaxLimit,
  PriceLimit,
  Quantity,
  Selling,
  SquareOffAllPositions,
  StrikeSelection,
  StrikeSize,
  TradeLegs,
  TradingDecision,
  Triggers,
  WhileLoop,
  Instrument,
  StrikeLength,
} from "@/components/nodes";
import { camelCase, flatMap, map, pick } from "lodash";
import { NodeTypes } from "reactflow";

export const sidebarNavigation = [
  {
    label: "Broker Login",
    children: [
      { name: "Zerodha", component: Zerodha },
      { name: "IIFL", component: IIFL },
    ],
  },
  {
    label: "Instrument Selection",
    children: [
      { name: "Instrument", component: Instrument },
      { name: "Equity", component: Equity },
    ],
  },
  {
    label: "Customize Parameter",
    children: [
      { name: "Strike Size", component: StrikeSize },
      { name: "Lot Size", component: LotSize },
      { name: "Strike Length", component: StrikeLength },
      {
        label: "Scan Time",
        children: [
          { name: "PNL Check Frequency", component: PnlCheckFrequency },
          { name: "Trading Decision", component: TradingDecision },
          { name: "Buying", component: Buying },
          { name: "Selling", component: Selling },
        ],
      },
    ],
  },
  {
    label: "Decision",
    children: [{ name: "IF_else", component: IfElse }],
  },
  // {
  //   label: "Loops",
  //   children: [
  //     { name: "For Loop", component: ForLoop },
  //     { name: "While Loop", component: WhileLoop },
  //   ],
  // },
  // {
  //   label: "Trading",
  //   children: [
  //     { name: "Instruments", component: Instruments },
  //     { name: "Indicators", component: Indicators },
  //     { name: "Triggers", component: Triggers },
  //     { name: "Trade Legs", component: TradeLegs },
  //   ],
  // },
  // {
  //   label: "OMS",
  //   children: [
  //     { name: "Cancel Open Order", component: CancelOpenOrder },
  //     {
  //       label: "Square Off All Positions",
  //       children: [{ name: "Order Filter", component: OrderFilter }],
  //     },
  //     {
  //       label: "Square Positions",
  //       children: [
  //         { name: "Price Limit", component: PriceLimit },
  //         { name: "Premium Above", component: PremiumAbove },
  //         { name: "Premium Below", component: PremiumBelow },
  //         { name: "All Buy", component: AllBuy },
  //         { name: "All Sell", component: AllSell },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: "Hedge Buy",
  //   children: [
  //     { name: "Premium Max Limit", component: PremiumMaxLimit },
  //     { name: "Quantity", component: Quantity },
  //   ],
  // },
  // {
  //   label: "RMS",
  //   children: [
  //     { name: "PNL", component: Pnl },
  //     { name: "Order Count", component: OrderCount },
  //   ],
  // },
  // {
  //   label: "Trade Leg",
  //   children: [{ name: "Strike Selection", component: StrikeSelection }],
  // },
  // Add more sections and children as needed
];

export const generatedNodeTypes: NodeTypes = Object.assign(
  {},
  ...flatMap(sidebarNavigation, (item) =>
    flatMap(item.children, (child) => {
      if (child.children) {
        return map(child.children, (grandChild) =>
          pick(grandChild, ["name", "component"])
        );
      }
      return pick(child, ["name", "component"]);
    })
  ).map((node) => ({
    [camelCase(node.name)!]: node.component,
  }))
);
