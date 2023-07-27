import { Tr, Td, Skeleton } from '@chakra-ui/react'

export const ProjectSearchBodySkeleton = () => {
  return (
    <Tr height="92px">
      <Td>
        <Skeleton height="20px" />
      </Td>
      <Td>
        <Skeleton height="20px" />
      </Td>
      <Td>
        <Skeleton height="20px" />
      </Td>
      <Td>
        <Skeleton height="20px" />
      </Td>
      <Td>
        <Skeleton height="20px" />
      </Td>
      <Td>
        <Skeleton height="20px" />
      </Td>
      <Td isNumeric>
        <Skeleton height="20px" />
      </Td>
      <Td isNumeric>
        <Skeleton height="20px" />
      </Td>
      <Td isNumeric>
        <Skeleton height="20px" />
      </Td>
      <Td isNumeric>
        <Skeleton height="20px" />
      </Td>
    </Tr>
  )
}
