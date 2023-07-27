import { render } from '@testing-library/react'
import { DownloadIcon } from './DownloadIcon'

it(`renders correctly`, () => {
  const { container } = render(<DownloadIcon />)
  expect(container).toMatchSnapshot()
})
