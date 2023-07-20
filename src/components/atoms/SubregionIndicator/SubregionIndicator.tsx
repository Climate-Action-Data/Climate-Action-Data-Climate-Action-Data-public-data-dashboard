import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, HStack, Text } from '@chakra-ui/react'
import { Open_Sans } from 'next/font/google'
import { SubRegion } from '@/@types/geojson'

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
      {subregion != SubRegion.WORLD && (
        <Button variant="lightGrayRound" marginRight={4} data-testid="button-region-back" onClick={clearSubregion}>
          &lt;
        </Button>
      )}
      <Text {...openSans} sx={{ maxLines: 1, wordWrap: `normal` }}>
        {subregion != SubRegion.WORLD ? t(`regions.${subregion}`) : t(`regions.world`)}
      </Text>
    </HStack>
  )
}

export default SubregionIndicator
