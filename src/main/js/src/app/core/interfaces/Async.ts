import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Either, left, match, right } from 'fp-ts/Either';
import { flow, pipe } from "fp-ts/lib/function";

export interface RequestFailure {
  code  : number,
  reason: {
    [key:string]: string
  }
}

// Loading

export type Loading = {
  kind: 'loading',
  message: string
}

export function loading(message: string): Loading {
  return { kind: 'loading', message };
}

// Failed

export type Failed = {
  kind: 'failed',
  reason: RequestFailure
}

export function failed<T>(reason: RequestFailure): Submission<T> {
  return { kind: 'failed', reason };
}

// Succeeded

export type Succeeded<T> = {
  kind: 'succeeded',
  payload: T
}

export function succeeded<T>(payload: T): Submission<T> {
  return { kind: 'succeeded', payload };
}

// Submission

export type Submission<T> = Loading | Failed | Succeeded<T>;


export function asResult<E, V>(o: Observable<V>): Observable<Either<E, V>> {
  return o.pipe(
    map(v => right<E, V>(v)),
    catchError((e: E) => of(left<E, V>(e))),
  );
}

export function toSubmission<E extends RequestFailure, V>(value: Either<E, V>): Submission<V> {
  return pipe<Either<E, V>, Submission<V>>(value, match(
    e => failed(e),
    v => succeeded<V>(v)
  ));
}
