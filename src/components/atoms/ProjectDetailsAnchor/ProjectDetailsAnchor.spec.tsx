import { render } from '@testing-library/react'
import { ProjectDetailsAnchorProps, ProjectDetailsAnchor } from './ProjectDetailsAnchor'

const DEFAULT_PROPS: ProjectDetailsAnchorProps = {
  id: `issuancesRetirements`,
  title: `Project Title`,
  isSelected: false,
  onClick: () => jest.fn(),
}

it(`renders correctly`, () => {
  const { container } = render(<ProjectDetailsAnchor id={DEFAULT_PROPS.id} title={DEFAULT_PROPS.title} isSelected={DEFAULT_PROPS.isSelected} onClick={DEFAULT_PROPS.onClick} />)
  expect(container).toMatchSnapshot()
})
