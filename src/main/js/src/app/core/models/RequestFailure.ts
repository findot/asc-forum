import { MapLike } from "typescript";

export interface RequestFailure {
  code: number,
  reason: { [key:string]: string }
}