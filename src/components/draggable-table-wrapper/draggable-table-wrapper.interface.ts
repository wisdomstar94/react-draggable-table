import { ReactNode } from "react";

export declare namespace IDraggableTableWrapper {
  export type Data = Array<Array<number>>;

  export interface Props {
    className?: string;
    dragAreaClassName?: string;
    cellActiveClassName?: string;
    children?: ReactNode;

    dragAreaMargin?: number;
    data?: Data;
    onChange?: (data?: Data) => void;
    // onChangeEnd?: (data?: Data) => void;
  }
}