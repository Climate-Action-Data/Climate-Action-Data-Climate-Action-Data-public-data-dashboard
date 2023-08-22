import { Modal, ModalOverlay, ModalContent, Box, Flex, Text, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@chakra-ui/react'
import { CloseIcon } from '../CloseIcon/CloseIcon'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

interface EditWatchlistPopupProps {
  title: string
  name?: string
  description?: string
  onConfirm?: (name: string, description: string) => void
  onCancel?: () => void
  isNewWatchlist?: boolean
  isOpen: boolean
}

const MAX_NAME_LENGTH = 60
const MAX_DESCRIPTION_LENGTH = 280

export const EditWatchlistPopup = (props: EditWatchlistPopupProps) => {
  const { title, name, description, onConfirm, onCancel, isNewWatchlist, isOpen } = props
  const [nameInput, setNameInput] = useState<string>(``)
  const [descriptionInput, setDescriptionInput] = useState<string>(``)
  const { t } = useTranslation(`watchlist`)

  const [isOpenModal, setIsOpenModal] = useState<boolean>(isOpen)

  useEffect(() => {
    setIsOpenModal(isOpen)
    setNameInput(name || ``)
    setDescriptionInput(description || ``)
  }, [isOpen, name, description])

  const handleClose = () => {
    setIsOpenModal(false)
    onCancel?.()
  }

  const handleConfirm = () => {
    setIsOpenModal(false)
    onConfirm?.(nameInput, descriptionInput)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= MAX_NAME_LENGTH) {
      setNameInput(event.target.value)
    }
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= MAX_DESCRIPTION_LENGTH) {
      setDescriptionInput(event.target.value)
    }
  }

  const getNameLimitColor = () => {
    return nameInput.length >= MAX_NAME_LENGTH ? `red.400` : `lightGray.700`
  }

  const getDescriptionLimitColor = () => {
    return descriptionInput.length >= MAX_DESCRIPTION_LENGTH ? `red.400` : `lightGray.700`
  }

  const isSaveButtonDisabled = () => {
    return nameInput.length === 0 || nameInput.length > MAX_NAME_LENGTH || descriptionInput.length > MAX_DESCRIPTION_LENGTH
  }

  return (
    <Modal onClose={handleClose} size={`md`} isOpen={isOpenModal}>
      <ModalOverlay />
      <ModalContent>
        <Flex alignItems="center">
          <ModalHeader flex={1}>{title}</ModalHeader>
          <CloseIcon data-testid="close-modal" _hover={{ cursor: `pointer` }} marginRight="1.5rem" onClick={handleClose} />
        </Flex>
        <ModalBody>
          <Flex gap="24px" flexDirection="column">
            <Box>
              <Input onChange={handleNameChange} variant="underlined" value={nameInput} placeholder={t(`name`)} />
              <Flex justifyContent="end">
                <Text fontSize="xs" color={getNameLimitColor()}>
                  {nameInput.length}
                  {t(`sizeSeperator`)}
                  {MAX_NAME_LENGTH}
                </Text>
              </Flex>
            </Box>
            <Box>
              <Input onChange={handleDescriptionChange} value={descriptionInput} variant="underlined" placeholder={t(`description`)} />

              <Flex justifyContent="end">
                <Text fontSize="xs" color={getDescriptionLimitColor()}>
                  {descriptionInput.length}
                  {t(`sizeSeperator`)}
                  {MAX_DESCRIPTION_LENGTH}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter gap="48px" justifyContent="center">
          <Button data-testid="cancel-modal" variant={`blueOutline`} onClick={handleClose}>
            {t(`cancel`)}
          </Button>
          <Button isDisabled={isSaveButtonDisabled()} data-testid="confirm-modal" variant={`green`} onClick={handleConfirm}>
            {isNewWatchlist ? t(`create`) : t(`save`)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
