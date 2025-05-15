/*
  Return true if param has RegExp that contains \d
  todo: provide custom user login to detect number regexps
*/
export type IsNumber<
  Name extends string, 
  DirtyParam extends string
> = 
DirtyParam extends `${Name}(${infer RegExp})${infer _}` 
  ? RegExp extends `\\d`
    ? true
    : RegExp extends `\\d+`
      ? true
      : RegExp extends `\\d*` //todo: not sure, mb it is not number
        ? true 
        : false
  : false

/*
  Return true if param marked as optinal with ? or *
*/
export type IsOptional<
  Name extends string, 
  DirtyParam extends string
> = 
// check ? after regexp()
DirtyParam extends `${Name}(${infer _})?${infer _}` 
  ? true
  // check * after regexp()
  : DirtyParam extends `${Name}(${infer _})*${infer _}` 
    ? true
    // check ? after name
    : DirtyParam extends `${Name}?${infer _}` 
      ? true 
      // check * after name
      : DirtyParam extends `${Name}*${infer _}` 
        ? true 
        : false

/*
  Return true if param marked as repeatable with + or *
*/
export type IsRepeatable<
  Name extends string, 
  DirtyParam extends string
> = 
// check + after regexp()
DirtyParam extends `${Name}(${infer _})+${infer _}` 
  ? true
  // check * after regexp()
  : DirtyParam extends `${Name}(${infer _})*${infer _}` 
    ? true
    // check + after name
    : DirtyParam extends `${Name}+${infer _}` 
      ? true
      // check * after name
      : DirtyParam extends `${Name}*${infer _}` 
        ? true
        : false