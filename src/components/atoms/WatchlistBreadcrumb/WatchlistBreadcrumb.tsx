import { Flex, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs'

export interface WatchlistBreadcrumbProps {
  id?: string
  title?: string
}

export const WatchlistBreadcrumb = (props: WatchlistBreadcrumbProps) => {
  const { id, title } = props

  const { t } = useTranslation(`watchlist`)

  const generateItems = () => {
    const items = [{ title: t(`watchlistsBreadCrumb`), link: `/watchlist/all` }]
    if (id && title) {
      items.push({ title: `${title}`, link: `/watchlist/view?id=${id}` })
    }
    return items
  }
  return (
    <Flex id="headerReference" flexDirection="column" position="sticky" top="56px" minH="48px" px="24px" pt="16px" pb="16px" zIndex="docked" backgroundColor="white" width="100%">
      <VStack alignItems="start" flex={1}>
        <BreadCrumbs items={generateItems()} color="lightGray.700" />
      </VStack>
    </Flex>
  )
}
