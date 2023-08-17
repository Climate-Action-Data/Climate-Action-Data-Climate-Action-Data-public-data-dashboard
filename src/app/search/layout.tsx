'use client'
import { SearchHeader } from '@/components/molecules/SearchHeader/SearchHeader'
import { Flex } from '@chakra-ui/react'
import { Wrapper } from '@googlemaps/react-wrapper'

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchHeader />
      <Flex>{children}</Flex>
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ``}>
        <Flex></Flex>
      </Wrapper>
    </>
  )
}
