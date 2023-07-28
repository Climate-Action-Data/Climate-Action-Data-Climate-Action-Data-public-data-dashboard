import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import { SubRegion } from '@/@types/geojson'
import { ChevronLeftIcon } from '@/components/atoms/ChevronLeftIcon/ChevronLeftIcon'

interface SubregionIndicatorProps {
  subregion: string | undefined
  clearSubregion: () => void
}

const SubregionIndicator: FC<SubregionIndicatorProps> = (props: SubregionIndicatorProps) => {
  const { subregion, clearSubregion } = props
  const { t } = useTranslation(`home`)
  return (
    <HStack>
      {subregion != SubRegion.WORLD && <IconButton variant="lightGrayRound" aria-label={``} icon={<ChevronLeftIcon />} onClick={clearSubregion} data-testid="button-region-back" />}
      <Text sx={{ maxLines: 1, wordWrap: `normal` }} fontWeight={`bold`}>
        {subregion != SubRegion.WORLD ? t(`regions.${subregion}`) : t(`regions.world`)}
      </Text>
    </HStack>
  )
}

export default SubregionIndicator
