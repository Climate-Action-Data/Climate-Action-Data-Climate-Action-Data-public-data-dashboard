import { render } from '@testing-library/react'
import { ProjectSearchBodyHeader } from './ProjectSearchBodyHeader'

it(`renders correctly`, () => {
  const { container } = render(<ProjectSearchBodyHeader />)
  expect(container).toMatchSnapshot()
})
