'use client'

import { BreadCrumbs } from '@/components/atoms/BreadCrumbs/BreadCrumbs'
import { Avatar, Box, Button, Container, Flex, HStack, Heading, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { ProfileIcon } from '@/components/atoms/ProfileIcon/ProfileIcon'
import { LockIcon } from '@/components/atoms/LockIcon/LockIcon'
import { useActions, useAppState } from '@/overmind'

const ProfilePage = () => {
  const { t } = useTranslation(`profile`)
  const { t: thome } = useTranslation(`home`)

  const { userProfile } = useAppState().profile

  const { updateUserProfile } = useActions().profile

  const isProfileEditable = !userProfile?.isSocial ?? userProfile?.id.startsWith(`auth0|`)

  const handleSaveChanges = () => {
    updateUserProfile()
      .then(async (result) => {
        if (result) {
          console.log(`Profile updated successfully`)
        }
      })
      .catch(() => console.log(`Profile update error`))
  }

  return (
    <>
      <Flex id="headerReference" flexDirection="column" position="sticky" top="56px" minH="48px" px="24px" pt="16px" pb="16px" zIndex="docked" width="100%">
        <BreadCrumbs items={[{ title: `Account`, link: `/profile` }]} color="lightGray.700" />
        {userProfile && (
          <Box paddingY={[`20px`, `58px`]} paddingX={[`10px`, `120px`]}>
            <Heading>Account</Heading>
            <Tabs variant="unstyled" orientation="vertical" py={`32px`}>
              <TabList w={`220px`} gap={`8px`}>
                <Tab _selected={{ boxShadow: `2px 2px 8px 0px #0000001A`, borderRadius: `4px`, bgColor: `white` }} justifyContent={`flex-start`}>
                  <ProfileIcon />
                  <Text ml={`8px`}>{t(`editProfile`)}</Text>
                </Tab>
                <Tab _selected={{ boxShadow: `2px 2px 8px 0px #0000001A`, borderRadius: `4px`, bgColor: `white` }} justifyContent={`flex-start`}>
                  <LockIcon />
                  <Text ml={`8px`}>{t(`loginInformation`)}</Text>
                </Tab>
              </TabList>
              <TabPanels padding={0}>
                <TabPanel py={0} px={`56px`} pr={`174px`}>
                  <Container gap="24px" display="flex" flexDirection="column" variant="cardSectionNoMargin" borderRadius={`8px`} padding={`24px`}>
                    <Stack direction={`row`} alignItems="center" gap={`24px`}>
                      <Avatar marginLeft="6px" size="xl" name={`${userProfile.givenName}`} src={userProfile.picture} />
                      <Text>
                        {userProfile.givenName} {userProfile.familyName ?? ``}
                      </Text>
                    </Stack>
                    <SimpleGrid columns={2} gap="24px">
                      <DetailWidget title={t(`firstName`)}>{userProfile.givenName ?? thome(`noData`)}</DetailWidget>
                      <DetailWidget title={t(`lastName`)}>{userProfile.familyName ?? thome(`noData`)}</DetailWidget>
                    </SimpleGrid>
                    <SimpleGrid columns={1} gap="24px">
                      <DetailWidget title={t(`email`)}>{userProfile.email}</DetailWidget>
                    </SimpleGrid>
                    <SimpleGrid columns={2} gap="24px">
                      <DetailWidget title={t(`country`)}>{userProfile.country ?? thome(`noData`)}</DetailWidget>
                      <DetailWidget title={t(`organizationName`)}>{userProfile.company ?? thome(`noData`)}</DetailWidget>
                    </SimpleGrid>
                    {isProfileEditable && (
                      <Button data-testid="page-create-watchlist-button" marginTop="40px" variant={`blueOutline`} width={`92px`} onClick={handleSaveChanges}>
                        {t(`editProfile`)}
                      </Button>
                    )}
                  </Container>
                </TabPanel>
                <TabPanel py={0} px={`56px`} pr={`174px`}>
                  <Container flex={2} gap="24px" display="flex" flexDirection="column" variant="cardSectionNoMargin" borderRadius={`8px`}>
                    <HStack alignItems="center">
                      <DetailWidget title={t(`username`)}>sujayps90</DetailWidget>
                      <Button data-testid="page-create-watchlist-button" ml="88px" variant={`blueOutline`} width={`92px`}>
                        {t(`edit`)}
                      </Button>
                    </HStack>
                    <Box mt={`32px`}>
                      <Text>Current Login Method</Text>
                    </Box>
                  </Container>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </Flex>
    </>
  )
}

export default ProfilePage
