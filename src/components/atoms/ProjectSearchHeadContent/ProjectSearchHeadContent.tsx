import { changeHoverColor } from '@/utils/Stickify'
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Skeleton, Stack, Table, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import { BookmarkPlusIcon } from '../BookmarkPlusIcon/BookmarkPlusIcon'
import { DownloadIcon } from '../DownloadIcon/DownloadIcon'
import { KebabMenuIcon } from '../KebabMenuIcon/KebabMenuIcon'
import { ProjectSearchResponse, ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { EffectResponse } from '@/@types/EffectResponse'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface ProjectSearchHeadContentProps {
  projectResults?: EffectResponse<ProjectSearchResponse>
}

export const ProjectSearchHeadContent = (props: ProjectSearchHeadContentProps) => {
  const { projectResults } = props
  const router = useRouter()
  const { t } = useTranslation(`search`)

  const handleClick = (projectId: string, event?: any) => {
    if (event?.target) {
      const target = event.target as HTMLElement
      if (target instanceof HTMLTableCellElement || target instanceof HTMLParagraphElement) {
        router.push(`/project/${projectId}`)
      }
    }
  }

  const generateTableRow = (projectList: ProjectSearchResult[]) => {
    return projectList.map((projectResults, idx) => (
      <Tr
        onClick={(event) => handleClick(projectResults.warehouseProjectId, event)}
        onMouseEnter={() => changeHoverColor(`project-row-${idx}`, `hoverGreen`)}
        data-testid="project-search-head-row"
        className={`project-row-${idx}`}
        key={`project-row-${projectResults.id}`}
        height="92px"
      >
        <Td data-testid="project-search-head-row-td">
          <Flex alignItems="center">
            <Box title={projectResults.name} overflow="hidden" flex={1}>
              <Text fontWeight={500}>{projectResults.name}</Text>
              <Text fontSize="sm">{projectResults.id}</Text>
              <Text textOverflow="ellipsis" color="lightGray.700" fontSize="sm">
                {projectResults.developer}
              </Text>
            </Box>
            <Menu variant="menuWhite">
              <MenuButton as={Button} textAlign="center" iconSpacing={0} rightIcon={<KebabMenuIcon />} variant="lightGrayRound32"></MenuButton>
              <MenuList>
                <MenuItem data-testid="view-project-details" onClick={() => router.push(`/project/${projectResults.warehouseProjectId}`)} minH="48px">
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
        {projectResults?.data ? (
          generateTableRow(projectResults.data.projects)
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
