
export interface JWTToken {
  iss: string,
  sub: string,
  iat: number,
  nbf: number,
  exp: number,
  isAdmin: boolean
}