import { render } from '@testing-library/react'
import PageDetails from './page'
import { PROJECT_DETAIL } from '@/test/TestOvermindMockData'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'

describe(`PageDetails`, () => {
  it(`renders correctly`, () => {
    const { container } = render(
      <TestOvermindWrapper>
        <PageDetails params={{ id: PROJECT_DETAIL.warehouseProjectId }} />
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })
})
