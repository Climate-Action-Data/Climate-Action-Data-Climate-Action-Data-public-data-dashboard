import { Text, useToast, Flex, IconButton } from '@chakra-ui/react'
import { ReactElement, useEffect, useState } from 'react'
import { CloseIcon } from '../CloseIcon/CloseIcon'
import { ToastVariants } from '@/@types/Toast'

interface ToastProps {
  message: string
  icon: ReactElement
  variant: ToastVariants
}

export function useToastHook() {
  const [state, setState] = useState<ToastProps | undefined>(undefined)
  const toast = useToast()
  const newToast = (toastProps: ToastProps) => {
    setState(toastProps)
  }
  useEffect(() => {
    if (state) {
      const { message, icon, variant } = state

      toast({
        position: `top`,
        duration: 5000,
        isClosable: true,
        variant: variant,
        render: ({ onClose }) => (
          <Flex className={`toast ${variant}`} gap="8px" borderRadius="4px" border="1px solid" padding="12px" alignItems="center" minH="48px" w="400px" zIndex={999}>
            {icon}
            <Text fontSize="lg">{message}</Text>
            <IconButton variant="toastButton" aria-label="Close" ml="auto" icon={<CloseIcon width="24px" height="24px" />} onClick={onClose} />
          </Flex>
        ),
      })

      setState(undefined)
    }
  }, [state, toast])
  return [newToast]
}
