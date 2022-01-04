import { Publication } from '../interfaces/Publication';

export type Comment = {
  readonly tag : 'Comment';
  id           : number;
  author       : number;
  content      : string;
  post         : number;
  published    : string;
}
