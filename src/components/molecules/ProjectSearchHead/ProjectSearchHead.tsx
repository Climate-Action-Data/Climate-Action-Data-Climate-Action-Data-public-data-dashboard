import { Project } from '@/@types/Project'
import { Flex, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Button, Box, Menu, MenuButton, MenuItem, MenuList, Image } from '@chakra-ui/react'

interface ProjectSearchHeadProps {
  projects: Project[]
}
export const ProjectSearchHead = (props: ProjectSearchHeadProps) => {
  const { projects } = props
  return (
    <Flex flexDirection={`column`} w={`552px`} minW={`552px`}>
      <TableContainer minH={`72px`} id="projectTableReference">
        <Table variant="simple" className="searchTable">
          <Thead minW={`552px`} id="projectTable">
            <Tr>
              <Th>Project</Th>
            </Tr>
          </Thead>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table variant="simple" className="searchTable">
          <Tbody borderRight="1px solid #B8BEC0">
            {projects.map((project) => (
              <Tr key={`project-row-${project.id}`} height="92px">
                <Td>
                  <Flex alignItems="center">
                    <Box flex={1}>
                      <Text fontWeight={500}>{project.name}</Text>
                      <Text fontSize={`sm`}>{project.id}</Text>
                      <Text color={`lightGray.700`} fontSize={`sm`}>
                        {project.company}
                      </Text>
                    </Box>
                    <Menu variant="menuWhite">
                      <MenuButton as={Button} variant="lightGrayRound">
                        |
                      </MenuButton>
                      <MenuList>
                        <MenuItem minH="48px">
                          <Text flex={1} as="span">
                            View Project
                          </Text>
                        </MenuItem>
                        <MenuItem display="flex" minH="40px">
                          <Text flex={1} as="span">
                            Export Project
                          </Text>
                          <Image boxSize="2rem" borderRadius="full" src="https://placekitten.com/110/110" alt="Simon the pensive" ml="12px" />
                        </MenuItem>
                        <MenuItem display="flex" minH="40px">
                          <Text flex={1} as="span">
                            Add to watchlist
                          </Text>
                          <Image boxSize="2rem" borderRadius="full" src="https://placekitten.com/120/120" alt="Simon the pensive" ml="12px" />
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}
