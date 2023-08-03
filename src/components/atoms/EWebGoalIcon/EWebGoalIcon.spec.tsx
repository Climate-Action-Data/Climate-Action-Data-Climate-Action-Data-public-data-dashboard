import { render } from '@testing-library/react'
import { EWebGoalIcon } from './EWebGoalIcon'
import { EWebGoal } from '@/@types/EWebGoal'

it(`renders correctly`, () => {
  const { container } = render(<EWebGoalIcon goal={EWebGoal.SDG1} />)
  expect(container).toMatchSnapshot()
})
