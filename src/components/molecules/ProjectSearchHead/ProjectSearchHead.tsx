import { BookmarkPlusIcon } from '@/components/atoms/BookmarkPlusIcon/BookmarkPlusIcon'
import { DownloadIcon } from '@/components/atoms/DownloadIcon/DownloadIcon'
import { KebabMenuIcon } from '@/components/atoms/KebabMenuIcon/KebabMenuIcon'
import { SortDownIcon } from '@/components/atoms/SortDownIcon/SortDownIcon'
import { SortUpIcon } from '@/components/atoms/SortUpIcon/SortUpIcon'
import { useAppState } from '@/overmind'
import { changeHoverColor } from '@/utils/Stickify'
import { Stack, Skeleton, Flex, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Button, Box, Menu, MenuButton, MenuItem, MenuList, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
export const ProjectSearchHead = () => {
  const { projectResults } = useAppState().projectResult
  const { t } = useTranslation(`search`)

  return (
    <Flex flexDirection="column" w="552px" minW="552px">
      <TableContainer minH="72px" id="projectTableReference">
        <Table variant="simple" className="searchTable">
          <Thead zIndex={3} minW="552px" id="projectTable">
            <Tr>
              <Th lineHeight="20px" display="flex" alignItems="end" gap="8px">
                Project
                <VStack justifyContent="center" gap="2px" height="20px">
                  <SortUpIcon _hover={{ cursor: `pointer` }} />
                  <SortDownIcon _hover={{ cursor: `pointer` }} />
                </VStack>
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
                <Tr onMouseEnter={() => changeHoverColor(`project-row-${idx}`, `hoverGreen`)} className="project-row-${idx}" key={`project-row-${projectResults.id}`} height="92px">
                  <Td>
                    <Flex alignItems="center">
                      <Box overflow="hidden" flex={1}>
                        <Text fontWeight={500}>{projectResults.name}</Text>
                        <Text fontSize="sm">{projectResults.id}</Text>
                        <Text textOverflow="ellipsis" color="lightGray.700" fontSize="sm">
                          {projectResults.company}
                        </Text>
                      </Box>
                      <Menu variant="menuWhite">
                        <MenuButton as={Button} textAlign="center" iconSpacing={0} rightIcon={<KebabMenuIcon />} variant="lightGrayRound32"></MenuButton>
                        <MenuList>
                          <MenuItem minH="48px">
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
