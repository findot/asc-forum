
export interface Account {
  id        : number,
  username  : string,
  email     : string,
  registered: string,
  admin     : boolean,
  closed    : boolean,
  posts     : number[],
  comments  : number[],
}
