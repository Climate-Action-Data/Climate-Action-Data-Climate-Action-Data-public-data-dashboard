import axios from 'axios'
import { EffectResponse } from '@/@types/EffectResponse'
import { WatchListUpdateOperation, Watchlist, WatchlistAddProject, WatchlistModify, WatchlistRemoveProject, WatchlistUpdate } from '@/@types/Watchlist'
import { defaultDomain, defaultHeaders } from '@/utils/RequestHelpers'

const DEFAULT_TIMEOUT = 500
const DEFAULT_WATCHLIST_ENDPOINT = `${defaultDomain}/v1/watchlists`

export const getAllWatchlist = async (): Promise<EffectResponse<Watchlist[]>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<Watchlist[]>
    axios
      .get(DEFAULT_WATCHLIST_ENDPOINT, defaultHeaders)
      .then((body) => {
        if (body.data) {
          result = { data: body.data as Watchlist[] }
        } else {
          result = { error: { code: body.status.toString(), message: body.statusText } }
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

export const getOneWatchlist = async (id: string): Promise<EffectResponse<Watchlist>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<Watchlist>
    axios
      .get(`${DEFAULT_WATCHLIST_ENDPOINT}/${id}`, defaultHeaders)
      .then((body) => {
        if (body.data) {
          result = { data: body.data as Watchlist }
        } else {
          result = { error: { code: body.status.toString(), message: body.statusText } }
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

export const deleteWatchlist = async (id: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, DEFAULT_TIMEOUT))
  return true
}

export const renameWatchlist = async (id: string, name: string, description: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const bodyData: WatchlistUpdate = {
      id,
      name,
      description,
    }
    updateWatchlist(bodyData).then((result) => {
      if (result.error) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

export const addProjectToWatchlist = async (warehouseProjectId: string, watchlistId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const bodyData: WatchlistAddProject = {
      warehouseProjectId,
      id: watchlistId,
      action: WatchListUpdateOperation.ADD,
    }
    updateWatchlist(bodyData).then((result) => {
      if (result.error) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

export const removeProjectFromWatchlist = async (warehouseProjectId: string, watchlistId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const bodyData: WatchlistRemoveProject = {
      warehouseProjectId,
      id: watchlistId,
      action: WatchListUpdateOperation.REMOVE,
    }
    updateWatchlist(bodyData).then((result) => {
      if (result.error) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

export const createWatchlist = async (name: string, description: string): Promise<EffectResponse<Watchlist>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<Watchlist>
    axios
      .post(DEFAULT_WATCHLIST_ENDPOINT, { name, description }, defaultHeaders)
      .then((body) => {
        if (body.data) {
          result = { data: body.data as Watchlist }
        } else {
          result = { error: { code: body.status.toString(), message: body.statusText } }
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

export const updateWatchlist = async (body: WatchlistModify): Promise<EffectResponse<Watchlist>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<Watchlist>
    axios
      .put(DEFAULT_WATCHLIST_ENDPOINT, body, defaultHeaders)
      .then((body) => {
        if (body.data) {
          result = { data: body.data as Watchlist }
        } else {
          result = { error: { code: body.status.toString(), message: body.statusText } }
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
