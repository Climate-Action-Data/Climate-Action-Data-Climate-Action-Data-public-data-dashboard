'use client'
import { SearchHeader } from '@/components/molecules/SearchHeader/SearchHeader'
import { Flex } from '@chakra-ui/react'

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchHeader />
      <Flex>{children}</Flex>
    </>
  )
}
