import { ReactNode } from "react";

export interface ITableHeading {
  title: string;
  icon?: ReactNode;
  variant: "input" | "text" | "actions";
  actions?: string[];
  maxLimit?: number;
}
export interface IParams {
  [key: string]: string;
}
