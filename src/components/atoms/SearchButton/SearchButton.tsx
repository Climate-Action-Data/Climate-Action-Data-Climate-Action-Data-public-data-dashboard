import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@chakra-ui/next-js'
import { Flex } from '@chakra-ui/react'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'

interface SearchButtonProps {
  href: string
}

const SearchButton: FC<SearchButtonProps> = (props) => {
  const { href } = props
  const { t } = useTranslation(`search`)
  return (
    <Link
      as={`button`}
      variant={`accentPrimary32`}
      padding={`8px 16px`}
      width={`min-content`}
      _hover={{ backgroundColor: `#24BD63` }}
      _active={{ backgroundColor: `#1B8E4A` }}
      href={href}
      fontSize={`16px`}
      fontWeight={`medium`}
    >
      <Flex alignItems={`center`}>
        {t(`search`)}
        <SearchIcon width={`16px`} height={`16px`} marginLeft={`4px`} />
      </Flex>
    </Link>
  )
}
export default SearchButton
