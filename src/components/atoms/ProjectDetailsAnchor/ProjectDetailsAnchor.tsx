import { HStack, Link, Text } from '@chakra-ui/react'
import { EllipseIcon } from '@/components/atoms/EllipseIcon/EllipseIcon'

interface ProjectDetailHeaderProps {
  id: string
  title: string
  isSelected?: boolean
  onClick: () => void
}

export const ProjectDetailsAnchor = (props: ProjectDetailHeaderProps) => {
  const { id, title, isSelected, onClick } = props
  return (
    <HStack padding={`8px`}>
      <EllipseIcon color={isSelected ? `black` : `white`} />
      <Link href={`#${id}`} textDecoration={`none`} onClick={onClick}>
        <Text fontSize="lg" color={isSelected ? `lightGray.main` : `lightGray.700`}>
          {title}
        </Text>
      </Link>
    </HStack>
  )
}
