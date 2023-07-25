'use client'
import { SearchHeader } from '@/components/molecules/SearchHeader/SearchHeader'
import { Flex } from '@chakra-ui/react'

export default function SearchLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SearchHeader />
      <Flex>{children}</Flex>
    </>
  )
}
