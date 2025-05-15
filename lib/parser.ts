import type { IsNumber, IsOptional, IsRepeatable } from "./meta";

// const VALID_PARAM_RE = /[a-zA-Z0-9_]/; // vue-router@4.5.1/dist/vue-router.mjs::1244
type AllowedParamCharsTuple = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 
  't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
  'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4',
  '5', '6', '7', '8', '9', '_' 
];

type AllowedParamChars = AllowedParamCharsTuple[number]

export type InferDirtyParams<T extends string> = 
  T extends `${infer _}:${infer Name}:${infer Next}`
    ? [ Name, ...InferDirtyParams<`:${Next}`> ]
      : T extends `${infer _}:${infer Name}`
        ? Name extends '' 
          ? [] 
          : [ Name ]
        : []

/* param name must be less than 49 chars in VSCode to prevent ts crash */
export type GetCleanedParamName<
  Name extends string, 
  AllowedChars extends string = AllowedParamChars
> 
= Name extends `${infer Char}${infer Next}` 
    ? Char extends AllowedChars
      ? `${Char}${GetCleanedParamName<Next>}`
      : ''
    : Name extends ''
      ? ''  
      : Name extends AllowedChars
        ? Name
        : ''

export type RemapDitryParams<Params extends string[]> = {
  [K in Params[number] as GetCleanedParamName<K>]: K
}

export type RemapParamsWithTypesDetection<T extends Record<string,string>> = {
  [K in keyof T & string]: {
    number: IsNumber<`:${K}`, `:${T[K]}`> // looks strange, but it totaly guarantees right start of string
    optional: IsOptional<`:${K}`, `:${T[K]}`>,
    repeatable: IsRepeatable<`:${K}`, `:${T[K]}`>
  }
}