import { Statistics } from "./search-item.model";

export interface CardView {
  img: string;
  statistics?: Statistics;
  title: string;
  id: string;
  publishedAt: string;
}