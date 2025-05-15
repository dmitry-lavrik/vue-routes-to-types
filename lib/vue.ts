import type { RemapedParam } from "./types"

export type RemapParamsToVue<Params extends Record<string, RemapedParam>> = 
  // Build required params
  {
    [K in keyof Params & string as Params[K]['optional'] extends false ? K : never]: InferParamType<Params[K]>
  } & 
  // Build optional params
  {
    [K in keyof Params & string as Params[K]['optional'] extends true ? K : never]?: InferParamType<Params[K]>
  }

type InferParamType<T extends RemapedParam> = 
  T['repeatable'] extends true
    /* 
      todo: vue-router useRoute().params can return epmty string instead of array, 
        when params marked as "/:parts*" and empty
    */
    ? T['optional'] extends true 
      ? T['number'] extends true ? number[] : string[]
      // Now we make tuple that has length >= 1 because param is required
      : T['number'] extends true ? [number, ...number[]] : [string, ...string[]]
    : T['number'] extends true ? number : string
