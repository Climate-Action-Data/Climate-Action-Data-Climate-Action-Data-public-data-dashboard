import { IContext } from 'overmind'
import { createActionsHook, createEffectsHook, createReactionHook, createStateHook } from 'overmind-react'
import { namespaced } from 'overmind/config'

import * as analytics from './analytics'
import * as creditsHistory from './creditsHistory'
import * as projectResult from './projectResult'
import * as searchFilters from './searchFilters'
import * as unitResult from './unitResult'
import * as exports from './exports'

export const config = namespaced({
  analytics,
  creditsHistory,
  projectResult,
  searchFilters,
  unitResult,
  exports,
})

export type Context = IContext<typeof config>
export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()
export const useEffects = createEffectsHook<Context>()
export const useReaction = createReactionHook<Context>()
