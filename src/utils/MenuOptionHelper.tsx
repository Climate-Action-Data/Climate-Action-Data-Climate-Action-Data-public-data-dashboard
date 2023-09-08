import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { MenuItemProps } from '../components/atoms/MenuContent/MenuContent'
import { DownloadIcon } from '../components/atoms/DownloadIcon/DownloadIcon'
import { generateProjectUrl, generateUnitUrl } from './RequestHelpers'
import { TFunction } from 'i18next'
import { generateProjectPDFDocument } from '../app/project/page.pdf'
import { BookmarkPlusIcon } from '../components/atoms/BookmarkPlusIcon/BookmarkPlusIcon'
import { SearchFlow } from '@/@types/Search'

export const generateMenuList = (unitWarehouseId: string, projectWarehouseId: string, unitStatus: string, router: AppRouterInstance, t: TFunction) => {
  const generatedUrl = generateUnitUrl(`${unitStatus}`)

  const menuList: MenuItemProps[] = [
    {
      dataTestId: `view-unit-details`,
      onClick: () => router.push(`${generatedUrl}${unitWarehouseId}`),
      text: t(`projectMenu.viewUnit`),
    },
    {
      dataTestId: `view-project-details`,
      onClick: () => router.push(`${generateProjectUrl(projectWarehouseId, SearchFlow.UNIT)}`),
      text: t(`projectMenu.viewProject`),
    },
    {
      dataTestId: `export-project`,
      onClick: () => {
        ;(async () => {
          generateProjectPDFDocument({ id: projectWarehouseId })
        })()
      },
      icon: <DownloadIcon />,
      text: t(`projectMenu.exportProject`),
    },
    { dataTestId: `export-project`, icon: <BookmarkPlusIcon />, text: t(`projectMenu.addToWatchlists`) },
  ]
  return menuList
}
