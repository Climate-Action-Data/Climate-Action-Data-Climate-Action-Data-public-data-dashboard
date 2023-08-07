import { changeHoverColor } from '@/utils/Stickify'
import { Table, Tbody, Tr, Td, Flex, Menu, MenuButton, Button, MenuList, MenuItem, Stack, Skeleton, Text, Box } from '@chakra-ui/react'
import { BookmarkPlusIcon } from '../BookmarkPlusIcon/BookmarkPlusIcon'
import { DownloadIcon } from '../DownloadIcon/DownloadIcon'
import { KebabMenuIcon } from '../KebabMenuIcon/KebabMenuIcon'
import { EffectResponse } from '@/@types/EffectResponse'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { UnitSearchResult } from '@/@types/UnitSearchResult'

interface UnitSearchHeadContentProps {
  unitResults?: EffectResponse<UnitSearchResult[]>
}

export const UnitSearchHeadContent = (props: UnitSearchHeadContentProps) => {
  const { unitResults } = props
  const router = useRouter()
  const { t } = useTranslation(`search`)

  const handleClick = (unitId: string, event?: any) => {
    if (event?.target) {
      const target = event.target as HTMLElement
      if (target instanceof HTMLTableCellElement || target instanceof HTMLParagraphElement) {
        router.push(`/unit/${unitId}`)
      }
    }
  }

  const generateTableRow = (unitList: UnitSearchResult[]) => {
    return unitList.map((unitResults, idx) => (
      <Tr
        onClick={(event) => handleClick(unitResults.warehouseUnitId, event)}
        onMouseEnter={() => changeHoverColor(`project-row-${idx}`, `hoverGreen`)}
        data-testid="project-search-head-row"
        className={`project-row-${idx}`}
        key={`project-row-${unitResults.id}`}
        height="92px"
      >
        <Td data-testid="project-search-head-row-td">
          <Flex alignItems="center">
            <Box title={unitResults.projectName} overflow="hidden" flex={1}>
              <Text fontWeight={500}>{unitResults.projectName}</Text>
              <Text fontSize="sm">{unitResults.projectId}</Text>
              <Text textOverflow="ellipsis" color="lightGray.700" fontSize="sm">
                {unitResults.projectDeveloper}
              </Text>
            </Box>
            <Menu variant="menuWhite">
              <MenuButton as={Button} textAlign="center" iconSpacing={0} rightIcon={<KebabMenuIcon />} variant="lightGrayRound32"></MenuButton>
              <MenuList>
                <MenuItem data-testid="view-project-details" onClick={() => router.push(`/unit/${unitResults.warehouseUnitId}`)} minH="48px">
                  <Text flex={1} as="span">
                    {t(`projectMenu.viewProject`)}
                  </Text>
                </MenuItem>
                <MenuItem display="flex" minH="40px">
                  <Text flex={1} as="span">
                    {t(`projectMenu.exportProject`)}
                  </Text>
                  <DownloadIcon />
                </MenuItem>
                <MenuItem display="flex" minH="40px">
                  <Text flex={1} as="span">
                    {t(`projectMenu.addToWatchlists`)}
                  </Text>
                  <BookmarkPlusIcon />
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Td>
      </Tr>
    ))
  }

  return (
    <Table variant="simple" className="searchTable">
      <Tbody borderRight="1px solid #B8BEC0">
        {unitResults?.data ? (
          generateTableRow(unitResults.data)
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
