import { act, renderHook } from '@testing-library/react'
import { useToastHook } from './Toast'
import { ToastVariants } from '@/@types/Toast'

// Manually create a mock for useToast
const toastMock = jest.fn()
jest.mock(`@chakra-ui/react`, () => ({
  __esModule: true,
  useToast: () => toastMock,
}))

describe(`useToastHook`, () => {
  it(`should call useToast with correct arguments`, () => {
    const { result } = renderHook(() => useToastHook())
    const [newToast] = result.current

    const toastProps = {
      message: `Test message`,
      icon: <div>Test icon</div>,
      variant: ToastVariants.SUCCESS,
    }

    act(() => {
      newToast(toastProps)
    })

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        position: `top`,
        duration: 5000,
        isClosable: true,
        variant: toastProps.variant,
        render: expect.any(Function),
      }),
    )
  })
})
