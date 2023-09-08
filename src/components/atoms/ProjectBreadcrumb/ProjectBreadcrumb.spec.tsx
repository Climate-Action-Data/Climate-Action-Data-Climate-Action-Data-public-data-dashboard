import { render } from '@testing-library/react'
import { ProjectBreadcrumb } from './ProjectBreadcrumb'

jest.mock(`next/navigation`, () => ({
  ...jest.requireActual(`next/navigation`),
  useSearchParams: () => ({ get: () => `project` }),
}))

const DEFAULT_BREADCRUMB = {
  id: `a442a765-50f4-43dc-aa38-24e08d88c821`,
  title: `Proyecto de Mitigación Forestal Bonanza Verde`,
}

it(`renders correctly`, () => {
  const { container } = render(<ProjectBreadcrumb id={DEFAULT_BREADCRUMB.id} title={DEFAULT_BREADCRUMB.title} />)
  expect(container).toMatchSnapshot()
})
