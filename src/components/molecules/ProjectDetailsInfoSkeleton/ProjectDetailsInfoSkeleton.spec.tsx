import { render } from '@testing-library/react'
import { ProjectDetailsInfoSkeleton } from './ProjectDetailsInfoSkeleton'

it(`renders correctly with no project`, () => {
  const { container } = render(<ProjectDetailsInfoSkeleton />)
  expect(container).toMatchSnapshot()
})
