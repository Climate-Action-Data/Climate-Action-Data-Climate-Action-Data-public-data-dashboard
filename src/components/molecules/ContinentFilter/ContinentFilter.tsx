import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import { Open_Sans } from 'next/font/google'
import { ChevronLeftIcon } from '@chakra-ui/icons'

const openSans = Open_Sans({
  // eslint-disable-next-line @typescript-eslint/quotes
  subsets: ['latin'],
  // eslint-disable-next-line @typescript-eslint/quotes
  display: 'swap',
  // eslint-disable-next-line @typescript-eslint/quotes
  weight: '600',
})

interface ContinentFilterProps {
  region: string | undefined
  clearRegion: () => void
}

const ContinentFilter: FC<ContinentFilterProps> = ({ region, clearRegion }) => {
  const { t } = useTranslation(`home`)
  return (
    <HStack>
      {region && (
        <IconButton
          icon={<ChevronLeftIcon boxSize={6} />}
          onClick={clearRegion}
          aria-label={`clear continent filter`}
          sx={{ backgroundColor: `transparent`, borderRadius: `50%` }}
          size={`xs`}
          padding={0}
        />
      )}
      <Text {...openSans} sx={{ maxLines: 1, wordWrap: `normal` }}>
        {region ? t(`regions.${region}`) : `Region`}
      </Text>
    </HStack>
  )
}

export default ContinentFilter
