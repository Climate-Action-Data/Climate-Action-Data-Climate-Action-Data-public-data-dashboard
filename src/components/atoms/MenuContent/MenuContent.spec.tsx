import { fireEvent, render, screen } from '@testing-library/react'
import { MenuContent, MenuItemProps } from './MenuContent'
import { DownloadIcon } from '../DownloadIcon/DownloadIcon'
import { Menu, MenuButton } from '@chakra-ui/react'

const DEFAULT_BUTTON_TEST = `menu`
const DEFAULT_BUTTON_TEST_1 = `action 1`
const DEFAULT_BUTTON_TEST_2 = `action 2`

describe(`MenuContent`, () => {
  const mockClick = jest.fn()
  const menuList: MenuItemProps[] = [
    { dataTestId: `view-project-details`, onClick: mockClick, text: DEFAULT_BUTTON_TEST_1 },
    { dataTestId: `export-project`, icon: <DownloadIcon />, text: DEFAULT_BUTTON_TEST_2 },
  ]

  it(`should render successfully with empty array`, () => {
    const { baseElement } = render(
      <Menu>
        <MenuButton>{DEFAULT_BUTTON_TEST}</MenuButton>
        <MenuContent menuItems={[]} />
      </Menu>,
    )
    expect(baseElement).toBeTruthy()
  })

  it(`should render successfully with array`, () => {
    const { baseElement } = render(
      <Menu>
        <MenuButton>{DEFAULT_BUTTON_TEST}</MenuButton>
        <MenuContent menuItems={menuList} />
      </Menu>,
    )
    expect(baseElement).toBeTruthy()
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
    expect(baseElement).toBeTruthy()
  })
})
