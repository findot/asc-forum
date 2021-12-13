
export interface RequestFailure {
  code: number,
  reason: { [key:string]: string }
}


export interface Loading {
  kind: 'loading',
  message: string
}

export interface Failed {
  kind: 'failed',
  reason: RequestFailure
}

export interface Succeeded<T> {
  kind: 'succeeded',
  payload: T
}

export type Submission<T> = Loading | Failed | Succeeded<T>;