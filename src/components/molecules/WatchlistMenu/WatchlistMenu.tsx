import { Menu, MenuButton, MenuItem, Text, IconButton, MenuList } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ThreeDotsIcon } from '@/components/atoms/ThreeDotsIcon/ThreeDotsIcon'
import { TrashIcon } from '@/components/atoms/TrashIcon/TrashIcon'
import { DeletePopup } from '@/components/atoms/DeletePopup/DeletePopup'
import { useState } from 'react'
import { useEffects } from '@/overmind'
import { useRouter } from 'next/navigation'
import { EditWatchlistPopup } from '@/components/atoms/EditWatchlistPopup/EditWatchlistPopup'
import { Watchlist } from '@/@types/Watchlist'

interface WatchlistMenuProps {
  watchlist: Watchlist
}

export const WatchlistMenu = (props: WatchlistMenuProps) => {
  const { watchlist } = props
  const { t } = useTranslation(`watchlist`)
  const router = useRouter()

  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false)
  const [showRenamePopup, setShowRenamePopup] = useState<boolean>(false)

  const { renameWatchlist, deleteWatchlist } = useEffects().watchlist

  const handleRename = () => {
    setShowRenamePopup(true)
  }

  const handleRenameConfirm = async (name: string, description: string) => {
    await renameWatchlist(watchlist.id, name, description)
    setShowRenamePopup(false)
    router.push(`/watchlist/view?id=${watchlist.id}`)
  }

  const handleRenameCancel = () => {
    setShowRenamePopup(false)
  }

  const handleDelete = () => {
    setShowDeletePopup(true)
  }

  const handleDeleteConfirm = () => {
    deleteWatchlist(watchlist.id)
    setShowDeletePopup(false)
    router.push(`/watchlist/all`)
  }

  const handleDeleteCancel = () => {
    setShowDeletePopup(false)
  }

  return (
    <>
      <Menu variant="menuWhite">
        <MenuButton alignSelf="end" as={IconButton} textAlign="center" icon={<ThreeDotsIcon w="32px" height="32px" />} variant="lightGrayRound32"></MenuButton>
        <MenuList>
          <MenuItem data-testid="watchlist-rename" onClick={handleRename} minH="48px">
            <Text flex={1} as="span">
              {t(`renameWatchlist`)}
            </Text>
          </MenuItem>
          <MenuItem data-testid="watchlist-delete" onClick={handleDelete} minH="48px">
            <Text color="red.400" flex={1} as="span">
              {t(`deleteWatchlist`)}
            </Text>
            <TrashIcon color={`red.400`} />
          </MenuItem>
        </MenuList>
      </Menu>
      <DeletePopup
        isOpen={showDeletePopup}
        title={t(`deleteWatchlistTitle`)}
        description={t(`deleteWatchlistText`)}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      <EditWatchlistPopup
        isOpen={showRenamePopup}
        title={t(`renameWatchlist`)}
        name={watchlist.name}
        description={watchlist.description}
        onCancel={handleRenameCancel}
        onConfirm={handleRenameConfirm}
      />
    </>
  )
}
