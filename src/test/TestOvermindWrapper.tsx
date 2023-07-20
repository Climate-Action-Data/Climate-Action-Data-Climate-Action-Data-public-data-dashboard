import { createOvermindMock } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from '@/overmind'
import { PropsWithChildren } from 'react'
import { SubRegion } from '@/@types/geojson'
import { TimeframesData } from '@/@types/Timeframe'
import { DataState } from '@/@types/State'

// const overmind = createOvermind(config)
interface TestOvermindWrapperProps extends PropsWithChildren {
  stateData?: DataState
}
export const TestOvermindWrapper = (props: TestOvermindWrapperProps) => {
  const actualProps = {
    ...props,
    stateData: props?.stateData ?? {
      carbonReduction: {
        carbonMapHasCountryData: new Map<string, boolean>(),
        carbonMapDataFilters: { region: SubRegion.WORLD, timeframe: TimeframesData.MAX },
        carbonMapHoveredRegion: ``,
        carbonMapHoveredCountry: ``,
      },
      carbonMapDataFiltered: undefined,
    },
  }

  const overmind = createOvermindMock(config, (state) => {
    state.analytics = actualProps.stateData
  })

  return <Provider value={overmind}>{actualProps.children}</Provider>
}
