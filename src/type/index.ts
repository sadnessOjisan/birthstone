import { ItemType } from "../schema";

export type Game = ItemType;
export type Cell = {
  date: Date | undefined;
  game: Game[];
};
export type Calendar = Cell[][];
