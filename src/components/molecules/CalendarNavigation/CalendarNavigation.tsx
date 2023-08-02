import { FC } from 'react'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@/components/atoms/ChevronLeftIcon/ChevronLeftIcon'
import { ChevronRightIcon } from '@/components/atoms/ChevronRightIcon/ChevronRightIcon'

interface CalendarNavigationProps {
  navigateToPrev: () => void
  navigateToNext: () => void
  label: string
}

const CalendarNavigation: FC<CalendarNavigationProps> = (props) => {
  const { navigateToPrev, navigateToNext, label } = props
  return (
    <HStack alignItems={`center`} gap={`10px`}>
      <IconButton onClick={navigateToPrev} aria-label={`before ${label}`} icon={<ChevronLeftIcon />} variant={`calendarNavigation`} />
      <Text fontSize={`14px`}>{label}</Text>
      <IconButton onClick={navigateToNext} aria-label={`after ${label}`} icon={<ChevronRightIcon />} variant={`calendarNavigation`} />
    </HStack>
  )
}

export default CalendarNavigation
