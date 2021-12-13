
const AUTO              = 'auto';
export type Span        = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Column      = Span | typeof AUTO;

export type Order       = 0 | 1 | 2 | 3 | 4 | 5;
export type Breakpoint  = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type Sized       = {
  [key in Breakpoint]?: Column;
};

export class SizedComponent {
  
  protected getSized(
    prop: string & keyof this,
    base: string | string[] = '',
    propertyName?: string
  ): string {
    base = typeof base === 'string' ? base : base.join(' ');

    if (this[prop] === undefined)
      return base;
    
    propertyName = propertyName ?? prop;

    if (typeof this[prop] === 'number')
      return `${base} ${propertyName}-${this[prop]}`;

    return Object
      .entries(this[prop])
      .reduce((a, [k, v]) => 
        `${a} ${propertyName}${k === 'base' ? '' : '-' + k}-${v}`,
        base
      );
  }

}