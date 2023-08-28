import { render } from '@testing-library/react'
import { ProjectDetailHeader, ProjectDetailHeaderProps } from './ProjectDetailHeader'

const DEFAULT_PROPS: ProjectDetailHeaderProps = {
  topTitle: `S00123`,
  type: `type`,
  mainTitle: `Project Title`,
  description: `Project Description`,
  subTitle: `France`,
  isExpanded: true,
}

it(`renders correctly`, () => {
  const { container } = render(
    <ProjectDetailHeader
      topTitle={DEFAULT_PROPS.topTitle}
      mainTitle={DEFAULT_PROPS.mainTitle}
      subTitle={DEFAULT_PROPS.subTitle}
      description={DEFAULT_PROPS.description}
      type={DEFAULT_PROPS.type}
      isExpanded={DEFAULT_PROPS.isExpanded}
    />,
  )
  expect(container).toMatchSnapshot()
})
