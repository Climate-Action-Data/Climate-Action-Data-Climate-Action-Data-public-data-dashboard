import { Context } from '@/overmind'
import { ProjectSearchResult } from '@/@types/ProjectSearchResult'

const MAX_COMPARE_PROJECTS = 3

export const setCompareToggle = (context: Context, isCompare: boolean) => {
  context.state.compareProjects.isCompare = isCompare
}

export const resetProjectsToCompare = (context: Context) => {
  context.state.compareProjects.projects = []
}

export const setProjectToCompare = (context: Context, project: ProjectSearchResult) => {
  if (context.state.compareProjects.projects.length < MAX_COMPARE_PROJECTS) {
    context.state.compareProjects.projects = [...context.state.compareProjects.projects, project]
  }
}

export const removeProjectFromCompare = (context: Context, warehouseProjectId: string) => {
  context.state.compareProjects.projects = context.state.compareProjects.projects.filter((p) => p.warehouseProjectId !== warehouseProjectId)
}
