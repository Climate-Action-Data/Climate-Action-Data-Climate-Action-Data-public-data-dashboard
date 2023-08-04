import { render } from '@testing-library/react'
import { ProjectTypeBanner } from './ProjectTypeBanner'
import { ProjectType } from '@/@types/ProjectDetails'

describe(`getImageAndText`, () => {
  Object.values(ProjectType).forEach((type) => {
    it(`returns correct image and text for ${type}`, () => {
      const { container } = render(<ProjectTypeBanner projectType={type} />)
      expect(container).toMatchSnapshot()
    })
  })
})
