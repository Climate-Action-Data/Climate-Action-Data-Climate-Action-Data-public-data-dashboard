import { render } from '@testing-library/react'
import { ProjectTypeBanner } from './ProjectTypeBanner'
import { ProjectType } from '@/@types/ProjectDetails'
import { extractProjectTypeFromString } from '@/utils/TextConverter'

describe(`getImageAndText`, () => {
  Object.values(ProjectType).forEach((type) => {
    it(`returns correct image and text for ${type}`, () => {
      const { container } = render(<ProjectTypeBanner projectType={type} projectTypeText={extractProjectTypeFromString(type)} />)
      expect(container).toMatchSnapshot()
    })
  })
})
