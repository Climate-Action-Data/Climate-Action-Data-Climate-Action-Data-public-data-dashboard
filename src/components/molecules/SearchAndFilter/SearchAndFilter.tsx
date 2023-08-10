import { FC, ReactElement } from 'react'
import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import HeaderTab from '@/components/atoms/HeaderTab/HeaderTab'

interface SearchAndFilterProps {
  tabs: { title: string; content: ReactElement }[]
}

const SearchAndFilter: FC<SearchAndFilterProps> = (props) => {
  const { tabs } = props
  return (
    <Tabs variant="unstyled" align="center">
      <TabList>
        {tabs.map((tab) => (
          <HeaderTab key={`${tab.title}-tab-title`}>{tab.title}</HeaderTab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel key={`${tab.title}-tab-content`}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default SearchAndFilter
