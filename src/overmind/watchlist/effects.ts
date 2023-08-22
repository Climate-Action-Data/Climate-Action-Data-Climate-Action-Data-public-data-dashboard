import { EffectResponse } from '@/@types/EffectResponse'
import { Watchlist } from '@/@types/Watchlist'
import { watchlistData } from '@/test/mock-data/watchlist_data'

const DEFAULT_TIMEOUT = 1000

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
