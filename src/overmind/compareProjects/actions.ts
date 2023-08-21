import { Context } from '@/overmind'

export const setCompareToggle = (context: Context, isCompare: boolean) => {
  context.state.compareProjects.isCompare = isCompare
}
