import { render } from '@testing-library/react'
import { ProjectDetailHeader, ProjectDetailHeaderProps } from './ProjectDetailHeader'

const DEFAULT_PROPS: ProjectDetailHeaderProps = {
  id: `S00123`,
  type: `type`,
  title: `Project Title`,
  description: `Project Description`,
  location: `France`,
}

it(`renders correctly`, () => {
  const { container } = render(
    <ProjectDetailHeader id={DEFAULT_PROPS.id} title={DEFAULT_PROPS.title} location={DEFAULT_PROPS.location} description={DEFAULT_PROPS.description} type={DEFAULT_PROPS.type} />,
  )
  expect(container).toMatchSnapshot()
})
