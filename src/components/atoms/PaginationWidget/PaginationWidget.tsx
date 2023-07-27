/* eslint-disable no-magic-numbers */
import { Flex, Box, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { GeneratePage } from '../GeneratePage/GeneratePage'

interface PaginationWidgetProps {
  totalResults: number
  resultPerPage: number
  onPageChange?: (currentPage: number, from: number) => void
}

export const PaginationWidget = (props: PaginationWidgetProps) => {
  const { totalResults, resultPerPage, onPageChange } = props
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Calculate the range for displaying results
  const totalPages = Math.ceil(totalResults / resultPerPage)
  const startResult = (currentPage - 1) * resultPerPage + 1
  const endResult = Math.min(currentPage * resultPerPage, totalResults)

  const changePage = (page: number) => {
    setCurrentPage(page)
    if (onPageChange) {
      onPageChange(page, (page - 1) * resultPerPage + 1)
    }
  }

  return (
    <Flex gap="16px" alignItems="center">
      <Box lineHeight="16px" fontSize="sm" color="lightGray.500">
        {startResult} - {endResult} of {totalResults}
      </Box>
      <Flex width="240px" alignItems="center" textAlign="center">
        <Button data-testid="pagination-page-down" variant="lightGrayRound32" flex={1} onClick={() => changePage(currentPage > 1 ? currentPage - 1 : 1)}>
          &lt;
        </Button>
        <GeneratePage data-testid="pagination-test" currentPage={currentPage} totalPages={totalPages} onPageClick={(page: number) => changePage(page)} />
        <Button data-testid="pagination-page-up" variant="lightGrayRound32" flex={1} onClick={() => changePage(currentPage < totalPages ? currentPage + 1 : totalPages)}>
          &gt;
        </Button>
      </Flex>
    </Flex>
  )
}
