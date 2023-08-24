import { EffectResponse } from '@/@types/EffectResponse'
import { ProjectSearchSortBy } from '@/@types/ProjectSearchFilterValues'
import { ProjectSearchResponse } from '@/@types/ProjectSearchResult'
import { Watchlist } from '@/@types/Watchlist'
import { Context } from '@/overmind'

export const getAllWatchlist = (context: Context): Promise<EffectResponse<Watchlist[]>> => {
  return new Promise(async (resolve) => {
    const authToken = context.state.authentication.authToken
    console.log(context.state.authentication)
    if (!authToken) {
      resolve({ data: [] })
    } else {
      const watchlists = await context.effects.watchlist.getAllWatchlist(authToken)
      resolve(watchlists)
    }
  })
}

export const getOneWatchlist = async (context: Context, id: string): Promise<EffectResponse<Watchlist>> => {
  return new Promise(async (resolve, reject) => {
    const authToken = context.state.authentication.authToken
    if (!authToken) {
      reject(undefined)
    } else {
      const watchlists = await context.effects.watchlist.getOneWatchlist(authToken, id)
      resolve(watchlists)
    }
  })
}

export const createOneWatchlist = async (context: Context, { name, description }: { name: string; description: string }): Promise<EffectResponse<Watchlist>> => {
  return new Promise(async (resolve, reject) => {
    const authToken = context.state.authentication.authToken
    if (!authToken) {
      reject(undefined)
    } else {
      const watchlists = await context.effects.watchlist.createWatchlist(authToken, name, description)
      resolve(watchlists)
    }
  })
}

export const addProjectToWatchlist = async (context: Context, { warehouseProjectId, watchlistId }: { warehouseProjectId: string; watchlistId: string }): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const authToken = context.state.authentication.authToken
    if (!authToken) {
      reject(undefined)
    } else {
      const watchlist = await context.effects.watchlist.addProjectToWatchlist(authToken, warehouseProjectId, watchlistId)
      resolve(watchlist)
    }
  })
}

export const removeProjectFromWatchlist = async (context: Context, { warehouseProjectId, watchlistId }: { warehouseProjectId: string; watchlistId: string }): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const authToken = context.state.authentication.authToken
    if (!authToken) {
      reject(undefined)
    } else {
      const watchlist = await context.effects.watchlist.removeProjectFromWatchlist(authToken, warehouseProjectId, watchlistId)
      resolve(watchlist)
    }
  })
}

export const renameWatchlist = async (context: Context, { id, name, description }: { id: string; name: string; description: string }): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const authToken = context.state.authentication.authToken
    if (!authToken) {
      reject(undefined)
    } else {
      const watchlist = await context.effects.watchlist.renameWatchlist(authToken, id, name, description)
      resolve(watchlist)
    }
  })
}

export const deleteWatchlist = async (context: Context, id: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const authToken = context.state.authentication.authToken
    if (!authToken) {
      reject(undefined)
    } else {
      const watchlist = await context.effects.watchlist.deleteWatchlist(authToken, id)
      resolve(watchlist)
    }
  })
}

export const getWatchlistProjects = async (context: Context, { id, from }: { id: string; from?: number }): Promise<EffectResponse<ProjectSearchResponse>> => {
  return new Promise(async (resolve, reject) => {
    const authToken = context.state.authentication.authToken
    if (!authToken) {
      reject(undefined)
    } else {
      const keyword = context.state.searchFilters.keywordSearch
      const sortBy = context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues.sortBy
      const sortByNoRelevance = sortBy === ProjectSearchSortBy.RELEVANCE ? ProjectSearchSortBy.NAME : sortBy
      const direction = context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues.direction
      const watchlist = await context.effects.watchlist.getWatchlistProjects(authToken, id, keyword, sortByNoRelevance, direction, from)
      resolve(watchlist)
    }
  })
}
