import { Ord } from 'fp-ts/Ord';
import { Ordering } from 'fp-ts/Ordering';
import { Comment } from '../models/Comment';
import { Post } from '../models/Post';

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
    if (firstDate < secondDate) return 1;
    if (firstDate > secondDate) return -1;
    return 0;
  },
  equals: function (x: Publication, y: Publication): boolean {
    return x.published === y.published;
  }
}

const postKeys = ['id', 'author', 'title', 'content', 'comments', 'published', 'highlighted']; 
export function isPost(post: any): post is Post
{ return post.tag === 'Post' || postKeys.map(k => k in post).reduce((a, b) => a && b); }


const commentKeys = ['id', 'author', 'content', 'post', 'published']; 
export function isComment(comment: any): comment is Comment
{ return comment.tag === 'Comment' || commentKeys.map(k => k in comment).reduce((a, b) => a && b); }
