import { EWebGoal } from '@/@types/EWebGoal'

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
