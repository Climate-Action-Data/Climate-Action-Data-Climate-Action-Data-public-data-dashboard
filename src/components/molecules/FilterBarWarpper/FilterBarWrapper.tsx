import { FC, PropsWithChildren } from 'react'
import { Box } from '@chakra-ui/react'

const FilterBarWrapper: FC<PropsWithChildren> = (props) => {
  const { children } = props
  return (
    <Box
      sx={{
        color: `black`,
        boxShadow: `2px 2px 8px 0px #0000001A;`,
        minHeight: `min-content`,
        borderRadius: `12px`,
        background: `#FFFFFF`,
        padding: `16px`,
        marginX: `auto`,
        w: [`100%`, null, null, `min-content`],
      }}
    >
      {children}
    </Box>
  )
}

export default FilterBarWrapper
