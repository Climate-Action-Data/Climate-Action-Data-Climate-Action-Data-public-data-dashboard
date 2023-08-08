const DEFAULT_LENGTH = 10

export const generateRandomString = (length = DEFAULT_LENGTH): string => {
  const chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`
  let str = ``
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return str
}
