import { render } from '@testing-library/react'
import { WatchlistBreadcrumb } from './WatchlistBreadcrumb'

const DEFAULT_BREADCRUMB = {
  id: `a442a765-50f4-43dc-aa38-24e08d88c821`,
  title: `Proyecto de Mitigación Forestal Bonanza Verde`,
}

it(`renders correctly`, () => {
  const { container } = render(<WatchlistBreadcrumb id={DEFAULT_BREADCRUMB.id} title={DEFAULT_BREADCRUMB.title} />)
  expect(container).toMatchSnapshot()
})
