'use client'
// import { Watchlist } from '@/@types/Watchlist'
// import { useEffects } from '@/overmind'
import { NextPage } from 'next'
import { useEffect } from 'react'
// import { useTranslation } from 'react-i18next'

const WatchlistPage: NextPage = () => {
  //   const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  //   const { t } = useTranslation(`unitDetails`)
  //   const { t: tHome } = useTranslation(`home`)
  //   const { getWatchlists } = useEffects().watchlist

  useEffect(() => {
    // getWatchlists().then((result) => {
    //   if (result.data) {
    //     setIssuance(result.data)
    //   }
    // })
  }, [])

  return <></>
}

export default WatchlistPage
