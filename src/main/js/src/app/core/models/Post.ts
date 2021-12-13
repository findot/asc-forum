import { User } from './User';
import { Comment } from './Comment';

export interface Post {
  id?: number,
  title: String,
  content: String,
  author?: User | number,
  comments?: Comment[] | number[],
  published?: string,
  highlight?: boolean
}