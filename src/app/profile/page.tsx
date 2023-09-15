'use client'

import { BreadCrumbs } from '@/components/atoms/BreadCrumbs/BreadCrumbs'
import { Avatar, Box, Button, Container, Flex, HStack, Heading, Input, Select, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { ProfileIcon } from '@/components/atoms/ProfileIcon/ProfileIcon'
import { LockIcon } from '@/components/atoms/LockIcon/LockIcon'
import { useActions, useAppState } from '@/overmind'
import { UpdateUserProfile } from '@/@types/UserProfile'
import { countries } from '@/components/organisms/GeoMap/countries'

const ProfilePage = () => {
  const { t } = useTranslation(`profile`)
  const { t: thome } = useTranslation(`home`)
  const [editMode, setEditMode] = useState(false)
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [country, setCountry] = useState<string>()
  const [company, setCompany] = useState<string>()

  const { userProfile } = useAppState().profile

  const { updateUserProfile } = useActions().profile

  const handleEditClick = () => {
    setEditMode(!editMode)
  }

  const handleCancelClick = () => {
    setEditMode(!editMode)
    setFirstName(userProfile?.givenName)
    setLastName(userProfile?.familyName)
  }

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value)
  }

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value)
  }

  const handleSaveChanges = () => {
    const updateProfileBody: UpdateUserProfile = {
      id: userProfile?.id,
      firstName: firstName,
      lastName: lastName,
      company: company,
      country: country,
    }

    setEditMode(!editMode)

    updateUserProfile(updateProfileBody)
      .then(async (result) => {
        if (result) {
          console.log(`Profile updated successfully`)
        }
      })
      .catch(() => {
        console.log(`Profile update error`)
      })
  }

  const tabs = [
    {
      icon: <ProfileIcon />,
      title: t(`editProfile`),
    },
    {
      icon: <LockIcon />,
      title: t(`loginInformation`),
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

  if (userProfile) {
    if (!firstName) {
      setFirstName(userProfile.givenName)
    }

    if (!lastName) {
      setLastName(userProfile.familyName)
    }

    if (!country) {
      setCountry(userProfile.country)
    }

    if (!company) {
      setCompany(userProfile.company)
    }
  }

  return (
    <>
      <Flex id="headerReference" flexDirection="column" position="sticky" top="56px" minH="48px" px="24px" pt="16px" pb="16px" zIndex="docked" width="100%">
        <BreadCrumbs items={[{ title: `Account`, link: `/profile` }]} color="lightGray.700" />
        {userProfile && (
          <Box paddingY={[`20px`, `58px`]} paddingX={[`10px`, `120px`]}>
            <Heading>{t(`account`)}</Heading>
            <Tabs variant="unstyled" orientation="vertical" py={`32px`}>
              {buildTabs()}
              <TabPanels padding={0}>
                <TabPanel py={0} px={`56px`} pr={`174px`}>
                  <Container gap="24px" display="flex" flexDirection="column" variant="cardSectionNoMargin" borderRadius={`8px`} padding={`24px`}>
                    <Stack direction={`row`} alignItems="center" gap={`24px`}>
                      <Avatar marginLeft="6px" size="xl" name={`${firstName}`} src={userProfile.picture} />
                      <Text>
                        {firstName} {lastName ?? ``}
                      </Text>
                    </Stack>
                    <SimpleGrid columns={2} gap="24px">
                      <DetailWidget title={t(`firstName`)}>
                        {editMode ? (
                          <Input onChange={handleFirstNameChange} value={firstName} variant={`soloDropdown`} data-testid="edit-first-name" placeholder={t(`firstName`)} />
                        ) : (
                          firstName ?? thome(`noData`)
                        )}
                      </DetailWidget>
                      <DetailWidget title={t(`lastName`)}>
                        {editMode ? (
                          <Input onChange={handleLastNameChange} value={lastName} variant={`soloDropdown`} data-testid="edit-last-name" placeholder={t(`lastName`)} />
                        ) : (
                          lastName ?? thome(`noData`)
                        )}
                      </DetailWidget>
                    </SimpleGrid>
                    <SimpleGrid columns={1} gap="24px">
                      <DetailWidget title={t(`email`)}>{userProfile.email}</DetailWidget>
                    </SimpleGrid>
                    <SimpleGrid columns={2} gap="24px">
                      <DetailWidget title={t(`country`)}>
                        {editMode ? (
                          <Select variant="outline" placeholder="Select Country" value={country} onChange={handleCountryChange}>
                            {countries.map((country) => {
                              return (
                                <option key={country.countryCode} value={country.name}>
                                  {country.name}
                                </option>
                              )
                            })}
                          </Select>
                        ) : (
                          country ?? thome(`noData`)
                        )}
                      </DetailWidget>
                      <DetailWidget title={t(`organizationName`)}>
                        {editMode ? <Input onChange={handleCompanyChange} value={company} variant={`soloDropdown`} data-testid="edit-last-name" /> : company ?? thome(`noData`)}
                      </DetailWidget>
                    </SimpleGrid>
                    {!userProfile.isSocial && editMode && (
                      <HStack marginTop="40px">
                        <Button variant="green" width="max-content" fontSize="14px" fontWeight="medium" data-testid="save-button" onClick={handleSaveChanges}>
                          <Flex alignItems={`center`}>{t(`saveChanges`)}</Flex>
                        </Button>
                        <Button data-testid="page-create-watchlist-button" variant={`blueOutline`} width={`92px`} onClick={handleCancelClick}>
                          {t(`cancel`)}
                        </Button>
                      </HStack>
                    )}
                    {!userProfile.isSocial && !editMode && (
                      <Button data-testid="page-create-watchlist-button" marginTop="40px" variant={`blueOutline`} width={`92px`} onClick={handleEditClick}>
                        {t(`editProfile`)}
                      </Button>
                    )}
                  </Container>
                </TabPanel>
                <TabPanel py={0} px={`56px`} pr={`174px`}>
                  <Container flex={2} gap="24px" display="flex" flexDirection="column" variant="cardSectionNoMargin" borderRadius={`8px`} padding={`24px`}>
                    <HStack alignItems="center">
                      <DetailWidget title={t(`password`)}>•••••••••••</DetailWidget>
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
