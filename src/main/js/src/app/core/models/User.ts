export interface User {
  id        : number,
  username  : string,
  email     : string,
  admin     : boolean,
  closed    : boolean,
  posts     : number[],
  comments  : number[],
}
