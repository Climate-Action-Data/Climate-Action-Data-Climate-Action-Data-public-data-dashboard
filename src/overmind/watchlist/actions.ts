import { EffectResponse } from '@/@types/EffectResponse'
import { ProjectSearchSortBy } from '@/@types/ProjectSearchFilterValues'
import { ProjectSearchResponse } from '@/@types/ProjectSearchResult'
import { Watchlist } from '@/@types/Watchlist'
import { Context } from '@/overmind'

export const getAllWatchlist = async (context: Context): Promise<EffectResponse<Watchlist[]>> => {
  const authToken = context.state.authentication.authToken
  if (!authToken) {
    return { data: [] }
  } else {
    const watchlists = await context.effects.watchlist.getAllWatchlist(authToken)
    return watchlists
  }
}

export const getOneWatchlist = async (context: Context, id: string): Promise<EffectResponse<Watchlist> | undefined> => {
  const authToken = context.state.authentication.authToken
  if (!authToken) {
    return undefined
  } else {
    const watchlists = await context.effects.watchlist.getOneWatchlist(authToken, id)
    return watchlists
  }
}

export const createOneWatchlist = async (context: Context, { name, description }: { name: string; description: string }): Promise<EffectResponse<Watchlist> | undefined> => {
  const authToken = context.state.authentication.authToken
  if (!authToken) {
    return undefined
  } else {
    const watchlists = await context.effects.watchlist.createWatchlist(authToken, name, description)
    return watchlists
  }
}

export const addProjectToWatchlist = async (context: Context, { warehouseProjectId, watchlistId }: { warehouseProjectId: string; watchlistId: string }): Promise<boolean> => {
  const authToken = context.state.authentication.authToken
  if (!authToken) {
    return false
  } else {
    const watchlist = await context.effects.watchlist.addProjectToWatchlist(authToken, warehouseProjectId, watchlistId)
    return watchlist
  }
}

export const removeProjectFromWatchlist = async (context: Context, { warehouseProjectId, watchlistId }: { warehouseProjectId: string; watchlistId: string }): Promise<boolean> => {
  const authToken = context.state.authentication.authToken
  if (!authToken) {
    return false
  } else {
    const watchlist = await context.effects.watchlist.removeProjectFromWatchlist(authToken, warehouseProjectId, watchlistId)
    return watchlist
  }
}

export const renameWatchlist = async (context: Context, { id, name, description }: { id: string; name: string; description: string }): Promise<boolean> => {
  const authToken = context.state.authentication.authToken
  if (!authToken) {
    return false
  } else {
    const watchlist = await context.effects.watchlist.renameWatchlist(authToken, id, name, description)
    return watchlist
  }
}

export const deleteWatchlist = async (context: Context, id: string): Promise<boolean> => {
  const authToken = context.state.authentication.authToken
  if (!authToken) {
    return false
  } else {
    const watchlist = await context.effects.watchlist.deleteWatchlist(authToken, id)
    return watchlist
  }
}

export const getWatchlistProjects = async (context: Context, { id, from }: { id: string; from?: number }): Promise<EffectResponse<ProjectSearchResponse> | undefined> => {
  const authToken = context.state.authentication.authToken
  if (!authToken) {
    return undefined
  } else {
    const keyword = context.state.searchFilters.keywordSearch
    const sortBy = context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues.sortBy
    const sortByNoRelevance = sortBy === ProjectSearchSortBy.RELEVANCE ? ProjectSearchSortBy.NAME : sortBy
    const direction = context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues.direction
    const watchlist = await context.effects.watchlist.getWatchlistProjects(authToken, id, keyword, sortByNoRelevance, direction, from)
    return watchlist
  }
}
