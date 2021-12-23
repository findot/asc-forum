import { Publication } from '../interfaces/Publication';
import { Ord } from 'fp-ts/Ord';
import { Ordering } from 'fp-ts/Ordering';


export interface Post extends Publication {
  id          : number,
  author      : number,
  title       : String,
  content     : String,
  comments    : number[],
  published   : string,
  highlighted : boolean
}

export const PostOrdId: Ord<Post> = {
  compare: function (first: Post, second: Post): Ordering {
    if (first.id < second.id) return -1;
    if (first.id > second.id) return 1;
    return 0;
  },
  equals: function (x: Post, y: Post): boolean {
    return x.id === y.id;
  }
}

export const PostOrdPublished: Ord<Post> = {
  compare: function (first: Post, second: Post): Ordering {
    const d = (p: Post) => Date.parse(p.published);
    const [firstDate, secondDate] = [d(first), d(second)];
    if (firstDate < secondDate) return -1;
    if (firstDate > secondDate) return 1;
    return 0;
  },
  equals: function (x: Post, y: Post): boolean {
    return x.published === y.published;
  }
}