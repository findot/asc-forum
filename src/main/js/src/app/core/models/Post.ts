import { User } from './User';

export interface Post {
  id?: number,
  title: String,
  content: String,
  author?: User
}