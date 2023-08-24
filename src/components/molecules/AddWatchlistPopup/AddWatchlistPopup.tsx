import { Flex, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Input, InputGroup, InputLeftElement, VStack, Divider } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CloseIcon } from '@/components/atoms/CloseIcon/CloseIcon'
import { useActions } from '@/overmind'
import { Watchlist } from '@/@types/Watchlist'
import { useTranslation } from 'react-i18next'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { PlusIcon } from '@/components/atoms/PlusIcon/PlusIcon'
import { EditWatchlistPopup } from '@/components/atoms/EditWatchlistPopup/EditWatchlistPopup'
import { WatchlistCheckbox } from '@/components/atoms/WatchlistCheckbox/WatchlistCheckbox'

interface AddWatchlistPopupProps {
  warehouseProjectId: string
  onModalClose?: () => void
  isOpen: boolean
}

export const AddWatchlistPopup = (props: AddWatchlistPopupProps) => {
  const { getAllWatchlist, createOneWatchlist, addProjectToWatchlist } = useActions().watchlist
  const { t } = useTranslation(`watchlist`)
  const { onModalClose, isOpen, warehouseProjectId } = props
  const [watchlists, setWatchlists] = useState<Watchlist[] | undefined>(undefined)
  const [visibleWatchlists, setVisibleWatchlists] = useState<Watchlist[] | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false)
  const [searchWatchlist, setSearchWatchlist] = useState<string>(``)

  useEffect(() => {
    getAllWatchlist()
      .then((result) => {
        if (result.data) {
          result.data.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          })
          setWatchlists(result.data)
          setVisibleWatchlists(result.data)
        }
      })
      .catch(() => undefined)

    if (!isModalOpen) {
      setIsModalOpen(isOpen)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsModalOpen(false)
    onModalClose?.()
  }

  const handleNewWatchlist = () => {
    setShowCreatePopup(true)
    setIsModalOpen(false)
  }

  const handleCreateConfirm = async (name: string, description: string) => {
    const watchlist = await createOneWatchlist({ name, description })
    if (watchlist?.data?.id) {
      try {
        await addProjectToWatchlist({ warehouseProjectId, watchlistId: watchlist.data.id })
      } catch (error) {}
    }
    setShowCreatePopup(false)
    onModalClose?.()
  }

  const handleCreateCancel = () => {
    setIsModalOpen(true)
    setShowCreatePopup(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === ``) {
      setVisibleWatchlists(watchlists)
    } else {
      setVisibleWatchlists(
        watchlists?.filter((watchlist) => {
          return watchlist.name.toLowerCase().includes(value.toLowerCase())
        }),
      )
    }
    setSearchWatchlist(value)
  }

  return (
    <>
      <Modal onClose={handleClose} size={`md`} isOpen={isModalOpen}>
        <ModalOverlay />
        <ModalContent justifyContent="space-between" minH="500px">
          <Flex padding="16px" flexDirection="column" boxShadow="2px 2px 8px 0px #0000001A" alignItems="end">
            <CloseIcon data-testid="close-add-watchlist-modal" _hover={{ cursor: `pointer` }} marginRight="0.5rem" onClick={handleClose} />
            <Flex width="100%" padding="4px">
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
                  <SearchIcon />
                </InputLeftElement>
                <Input data-testid="search-add-watchlist-modal" value={searchWatchlist} onChange={handleInputChange} variant="underlined" placeholder="Search" />
              </InputGroup>
            </Flex>
          </Flex>
          <ModalBody paddingX={0} maxH="300px" overflowY="scroll">
            <VStack divider={<Divider />} spacing="8px" alignItems="start">
              <WatchlistCheckbox watchlists={visibleWatchlists} warehouseProjectId={warehouseProjectId} />
            </VStack>
          </ModalBody>
          <ModalFooter boxShadow="2px 2px 8px 0px #0000001A" gap="48px" justifyContent="center">
            <Button fontWeight="500" rightIcon={<PlusIcon width="16px" height="16px" />} data-testid="search-add-create-modal" variant={`hoverOnly`} onClick={handleNewWatchlist}>
              {t(`newWatchlist`)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <EditWatchlistPopup isOpen={showCreatePopup} isNewWatchlist={true} title={t(`newWatchlist`)} onCancel={handleCreateCancel} onConfirm={handleCreateConfirm} />
    </>
  )
}
