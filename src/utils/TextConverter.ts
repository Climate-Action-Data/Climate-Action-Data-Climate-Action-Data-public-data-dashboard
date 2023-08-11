import { EWebGoal } from '@/@types/EWebGoal'
import { ProjectType } from '@/@types/ProjectDetails'

export const extractPageFromUrl = (url: string) => {
  return url.slice(url.lastIndexOf(`/`) + 1, url.length)
}

export const extractTitleFromUrl = (url: string) => {
  let str = ``
  try {
    str = capitalizeString(url.slice(url.lastIndexOf(`/`) + 1, url.length))
  } catch (error) {}
  return str
}

export const capitalizeString = (str: string) => {
  if (str.length > 1) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  } else {
    return str.toUpperCase()
  }
}

export const extractEWebGoalFromString = (str: string): EWebGoal | undefined => {
  const goalValue = str.slice(0, str.indexOf(`-`)).trim().replace(` `, ``)
  return Object.values(EWebGoal).find((goal) => goal === goalValue) as EWebGoal
}

export const sanitizeString = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]/g, ``).toLowerCase()
}

export const extractProjectTypeFromString = (str: string | undefined) => {
  if (!str) {
    return ProjectType.DEFAULT
  }
  const foundType = Object.values(ProjectType).find((type) => type === sanitizeString(str))
  if (foundType) {
    return foundType as ProjectType
  }
  return ProjectType.DEFAULT
}

export const extractTagItemsFromTag = (tags: string | undefined) => {
  if (!tags) {
    return []
  }
  const tagItems = tags
    .split(`||`)
    .map((tag) => tag.trim())
    .filter(Boolean)
  return Array.from(new Set(tagItems))
}
