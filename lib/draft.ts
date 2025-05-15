import type { InferDirtyParams, RemapDitryParams, RemapParamsWithTypesDetection } from "./parser"
import type { NamedRouteRecordRaw, VueRouteParams } from "./types"
import type { RemapParamsToVue } from "./vue"

type RemapFullSteps<Path extends string> = RemapParamsToVue<
  RemapParamsWithTypesDetection<
    RemapDitryParams<
      InferDirtyParams<
        Path
      >
    >
  >
>

type JoinPaths<Parent extends string, Current extends string> = 
  Current extends ''
    ? Parent
    : Parent extends `${infer _}/`
      ? `${Parent}${Current}`
      : Current extends `/${infer _}` 
        ? `${Parent}${Current}`
        : `${Parent}/${Current}`

export type GenerateRoutesDraft<
  Routes extends NamedRouteRecordRaw[],
  PathFromParent extends string = '',
  ParamsFromParent extends VueRouteParams = {}
> = {
  [K in Routes[number] as K['name']]: {
    name: K['name'],
    path: JoinPaths<PathFromParent, K['path']>,
    params: RemapFullSteps<JoinPaths<PathFromParent, K['path']>> & ParamsFromParent,
    children: K extends { children: NamedRouteRecordRaw[] } 
      ? GenerateRoutesDraft<
          K['children'],
          JoinPaths<PathFromParent, K['path']>,
          RemapFullSteps<
            JoinPaths<PathFromParent, K['path']>
          > & ParamsFromParent
        >
      : null
  }
}