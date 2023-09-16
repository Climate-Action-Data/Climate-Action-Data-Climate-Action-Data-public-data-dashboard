'use client'

import { BreadCrumbs } from '@/components/atoms/BreadCrumbs/BreadCrumbs'
import { Box, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { ProfileIcon } from '@/components/atoms/ProfileIcon/ProfileIcon'
import { LockIcon } from '@/components/atoms/LockIcon/LockIcon'
import { useActions, useAppState } from '@/overmind'
import { UpdateUserProfile } from '@/@types/UserProfile'
import ProfileContainer from '@/components/organisms/ProfileContainer/ProfileContainer'
import { useToastHook } from '@/components/atoms/Toast/Toast'
import { ToastVariants } from '@/@types/Toast'
import LoginInformationContainer from '@/components/molecules/LoginInformationContainer/LoginInformationContainer'
import { Dropdown, Item } from '@/components/atoms/Dropdown/Dropdown'

type Tab = {
  title: string
  icon: JSX.Element
}

const ProfilePage = () => {
  const { t } = useTranslation(`profile`)
  const [newToast] = useToastHook()

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const [editMode, setEditMode] = useState(false)

  const isTab = useBreakpointValue({ base: false, md: true })

  const { userProfile } = useAppState().profile
  const { updateUserProfile } = useActions().profile

  const handleEditClick = () => {
    setEditMode(!editMode)
  }

  const handleCancelClick = () => {
    setEditMode(!editMode)
  }

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index)
  }

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement> | string) => {
    if (typeof event === `string`) {
      setSelectedTabIndex(tabs.findIndex((tab) => tab.title === event))
    } else {
      setSelectedTabIndex(tabs.findIndex((tab) => tab.title === event.target.value))
    }
  }

  const handleSaveChanges = (updateProfileBody: UpdateUserProfile) => {
    setEditMode(!editMode)

    updateUserProfile(updateProfileBody)
      .then(async (result) => {
        if (result) {
          newToast({ variant: ToastVariants.SUCCESS, message: t(`updateSuccess`), icon: <ProfileIcon /> })
        }
      })
      .catch(() => {
        newToast({ variant: ToastVariants.FAILURE, message: t(`updateFailed`), icon: <ProfileIcon /> })
      })
  }

  const tabs: Tab[] = [
    {
      title: t(`editProfile`),
      icon: <ProfileIcon />,
    },
    {
      title: t(`loginInformation`),

      icon: <LockIcon />,
    },
  ]

  const sections: Item[] = [
    {
      label: t(`editProfile`),
      value: t(`editProfile`),
    },
    {
      label: t(`loginInformation`),
      value: t(`loginInformation`),
    },
  ]

  const buildTabs = () => {
    return (
      <TabList w={`220px`} gap={`8px`}>
        {tabs.map(({ icon, title }) => {
          return (
            <Tab key={title} _selected={{ boxShadow: `2px 2px 8px 0px #0000001A`, borderRadius: `4px`, bgColor: `white` }} justifyContent={`flex-start`}>
              {icon}
              <Text ml={`8px`}>{title}</Text>
            </Tab>
          )
        })}
      </TabList>
    )
  }

  return (
    <>
      <Flex id="headerReference" flexDirection="column" position="sticky" top="56px" minH="48px" px="24px" pt="16px" pb="16px" zIndex="docked" width="100%">
        <BreadCrumbs items={[{ title: `Account`, link: `/profile` }]} color="lightGray.700" />
        {userProfile && (
          <Box paddingY={[`20px`, `20px`, `58px`, `58px`]} paddingX={[`10px`, `10px`, `120px`, `120px`]}>
            <Heading>{t(`account`)}</Heading>
            {isTab ? (
              <Tabs variant="unstyled" orientation="vertical" py={`32px`} onChange={handleTabChange} index={selectedTabIndex}>
                {buildTabs()}
                <TabPanels padding={0}>
                  <TabPanel py={0} px={`56px`} pr={`174px`}>
                    <ProfileContainer editMode={editMode} userProfile={userProfile} onSave={handleSaveChanges} onEdit={handleEditClick} onCancel={handleCancelClick} />
                  </TabPanel>
                  <TabPanel py={0} px={`56px`} pr={`174px`}>
                    <LoginInformationContainer />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            ) : (
              <>
                <Dropdown items={sections} placeholder="" onItemClick={(item) => handlePageChange(item.value)} />
                {selectedTabIndex == 0 && (
                  <ProfileContainer editMode={editMode} userProfile={userProfile} onSave={handleSaveChanges} onEdit={handleEditClick} onCancel={handleCancelClick} />
                )}
                {selectedTabIndex == 1 && <LoginInformationContainer />}
              </>
            )}
          </Box>
        )}
      </Flex>
    </>
  )
}

export default ProfilePage
