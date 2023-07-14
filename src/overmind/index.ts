import { createStateHook, createActionsHook, createEffectsHook, createReactionHook } from 'overmind-react'
import { IContext } from 'overmind'
import { namespaced } from 'overmind/config'
import * as analytics from './analytics'
export const config = namespaced({
  analytics,
})

export type Context = IContext<typeof config>
export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()
export const useEffects = createEffectsHook<Context>()
export const useReaction = createReactionHook<Context>()
