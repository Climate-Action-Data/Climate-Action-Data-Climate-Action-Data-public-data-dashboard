import { render } from '@testing-library/react'
import { CarbonReductionStandard } from './CarbonReductionStandard'

it(`renders correctly`, () => {
  const { container } = render(
    <CarbonReductionStandard
      data={[
        { name: `test`, average: 50 },
        { name: `plop`, average: 50 },
      ]}
    />,
  )
  expect(container).toMatchSnapshot()
})
