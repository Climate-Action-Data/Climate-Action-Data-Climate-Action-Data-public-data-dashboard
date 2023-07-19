import { render } from '@testing-library/react'
import { CarbonReductionSector } from './CarbonReductionSector'

it(`renders correctly`, () => {
  const { container } = render(
    <CarbonReductionSector
      colorChart={[`green.600`, `green.700`, `green.800`, `green.900`]}
      data={[
        { name: `Renewable Energy`, average: 40 },
        { name: `Waste Disposal`, average: 24 },
        { name: `Energy Efficiency`, average: 19 },
        { name: `Others`, average: 17 },
      ]}
    />,
  )
  expect(container).toMatchSnapshot()
})
