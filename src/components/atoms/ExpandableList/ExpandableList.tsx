import { generateRandomString } from '@/utils/GenerationHelpers'
import { Box, Button, Hide, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ExpandableListProps {
  items: string[]
  itemLimit?: number
}

const DEFAULT_ITEM_LIMIT = 4

export const ExpandableList = (props: ExpandableListProps) => {
  const actualProps = {
    ...props,
    itemLimit: props?.itemLimit ?? DEFAULT_ITEM_LIMIT,
  }
  const { items, itemLimit } = actualProps
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)

  if (items.length === 0) {
    return <Text>{tHome(`noData`)}</Text>
  }

  const elementToRender = isExpanded ? items.length : itemLimit

  const renderItemList = () => {
    return items
      .map((item, index) => {
        return <Text key={`expandable-${generateRandomString()}`}>{item ?? tHome(`noData`)}</Text>
      })
      .slice(0, elementToRender)
  }

  const handleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Box>
      {renderItemList()}
      {items.length > itemLimit && (
        <Hide below="md">
          <Button data-testid="verification-expand" onClick={handleExpand} variant="underlinedLink" style={{ color: `#00242C`, fontWeight: 500 }}>
            {isExpanded ? t(`viewLess`) : t(`viewMore`)}
          </Button>
        </Hide>
      )}
    </Box>
  )
}
