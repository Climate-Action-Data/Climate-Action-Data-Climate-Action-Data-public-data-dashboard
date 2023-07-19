import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from '@/overmind'
import { PropsWithChildren } from 'react'

const overmind = createOvermind(config)

export const TestOvermindWrapper = (props: PropsWithChildren) => {
  return <Provider value={overmind}>{props.children}</Provider>
}
