import { changeHoverColor } from '@/utils/Stickify'
import { Box, Button, Flex, Menu, MenuButton, Skeleton, Stack, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import { MenuContent, MenuItemProps } from '@/components/atoms/MenuContent/MenuContent'
import { BookmarkPlusIcon } from '../BookmarkPlusIcon/BookmarkPlusIcon'
import { DownloadIcon } from '../DownloadIcon/DownloadIcon'
import { KebabMenuIcon } from '../KebabMenuIcon/KebabMenuIcon'
import { EffectResponse } from '@/@types/EffectResponse'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { UnitSearchResponse, UnitSearchResult } from '@/@types/UnitSearchResult'
import { generateUnitUrl } from '@/utils/RequestHelpers'
import { generateRandomString } from '@/utils/GenerationHelpers'

interface UnitSearchHeadContentProps {
  unitResults?: EffectResponse<UnitSearchResponse>
}

export const UnitSearchHeadContent = (props: UnitSearchHeadContentProps) => {
  const { unitResults } = props
  const router = useRouter()
  const { t } = useTranslation(`search`)

  const handleClick = (unitId: string, unitStatus: string, event?: any) => {
    if (event?.target) {
      const target = event.target as HTMLElement
      if (target instanceof HTMLTableCellElement || target instanceof HTMLParagraphElement) {
        const generatedUrl = generateUnitUrl(`${unitStatus}`)
        router.push(`${generatedUrl}${unitId}`)
      }
    }
  }
  const generateMenuList = (unitWarehouseId: string, projectWarehouseId: string, unitStatus: string) => {
    const generatedUrl = generateUnitUrl(`${unitStatus}`)
    const menuList: MenuItemProps[] = [
      {
        dataTestId: `view-unit-details`,
        onClick: () => router.push(`${generatedUrl}${unitWarehouseId}`),
        text: t(`projectMenu.viewUnit`),
      },
      {
        dataTestId: `view-project-details`,
        onClick: () => router.push(`/project?id=${projectWarehouseId}`),
        text: t(`projectMenu.viewProject`),
      },
      { dataTestId: `export-project`, icon: <DownloadIcon />, text: t(`projectMenu.exportProject`) },
      { dataTestId: `export-project`, icon: <BookmarkPlusIcon />, text: t(`projectMenu.addToWatchlists`) },
    ]
    return menuList
  }

  const generateTableRow = (unitList: UnitSearchResult[]) => {
    return unitList.map((unitResults, idx) => (
      <Tr
        onClick={(event) => handleClick(unitResults.warehouseUnitId, unitResults.status, event)}
        onMouseEnter={() => changeHoverColor(`project-row-${idx}`, `hoverGreen`)}
        data-testid="project-search-head-row"
        className={`project-row-${idx}`}
        key={`project-row-${generateRandomString()}`}
        height="92px"
      >
        <Td data-testid="project-search-head-row-td">
          <Flex alignItems="center">
            <Box title={unitResults?.project?.name} overflow="hidden" flex={1}>
              <Text fontWeight={500}>{unitResults?.project?.name}</Text>
              <Text fontSize="sm">{unitResults?.project?.id}</Text>
              <Text textOverflow="ellipsis" color="lightGray.700" fontSize="sm">
                {unitResults?.project?.developer}
              </Text>
            </Box>
            <Menu variant="menuWhite">
              <MenuButton as={Button} textAlign="center" iconSpacing={0} rightIcon={<KebabMenuIcon />} variant="lightGrayRound32"></MenuButton>
              <MenuContent menuItems={generateMenuList(unitResults.warehouseUnitId, unitResults?.project?.id, unitResults.status)} />
            </Menu>
          </Flex>
        </Td>
      </Tr>
    ))
  }

  return (
    <Table variant="simple" className="searchTable">
      <Tbody borderRight="1px solid #B8BEC0">
        {unitResults?.data?.units !== undefined ? (
          generateTableRow(unitResults.data.units)
        ) : (
          <Tr height="92px">
            <Td>
              <Flex alignItems="center">
                <Box flex={1}>
                  <Stack>
                    <Skeleton height="20px" />
                    <Skeleton height="10px" />
                    <Skeleton height="10px" />
                  </Stack>
                </Box>
              </Flex>
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  )
}
