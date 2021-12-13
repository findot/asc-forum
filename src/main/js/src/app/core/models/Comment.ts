import { User } from "./User";

export interface Comment {
  id?: number,
  content: string,
  post?: number,
  author?: User | number,
  published?: string
}