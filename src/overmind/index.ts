import { IContext } from 'overmind'
import { createActionsHook, createEffectsHook, createReactionHook, createStateHook } from 'overmind-react'
import { namespaced } from 'overmind/config'

import * as analytics from './analytics'
import * as creditsHistory from './creditsHistory'

export const config = namespaced({
  analytics,
  creditsHistory,
})

export type Context = IContext<typeof config>
export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()
export const useEffects = createEffectsHook<Context>()
export const useReaction = createReactionHook<Context>()
