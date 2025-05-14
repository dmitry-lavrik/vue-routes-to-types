import { RemapedParam } from "./types"

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
        when params market as "/:parts*" and empty
    */
    ? T['number'] extends true ? number[] : string[] 
    : T['number'] extends true ? number : string
