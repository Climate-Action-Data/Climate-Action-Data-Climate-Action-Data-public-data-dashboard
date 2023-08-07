import { Context } from '@/overmind'
import { ProjectSearchResponse } from '@/@types/ProjectSearchResult'
import { EffectResponse } from '@/@types/EffectResponse'

export const setProjectResults = (context: Context, projects: EffectResponse<ProjectSearchResponse>) => {
  context.state.projectResult.projectResults = projects
}
