import { generateMenuList } from './MenuOptionHelper'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { useTranslation } from 'react-i18next'
jest.mock(`react-i18next`, () => ({
  useTranslation: jest.fn(),
}))

describe(`generateMenuList`, () => {
  const unitWarehouseId = `unit-123`
  const projectWarehouseId = `project-123`
  const unitStatus = `active`
  const router: AppRouterInstance = {
    push: jest.fn(),
  } as any
  const useTranslationSpy = useTranslation as jest.Mock

  beforeAll(() => {
    useTranslationSpy.mockReturnValue({
      t: jest.fn((str) => str),
      i18n: {
        language: `en`,
      },
    })
  })
  it(`should generate the correct menu list`, () => {
    const { t } = useTranslation(`search`)

    const menuList = generateMenuList(unitWarehouseId, projectWarehouseId, unitStatus, router, t)

    expect(menuList).toEqual([
      {
        dataTestId: `view-unit-details`,
        onClick: expect.any(Function),
        text: expect.any(String),
      },
      {
        dataTestId: `view-project-details`,
        onClick: expect.any(Function),
        text: expect.any(String),
      },
      {
        dataTestId: `export-project`,
        onClick: expect.any(Function),
        icon: expect.any(Object),
        text: expect.any(String),
      },
      {
        dataTestId: `export-project`,
        icon: expect.any(Object),
        text: expect.any(String),
      },
    ])
  })

  it(`should navigate to the correct issuance details page when the "View Unit Details" menu item is clicked`, () => {
    const { t } = useTranslation(`search`)

    const menuList = generateMenuList(unitWarehouseId, projectWarehouseId, unitStatus, router, t)
    const viewUnitDetailsMenuItem = menuList.find((item) => item.dataTestId === `view-unit-details`)

    viewUnitDetailsMenuItem?.onClick?.()

    if (router.push) {
      expect(router.push).toHaveBeenCalledWith(`/issuance?id=${unitWarehouseId}&searchFlow=unit`)
    }
  })

  it(`should navigate to the correct project details page when the "View Project" menu item is clicked`, () => {
    const { t } = useTranslation(`search`)
    const menuList = generateMenuList(unitWarehouseId, projectWarehouseId, unitStatus, router, t)
    const viewProjectDetailsMenuItem = menuList.find((item) => item.dataTestId === `view-project-details`)

    viewProjectDetailsMenuItem?.onClick?.()

    if (router.push) {
      expect(router.push).toHaveBeenCalledWith(`/project?id=${projectWarehouseId}&searchFlow=unit`)
    }
  })
})
