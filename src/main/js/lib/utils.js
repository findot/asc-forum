
export const defined = thing =>
  thing !== undefined && thing !== null;


export const clean = (o, hard = false) => {
  const predicate = hard ? truthy : defined;
  return Object
    .keys(o)
    .reduce((a, k) => predicate(o[k]) ? update(a, k, o[k]) : a, {});
}