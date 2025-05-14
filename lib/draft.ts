import { InferDirtyParams, RemapDitryParams, RemapParamsWithTypesDetection } from "./parser"
import { NamedRouteRecordRaw, VueRouteParams } from "./types"
import { RemapParamsToVue } from "./vue"

type RemapFullSteps<Path extends string> = RemapParamsToVue<
  RemapParamsWithTypesDetection<
    RemapDitryParams<
      InferDirtyParams<
        Path
      >
    >
  >
>

export type GenerateRoutesDraft<
  Routes extends NamedRouteRecordRaw[],
  ParamsFromParent extends VueRouteParams = {}
> = {
  [K in Routes[number] as K['name']]: {
    name: K['name'],
    path: K['path'],
    params: RemapFullSteps<K['path']> & ParamsFromParent,
    children: K extends { children: NamedRouteRecordRaw[] } 
      ? GenerateRoutesDraft<
          K['children'],
          RemapFullSteps<K['path']> & ParamsFromParent
        >
      : never
  }
}