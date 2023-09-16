import { Container, Stack, Avatar, SimpleGrid, Input, HStack, Button, Flex, Text } from '@chakra-ui/react'
import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { countries } from '../GeoMap/countries'
import { UpdateUserProfile, UserProfile } from '@/@types/UserProfile'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown, Item } from '@/components/atoms/Dropdown/Dropdown'

interface ProfileContainerProps {
  userProfile: UserProfile
  editMode: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: (updateUserProfile: UpdateUserProfile) => void
}

const DEFAULT_COLUMN_MOBILE = 1
const DEFAULT_COLUMN_WEB = 2

const ProfileContainer = (props: ProfileContainerProps) => {
  const { userProfile, editMode, onEdit, onCancel, onSave } = props

  const { t } = useTranslation(`profile`)
  const { t: thome } = useTranslation(`home`)

  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [country, setCountry] = useState<string>(``)
  const [company, setCompany] = useState<string>()

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value ?? ``)
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value)
  }

  const handleCountryChange = (country: string) => {
    setCountry(country)
  }

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value)
  }

  const handleCancel = () => {
    setFirstName(userProfile.givenName)
    setLastName(userProfile.familyName)
    setCountry(userProfile.country)
    setCompany(userProfile.company)
    onCancel()
  }

  const handleSaveChanges = () => {
    if (firstName == undefined || lastName == undefined) {
      return
    }

    const updateUserProfile: UpdateUserProfile = {
      id: userProfile.id,
      firstName: firstName,
      lastName: lastName,
      country: country,
      company: company,
    }

    onSave(updateUserProfile)
  }

  useEffect(() => {
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
  }, [])

  const countryList: Item[] = [
    { label: `Select`, value: `` },
    ...Object.values(countries).map((value) => {
      return { label: value.name ?? ``, value: value.name ?? `` }
    }),
  ]

  return (
    <Container gap="24px" display="flex" flexDirection="column" variant="cardSectionNoMargin" borderRadius={`8px`} padding={`24px`}>
      <Stack direction={`row`} alignItems="center" gap={`24px`}>
        <Avatar marginLeft="6px" size="xl" name={`${firstName}`} src={userProfile.picture} />
        <Text>
          {firstName} {lastName ?? ``}
        </Text>
      </Stack>
      <SimpleGrid columns={[DEFAULT_COLUMN_MOBILE, DEFAULT_COLUMN_WEB]} gap="24px">
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
      <SimpleGrid columns={DEFAULT_COLUMN_MOBILE} gap="24px">
        <DetailWidget title={t(`email`)}>{userProfile.email}</DetailWidget>
      </SimpleGrid>
      <SimpleGrid columns={[DEFAULT_COLUMN_MOBILE, DEFAULT_COLUMN_WEB]} gap="24px">
        <DetailWidget title={t(`country`)}>
          {editMode ? (
            <Dropdown
              items={countryList}
              defaultSelection={countryList.find((item) => item.value === country)}
              placeholder=""
              onItemClick={(item) => handleCountryChange(item.value)}
            />
          ) : (
            country ?? thome(`noData`)
          )}
        </DetailWidget>
        <DetailWidget title={t(`organizationName`)}>
          {editMode ? <Input onChange={handleCompanyChange} value={company} variant={`soloDropdown`} data-testid="edit-company" /> : company ?? thome(`noData`)}
        </DetailWidget>
      </SimpleGrid>
      {!userProfile.isSocial &&
        (editMode ? (
          <HStack marginTop="40px">
            <Button variant="green" width="max-content" fontSize="14px" fontWeight="medium" data-testid="save-button" onClick={handleSaveChanges}>
              <Flex alignItems={`center`}>{t(`saveChanges`)}</Flex>
            </Button>
            <Button data-testid="cancel-edit-profile-button" variant={`blueOutline`} width={`92px`} onClick={handleCancel}>
              {t(`cancel`)}
            </Button>
          </HStack>
        ) : (
          <Button data-testid="edit-profile-button" marginTop="40px" variant={`blueOutline`} width={`92px`} onClick={onEdit}>
            {t(`editProfile`)}
          </Button>
        ))}
    </Container>
  )
}

export default ProfileContainer
