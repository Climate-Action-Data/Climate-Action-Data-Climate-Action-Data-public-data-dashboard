import { render } from '@testing-library/react'
import { Tbody, Table } from '@chakra-ui/react'

import { ProjectSearchBodySkeleton } from './ProjectSearchBodySkeleton'

it(`renders correctly`, () => {
  const { container } = render(
    <Table>
      <Tbody>
        <ProjectSearchBodySkeleton />
      </Tbody>
    </Table>,
  )
  expect(container).toMatchSnapshot()
})
