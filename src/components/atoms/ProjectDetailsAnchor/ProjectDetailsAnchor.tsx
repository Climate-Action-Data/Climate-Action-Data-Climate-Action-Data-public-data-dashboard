import { HStack, Link, Text } from '@chakra-ui/react'
import { EllipseIcon } from '@/components/atoms/EllipseIcon/EllipseIcon'

export interface ProjectDetailsAnchorProps {
  id: string
  title: string
  isSelected?: boolean
  onClick: () => void
}

export const ProjectDetailsAnchor = (props: ProjectDetailsAnchorProps) => {
  const { id, title, isSelected, onClick } = props
  return (
    <HStack padding={`8px`} flexShrink="0">
      <EllipseIcon color={isSelected ? `black` : `white`} />
      <Link href={`#${id}`} textDecoration={`none`} onClick={onClick}>
        <Text fontSize="lg" fontWeight={isSelected ? `500` : `400`} color={isSelected ? `lightGray.main` : `lightGray.700`}>
          {title}
        </Text>
      </Link>
    </HStack>
  )
}
