/* eslint-disable no-magic-numbers */
import React from 'react'
import { Box, Button } from '@chakra-ui/react'

interface GeneratePageProps {
  currentPage: number
  totalPages: number
  onPageClick: (page: number) => void
}

const DEFAULT_PAGES_TO_SHOW = 4

export const GeneratePage = (props: GeneratePageProps) => {
  const { currentPage, totalPages, onPageClick } = props
  const renderPageNumbers = () => {
    const pageNumbers: React.JSX.Element[] = []

    // We should display all the pages if there are 4 or fewer pages
    if (totalPages <= DEFAULT_PAGES_TO_SHOW) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Button variant="lightGrayRound32" key={i} fontWeight={currentPage === i ? `bold` : `500`} mx={1} onClick={() => onPageClick(i)}>
            {i}
          </Button>,
        )
      }
    } else {
      // Display ellipsis if there are more than 4 pages and current page is not close to the start
      if (currentPage > 2) {
        pageNumbers.push(
          <Button key={1} variant="lightGrayRound32" mx={1} onClick={() => onPageClick(1)}>
            1
          </Button>,
        )
        if (currentPage > 3) {
          pageNumbers.push(
            <Box flex={1} key="ellipsis1">
              ...
            </Box>,
          )
        }
      }

      // Display current page and nearby pages
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 0 && i <= totalPages) {
          pageNumbers.push(
            <Button key={i} fontWeight={currentPage === i ? `bold` : `500`} variant="lightGrayRound32" mx={1} onClick={() => onPageClick(i)}>
              {i}
            </Button>,
          )
        }
      }

      // Display ellipsis if there are more than 4 pages and current page is not close to the end
      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          pageNumbers.push(
            <Box data-testid="ellipsis" flex={1} key="ellipsis2">
              ...
            </Box>,
          )
        }
        pageNumbers.push(
          <Button data-testid="pagination-last-page" key={totalPages} variant="lightGrayRound32" mx={1} onClick={() => onPageClick(totalPages)}>
            {totalPages}
          </Button>,
        )
      }
    }

    return pageNumbers
  }

  return <React.Fragment>{renderPageNumbers()}</React.Fragment>
}
