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

export enum WatchListUpdateOperation {
  ADD = `ADD`,
  REMOVE = `REMOVE`,
}

export type WatchlistUpdate = {
  id: string
  name: string
  description: string
}

export type WatchlistAddProject = {
  id: string
  warehouseProjectId: string
  action: WatchListUpdateOperation.ADD
}

export type WatchlistRemoveProject = {
  id: string
  warehouseProjectId: string
  action: WatchListUpdateOperation.REMOVE
}

export type WatchlistModify = WatchlistUpdate | WatchlistAddProject | WatchlistRemoveProject
