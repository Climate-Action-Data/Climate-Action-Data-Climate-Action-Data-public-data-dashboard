import { Context } from '@/overmind'
import { Project } from '@/@types/Project'
import { EffectResponse } from '@/@types/EffectResponse'

export const setProjectResults = (context: Context, projects: EffectResponse<Project[]>) => {
  context.state.projectResult.projectResults = projects
}
