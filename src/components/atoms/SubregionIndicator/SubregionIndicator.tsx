import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import { Open_Sans } from 'next/font/google'
import { ChevronLeftIcon } from '@chakra-ui/icons'

/* eslint-disable @typescript-eslint/quotes */
const openSans = Open_Sans({
  subsets: ['latin'],
  // eslint-disable-next-line @typescript-eslint/quotes
  display: 'swap',
  // eslint-disable-next-line @typescript-eslint/quotes
  weight: '600',
})

/* eslint-enable @typescript-eslint/quotes */

interface SubregionIndicatorProps {
  subregion: string | undefined
  clearSubregion: () => void
}

const SubregionIndicator: FC<SubregionIndicatorProps> = ({ subregion, clearSubregion }) => {
  const { t } = useTranslation(`home`)
  return (
    <HStack>
      {subregion && <IconButton icon={<ChevronLeftIcon boxSize={6} />} onClick={clearSubregion} aria-label={`clear continent filter`} variant={`lightGrayRound`} size={`xs`} />}
      <Text {...openSans} sx={{ maxLines: 1, wordWrap: `normal` }}>
        {subregion ? t(`regions.${subregion}`) : `Region`}
      </Text>
    </HStack>
  )
}

export default SubregionIndicator
