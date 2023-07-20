import { render } from '@testing-library/react'
import { CarbonReductionStandard } from './CarbonReductionStandard'

it(`renders correctly`, () => {
  const { container } = render(
    <CarbonReductionStandard
      data={[
        { name: `VCS`, average: 50 },
        { name: `GCC`, average: 50 },
      ]}
    />,
  )
  expect(container).toMatchSnapshot()
})
