export type Watchlist = {
  id: string
  name: string
  description: string
  projectsCount: number
  createdAt: string
}

export enum WatchlistSorting {
  RECENTLY_ADDED = `recentlyAdded`,
  ALPHABETICAL = `alphabetical`,
  NUMBER_OF_PROJECTS = `numberOfProjects`,
}
