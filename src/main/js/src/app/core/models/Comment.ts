import { Publication } from '../interfaces/Publication';

export interface Comment extends Publication {
  id        : number,
  author    : number,
  content   : string,
  post      : number,
  published : string
}
