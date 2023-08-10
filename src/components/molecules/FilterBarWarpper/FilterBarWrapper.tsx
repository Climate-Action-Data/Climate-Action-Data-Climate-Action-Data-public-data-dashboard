import { FC, PropsWithChildren } from 'react'
import { Container } from '@chakra-ui/react'

interface FilterBarWrapperProps {
  isResultsPage?: boolean
}

const FilterBarWrapper: FC<PropsWithChildren<FilterBarWrapperProps>> = (props) => {
  const { children, isResultsPage } = props

  return <Container variant={isResultsPage ? `resultsPageFilterAndSearchWrapper` : `homeFilterAndSearchWrapper`}>{children}</Container>
}

export default FilterBarWrapper
