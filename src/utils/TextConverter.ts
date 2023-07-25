export const extractTitleFromUrl = (url: string) => {
  let str = ``
  try {
    str = capitalizeString(url.slice(url.lastIndexOf(`/`) + 1, url.length))
  } catch (error) {}
  return str
}

export const capitalizeString = (str: string) => {
  try {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  } catch (error) {
    return str
  }
}
