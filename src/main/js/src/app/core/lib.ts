import { Component, Injectable, Input, OnDestroy, OnInit } from "@angular/core";
import { TupleType } from "typescript";

export function assert(condition: boolean, message?: string) {
  if (!condition) throw new Error(message);
}

// Decorator
export function CoerceBoolean(): PropertyDecorator {

  return (target: object, propertyKey: string | symbol): void => {

    // double underscore used as to not pollute the single underscore private 'namespace'
    const coercedBooleanKey = `__${String(propertyKey)}`;

    Object.defineProperty(target, propertyKey, {
      // function used over fat arrow syntax to preserve the value of `this`
      get: function(): boolean {
        return this[coercedBooleanKey] || false;
      },
      set: function(booleanAttribute: boolean | unknown): void {
        this[coercedBooleanKey] = booleanAttribute === '' || booleanAttribute === 'true' || booleanAttribute === true;
      }
    });
  };

}

// Decorator
export function BooleanInput(bindingPropertyName?: string): PropertyDecorator {
  return function(obj: object, propertyKey: string | symbol) {
    CoerceBoolean()(obj, propertyKey);
    (Input as Function)(bindingPropertyName)(obj, propertyKey);
  }
}

// TODO - Place somewhere else
@Injectable() // FIXME
export class StoredService {
  
  __store__?: [string, string | undefined][];

  constructor() {
    for (const stored of this.__store__ || []) {
      const [key, awakeningMethodName] = stored;
      const objKey = key as keyof this;
      
      if (this[objKey] !== null && this[objKey] !== undefined)
        continue;
      
      const storeValue = window.localStorage.getItem(key);
      if (storeValue === null)
        return;

      this[objKey] = JSON.parse(storeValue);
      if (!awakeningMethodName)
        return;
      
      const funcProp = awakeningMethodName as keyof this;
      const awakeningMethod = this[funcProp] as unknown as Function;
      awakeningMethod.call(this);
    }
  }

}

// TODO - Place somewhere else
export function Stored(awakeningFunctionName?: string): PropertyDecorator {
  return function(obj: any, propertyKey: string | symbol) {
    
    if (!(obj instanceof StoredService))
      throw new Error('Stored is usable only on StoredService');
    
    if (obj['__store__'] === undefined)
      obj['__store__'] = [];

    obj['__store__'].push([String(propertyKey), awakeningFunctionName]);

    Object.defineProperty(obj, propertyKey, {
      // function used over fat arrow syntax to preserve the value of `this`
      get: function(): unknown {
        return this[`_${String(propertyKey)}`];
      },
      set: function(value: unknown): void {
        this[`_${String(propertyKey)}`] = value;
        const storedValue = JSON.stringify(value);
        window.localStorage.setItem(String(propertyKey), storedValue);
      }
    });
  }
}