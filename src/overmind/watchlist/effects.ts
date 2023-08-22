import axios from 'axios'
import { EffectResponse } from '@/@types/EffectResponse'
import { Watchlist } from '@/@types/Watchlist'
import { watchlistData } from '@/test/mock-data/watchlist_data'
import { defaultDomain, defaultHeaders } from '@/utils/RequestHelpers'

const DEFAULT_TIMEOUT = 500

export const getAllWatchlist = async (): Promise<EffectResponse<Watchlist[]>> => {
  await new Promise((resolve) => setTimeout(resolve, DEFAULT_TIMEOUT))
  return { data: watchlistData }
  //   return new Promise((resolve) => {
  //     // let result: EffectResponse<Watchlist[]>
  //     // axios
  //     //   .get(`${defaultDomain}/v1/units/search`, defaultHeaders)
  //     //   .then((body) => {
  //     //     if (body.data) {
  //     //       result = { data: body.data as Watchlist[] }
  //     //     } else {
  //     //       result = { error: { code: body.status.toString(), message: body.statusText } }
  //     //     }
  //     //   })
  //     //   .catch(() => {
  //     //     result = { error: { code: `400`, message: `could not fetch data` } }
  //     //   })
  //     //   .finally(() => {
  //     //     resolve(result)
  //     //   })
  //   })
}

export const getOneWatchlist = async (id: string): Promise<EffectResponse<Watchlist>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<Watchlist>
    axios
      .get(`${defaultDomain}/v1/watchlists/${id}`, defaultHeaders)
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
  await new Promise((resolve) => setTimeout(resolve, DEFAULT_TIMEOUT))
  return true
}
