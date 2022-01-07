
// Viewport breakpoints
export type Breakpoint  = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type Break<T>    = { [key in Breakpoint]?: T };

// Bootstrap grid sizings
const AUTO              = 'auto';
export type Span        = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Column      = Span | typeof AUTO;

// Bootstrap rules for margins, paddings, ...
export type Rule        = 0 | 1 | 2 | 3 | 4 | 5;

// Alignments
export type Alignment   = 'start' | 'end';

// Shadows
export type ShadowBreakpoint = 'sm' | 'md' | 'lg';

// TODO
export type Sized       = Column | Break<Column>;
export type Ruled       = Rule | Break<Rule>;
export type Aligned     = Alignment | Break<Alignment>;

// TODO
export function sized(
  prefix: string,
  value: Ruled | Sized,
  base: string | string[] = ''
) {
  base = typeof base === 'string' ? base : base.join(' ');
  return (typeof value === 'number' || value === 'auto')
    ? `${prefix}-${value}`
    : Object.entries(value).reduce((a, [k, v]) =>
      k === 'base'
        ? `${a} ${prefix}-${v}`
        : `${a} ${prefix}-${k}-${v}`,
      base
    );
}


export class SizedComponent {
  
  protected getSized(
    prop: string & keyof this,
    base: string | string[] = '',
    propertyName?: string
  ): string {
    base = typeof base === 'string' ? base : base.join(' ');
    if (this[prop] === undefined)
      return base;
    return sized(propertyName ?? prop, this[prop], base);
  }

}
