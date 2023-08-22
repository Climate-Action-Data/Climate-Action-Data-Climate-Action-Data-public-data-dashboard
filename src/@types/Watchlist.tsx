export type Watchlist = {
  name: string
  description: string
  id: string
  projects: number
  createdAt: string
}
export enum WatchlistSorting {
  RECENTLY_ADDED = `recentlyAdded`,
  ALPHABETICAL = `alphabetical`,
  NUMBER_OF_PROJECTS = `numberOfProjects`,
}
