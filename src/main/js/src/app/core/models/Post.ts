import { Publication } from '../interfaces/Publication';

export interface Post extends Publication {
  id        : number,
  author    : number,
  title     : String,
  content   : String,
  comments  : number[],
  published : string,
  highlight : boolean
}