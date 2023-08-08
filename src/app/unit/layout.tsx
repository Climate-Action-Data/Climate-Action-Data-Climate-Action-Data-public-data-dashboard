'use client'
import { Box } from '@chakra-ui/react'

export default function UnitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box padding="12px 24px">{children}</Box>
    </>
  )
}
