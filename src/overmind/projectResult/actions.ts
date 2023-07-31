import { Context } from '@/overmind'
import { ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { EffectResponse } from '@/@types/EffectResponse'

export const setProjectResults = (context: Context, projects: EffectResponse<ProjectSearchResult[]>) => {
  context.state.projectResult.projectResults = projects
}
