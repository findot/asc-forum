import { Ord } from 'fp-ts/Ord';
import { Ordering } from 'fp-ts/Ordering';

export type Publication = {
  readonly tag: 'Comment' | 'Post';
  id: number;
  author: number;
  published: string;
}

export const OrdPublished: Ord<Publication> = {
  compare: function (first: Publication, second: Publication): Ordering {
    const d = (p: Publication) => Date.parse(p.published);
    const [firstDate, secondDate] = [d(first), d(second)];
    if (firstDate < secondDate) return -1;
    if (firstDate > secondDate) return 1;
    return 0;
  },
  equals: function (x: Publication, y: Publication): boolean {
    return x.published === y.published;
  }
}