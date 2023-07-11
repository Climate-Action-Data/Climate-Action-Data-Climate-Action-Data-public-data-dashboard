// Import overmind stuff
import {
    createStateHook,
    createActionsHook,
    createEffectsHook,
    createReactionHook
} from 'overmind-react'
import { IContext } from 'overmind'
import { namespaced } from 'overmind/config';
// Import our namespaces
import analytics from './analytics';
// Add namespaces to config
export const config = namespaced({
    analytics,
});

export type Context = IContext<typeof config>
// Exporting all needed hooks
export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()
export const useEffects = createEffectsHook<Context>()
export const useReaction = createReactionHook<Context>()