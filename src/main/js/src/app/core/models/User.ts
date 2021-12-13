import { Post } from './Post';

export interface User {
  id?: number,
  username?: string,
  email?: string,
  password?: string
  posts?: Post[]
}
