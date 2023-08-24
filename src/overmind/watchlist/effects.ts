import axios from 'axios'
import { EffectResponse } from '@/@types/EffectResponse'
import { WatchListUpdateOperation, Watchlist, WatchlistAddProject, WatchlistModify, WatchlistRemoveProject, WatchlistUpdate } from '@/@types/Watchlist'
import { defaultDomain, authedHeaders } from '@/utils/RequestHelpers'
import { DEFAULT_PROJECT_COUNT_TO_DISPLAY, ProjectSearchResponse } from '@/@types/ProjectSearchResult'
import { DatabaseQueryDirection, ProjectSearchSortBy } from '@/@types/ProjectSearchFilterValues'

const DEFAULT_WATCHLIST_ENDPOINT = `${defaultDomain}/v1/watchlists`

export const getAllWatchlist = async (authToken: string): Promise<EffectResponse<Watchlist[]>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<Watchlist[]>
    axios
      .get(`${DEFAULT_WATCHLIST_ENDPOINT}/all`, authedHeaders(authToken))
      .then((body) => {
        if (body.data) {
          result = { data: body.data as Watchlist[] }
        } else {
          result = { error: { code: body.status.toString(), message: `could not fetch data` } }
        }
      })
      .catch(() => {
        result = { error: { code: `400`, message: `could not fetch data` } }
      })
      .finally(() => {
        resolve(result)
      })
  })
}

export const getOneWatchlist = async (authToken: string, id: string): Promise<EffectResponse<Watchlist>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<Watchlist>
    axios
      .get(`${DEFAULT_WATCHLIST_ENDPOINT}/${id}`, authedHeaders(authToken))
      .then((body) => {
        if (body.data) {
          result = { data: body.data as Watchlist }
        } else {
          result = { error: { code: body.status.toString(), message: body?.statusText ?? `` } }
        }
      })
      .catch(() => {
        result = { error: { code: `400`, message: `could not fetch data` } }
      })
      .finally(() => {
        resolve(result)
      })
  })
}

export const deleteWatchlist = async (authToken: string, id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    axios
      .delete(`${DEFAULT_WATCHLIST_ENDPOINT}/${id}`, authedHeaders(authToken))
      .then((body) => {
        if (body.data) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(() => {
        resolve(false)
      })
  })
}

export const renameWatchlist = async (authToken: string, id: string, name: string, description: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const bodyData: WatchlistUpdate = {
      id,
      name,
      description,
    }
    updateWatchlist(authToken, bodyData).then((result) => {
      if (result.error) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

export const addProjectToWatchlist = async (authToken: string, warehouseProjectId: string, watchlistId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const bodyData: WatchlistAddProject = {
      warehouseProjectId,
      id: watchlistId,
      action: WatchListUpdateOperation.ADD,
    }
    updateWatchlist(authToken, bodyData).then((result) => {
      if (result.error) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

export const removeProjectFromWatchlist = async (authToken: string, warehouseProjectId: string, watchlistId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const bodyData: WatchlistRemoveProject = {
      warehouseProjectId,
      id: watchlistId,
      action: WatchListUpdateOperation.REMOVE,
    }
    updateWatchlist(authToken, bodyData).then((result) => {
      if (result.error) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

export const createWatchlist = async (authToken: string, name: string, description: string): Promise<EffectResponse<Watchlist>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<Watchlist>
    axios
      .post(DEFAULT_WATCHLIST_ENDPOINT, { name, description }, authedHeaders(authToken))
      .then((body) => {
        if (body.data) {
          result = { data: body.data as Watchlist }
        } else {
          result = { error: { code: body.status.toString(), message: body?.statusText ?? `` } }
        }
      })
      .catch(() => {
        result = { error: { code: `400`, message: `could not fetch data` } }
      })
      .finally(() => {
        resolve(result)
      })
  })
}

export const updateWatchlist = async (authToken: string, body: WatchlistModify): Promise<EffectResponse<Watchlist>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<Watchlist>
    axios
      .put(DEFAULT_WATCHLIST_ENDPOINT, body, authedHeaders(authToken))
      .then((body) => {
        if (body.data) {
          result = { data: body.data as Watchlist }
        } else {
          result = { error: { code: body.status.toString(), message: body?.statusText ?? `` } }
        }
      })
      .catch(() => {
        result = { error: { code: `400`, message: `could not fetch data` } }
      })
      .finally(() => {
        resolve(result)
      })
  })
}

export const getWatchlistProjects = async (
  authToken: string,
  id: string,
  keywords: string,
  sortBy: ProjectSearchSortBy,
  direction: DatabaseQueryDirection,
  offset = 0,
  count = DEFAULT_PROJECT_COUNT_TO_DISPLAY,
): Promise<EffectResponse<ProjectSearchResponse>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<ProjectSearchResponse>
    axios
      .post(
        `${DEFAULT_WATCHLIST_ENDPOINT}/${id}`,
        {
          keywords,
          offset,
          count,
          sortBy: sortBy,
          direction: direction,
        },
        authedHeaders(authToken),
      )
      .then((body) => {
        if (body.data) {
          result = { data: body.data as ProjectSearchResponse }
        } else {
          result = { error: { code: body.status.toString(), message: body?.statusText ?? `` } }
        }
      })
      .catch(() => {
        result = { error: { code: `400`, message: `could not fetch data` } }
      })
      .finally(() => {
        resolve(result)
      })
  })
}
