import { Modal, ModalOverlay, ModalContent, Flex, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import { CloseIcon } from '../CloseIcon/CloseIcon'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

interface DeletePopupProps {
  title: string
  description: string
  onConfirm?: () => void
  onCancel?: () => void
  isOpen: boolean
}

export const DeletePopup = (props: DeletePopupProps) => {
  const { title, description, onConfirm, onCancel, isOpen } = props
  const { t } = useTranslation(`home`)

  const [isOpenModal, setIsOpenModal] = useState<boolean>(isOpen)

  useEffect(() => {
    setIsOpenModal(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setIsOpenModal(false)
    onCancel?.()
  }

  const handleConfirm = () => {
    setIsOpenModal(false)
    onConfirm?.()
  }

  return (
    <Modal onClose={handleClose} size={`md`} isOpen={isOpenModal}>
      <ModalOverlay />
      <ModalContent>
        <Flex alignItems="center">
          <ModalHeader flex={1}>{title}</ModalHeader>
          <CloseIcon data-testid="close-modal" _hover={{ cursor: `pointer` }} marginRight="1.5rem" onClick={handleClose} />
        </Flex>
        <ModalBody>{description}</ModalBody>
        <ModalFooter gap="48px" justifyContent="center">
          <Button data-testid="cancel-modal" variant={`blueOutline`} onClick={handleClose}>
            {t(`cancel`)}
          </Button>
          <Button data-testid="confirm-modal" variant={`redFilled`} onClick={handleConfirm}>
            {t(`delete`)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
