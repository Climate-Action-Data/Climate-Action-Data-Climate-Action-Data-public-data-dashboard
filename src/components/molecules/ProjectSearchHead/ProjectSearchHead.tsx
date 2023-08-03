import { useAppState } from '@/overmind'
import { useTranslation } from 'react-i18next'
import { Stack, Skeleton, Flex, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Button, Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

import { ALLOWED_RENDER_TYPE } from '@/@types/ProjectSearchResult'
import { BookmarkPlusIcon } from '@/components/atoms/BookmarkPlusIcon/BookmarkPlusIcon'
import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'
import { KebabMenuIcon } from '@/components/atoms/KebabMenuIcon/KebabMenuIcon'
import { changeHoverColor } from '@/utils/Stickify'
import { ColumnSortFilter } from '@/components/atoms/ColumnSortFilter/ColumnSortFilter'
import { useRouter } from 'next/navigation'

interface ProjectSearchHeadProps {
  renderType?: string
}

export const ProjectSearchHead = (props: ProjectSearchHeadProps) => {
  const { renderType } = props
  const { projectResults } = useAppState().projectResult
  const router = useRouter()
  const { t } = useTranslation(`search`)

  if (renderType !== ALLOWED_RENDER_TYPE) {
    throw new Error(`This page should only be rendered in PageProject and is currently rendered in ${renderType}`)
  }

  return (
    <Flex flexDirection="column" w={[`184px`, `552px`]} minW={[`184px`, `552px`]}>
      <TableContainer minH="72px" id="projectTableReference">
        <Table variant="simple" className="searchTable">
          <Thead zIndex={3} minW="552px" id="projectTable">
            <Tr>
              <Th>
                <Box>
                  {t(`table.projectDetails`)}
                  <ColumnSortFilter />
                </Box>
              </Th>
            </Tr>
          </Thead>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table variant="simple" className="searchTable">
          <Tbody borderRight="1px solid #B8BEC0">
            {projectResults?.data ? (
              projectResults.data.map((projectResults, idx) => (
                <Tr
                  onMouseEnter={() => changeHoverColor(`project-row-${idx}`, `hoverGreen`)}
                  className={`project-row-${idx}`}
                  key={`project-row-${projectResults.id}`}
                  height="92px"
                >
                  <Td>
                    <Flex alignItems="center">
                      <Box title={projectResults.name} overflow="hidden" flex={1}>
                        <Text fontWeight={500}>{projectResults.name}</Text>
                        <Text fontSize="sm">{projectResults.id}</Text>
                        <Text textOverflow="ellipsis" color="lightGray.700" fontSize="sm">
                          {projectResults.projectDeveloper}
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
      </TableContainer>
    </Flex>
  )
}
