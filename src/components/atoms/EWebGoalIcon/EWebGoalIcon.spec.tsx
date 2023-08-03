import { render } from '@testing-library/react'
import { EWebGoalIcon } from './EWebGoalIcon'
import { EWebGoal } from '@/@types/EWebGoal'

describe(`getImageAndText`, () => {
  Object.values(EWebGoal).forEach((goal) => {
    it(`returns correct image and text for ${goal}`, () => {
      const { container } = render(<EWebGoalIcon goal={goal} />)
      expect(container).toMatchSnapshot()
    })
  })
})
