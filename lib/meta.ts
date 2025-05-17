import type { DefaultNumberDetectors } from "./types"

/*
  Return true if param has RegExp that contains at least on of NumberDetectors
*/
export type IsNumber<
  Name extends string, 
  DirtyParam extends string,
  NumberDetectors extends string [] = DefaultNumberDetectors
> = 
DirtyParam extends `${Name}(${infer RegExp})${infer _}` 
  ? NextNumberDetector<RegExp, NumberDetectors>
  : false

type NextNumberDetector<RegExp extends string, NumberDetectors extends string[]> = 
  NumberDetectors extends [infer CurrentDetector, ...infer RestDetectors]
    ? RegExp extends CurrentDetector
      ? true
      : RestDetectors extends string []
        ? NextNumberDetector<RegExp, RestDetectors>
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