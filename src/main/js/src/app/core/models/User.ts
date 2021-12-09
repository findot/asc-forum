import { Post } from './Post';

export interface User {
  id?: number,
  pseudo?: string,
  email?: string,
  password?: string
  posts?: Post[]
}
