import { fireEvent, render, screen } from '@testing-library/react'
import { MenuContent, MenuItemProps } from './MenuContent'
import { DownloadIcon } from '../DownloadIcon/DownloadIcon'
import { Menu, MenuButton } from '@chakra-ui/react'
import { BookmarkPlusIcon } from '../BookmarkPlusIcon/BookmarkPlusIcon'

const DEFAULT_BUTTON_TEST = `menu`
const DEFAULT_BUTTON_TEST_1 = `action 1`
const DEFAULT_BUTTON_TEST_2 = `action 2`
const DEFAULT_BUTTON_TEST_3 = `action 3`

describe(`MenuContent`, () => {
  const mockClick = jest.fn()
  const menuList: MenuItemProps[] = [
    { dataTestId: `view-project-details`, onClick: mockClick, text: DEFAULT_BUTTON_TEST_1 },
    { dataTestId: `export-project`, icon: <DownloadIcon />, text: DEFAULT_BUTTON_TEST_2 },
    {
      dataTestId: `add-from-watchlist`,
      text: DEFAULT_BUTTON_TEST_3,
      icon: <BookmarkPlusIcon />,
      onClick: mockClick,
    },
  ]

  it(`should render successfully with empty array`, () => {
    const { baseElement } = render(
      <Menu>
        <MenuButton>{DEFAULT_BUTTON_TEST}</MenuButton>
        <MenuContent menuItems={[]} />
      </Menu>,
    )
    expect(baseElement).toMatchSnapshot()
  })

  it(`should render successfully with array`, () => {
    const { baseElement } = render(
      <Menu>
        <MenuButton>{DEFAULT_BUTTON_TEST}</MenuButton>
        <MenuContent menuItems={menuList} />
      </Menu>,
    )
    expect(baseElement).toMatchSnapshot()
  })

  it(`should render successfully with array and handle click`, () => {
    const { baseElement } = render(
      <Menu>
        <MenuButton>{DEFAULT_BUTTON_TEST}</MenuButton>
        <MenuContent menuItems={menuList} />
      </Menu>,
    )
    const button = screen.getByTestId(`view-project-details`)
    fireEvent.click(button)
    expect(mockClick).toHaveBeenCalled()
    expect(baseElement).toMatchSnapshot()
  })
})
