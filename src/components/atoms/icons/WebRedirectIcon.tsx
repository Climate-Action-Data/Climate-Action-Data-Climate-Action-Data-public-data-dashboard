import { FC } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const WebRedirectIcon: FC<IconProps> = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" width={props?.width ?? `24px`} height={props?.height ?? `24px`} {...props}>
    <path
      fill="currentColor"
      d="M10.0635 19.7231C9.68014 19.1346 9.33912 18.4949 9.0404 17.8038C8.74167 17.1128 8.50128 16.4025 8.31922 15.673H4.92688C5.46151 16.7179 6.16344 17.5888 7.03268 18.2856C7.90193 18.9824 8.91219 19.4615 10.0635 19.7231ZM4.29805 14.1731H8.01538C7.95256 13.8013 7.90705 13.4369 7.87885 13.0798C7.85065 12.7227 7.83655 12.3628 7.83655 12C7.83655 11.6372 7.85065 11.2772 7.87885 10.9202C7.90705 10.5631 7.95256 10.1987 8.01538 9.82688H4.29805C4.2019 10.1666 4.12818 10.5198 4.0769 10.8865C4.02562 11.2532 3.99998 11.6243 3.99998 12C3.99998 12.3756 4.02562 12.7468 4.0769 13.1135C4.12818 13.4801 4.2019 13.8333 4.29805 14.1731ZM4.92688 8.32693H8.31922C8.48846 7.59103 8.72564 6.87275 9.03078 6.1721C9.33591 5.47145 9.68014 4.83971 10.0635 4.27687C8.94424 4.52559 7.94038 5.00316 7.0519 5.70958C6.16343 6.41599 5.45509 7.28844 4.92688 8.32693ZM9.85958 8.32693H14.1404C13.9211 7.51026 13.6372 6.75769 13.2885 6.06922C12.9397 5.38076 12.5102 4.69806 12 4.02113C11.4897 4.67241 11.0634 5.34228 10.7211 6.03075C10.3788 6.71922 10.0916 7.48461 9.85958 8.32693ZM15.6807 8.32693H19.0731C18.5449 7.28844 17.8365 6.41439 16.9481 5.70477C16.0596 4.99516 15.0557 4.51919 13.9365 4.27687C14.2878 4.83329 14.616 5.46183 14.9211 6.16248C15.2262 6.86313 15.4794 7.58461 15.6807 8.32693ZM12 21.5C10.6974 21.5 9.46825 21.2503 8.3125 20.7509C7.15673 20.2516 6.14872 19.5718 5.28845 18.7115C4.4282 17.8512 3.7484 16.8432 3.24905 15.6875C2.74968 14.5317 2.5 13.3025 2.5 12C2.5 10.6872 2.74968 9.45543 3.24905 8.3048C3.7484 7.15417 4.4282 6.14872 5.28845 5.28845C6.14872 4.4282 7.15673 3.7484 8.3125 3.24905C9.46825 2.74968 10.6974 2.5 12 2.5C13.3128 2.5 14.5445 2.74968 15.6952 3.24905C16.8458 3.7484 17.8512 4.4282 18.7115 5.28845C19.5718 6.14872 20.2516 7.15417 20.7509 8.3048C21.2503 9.45543 21.5 10.6872 21.5 12C21.5 12.1731 21.4958 12.3493 21.4875 12.5288C21.4791 12.7083 21.4634 12.8846 21.4403 13.0577H19.9154C19.9487 12.8846 19.9711 12.7109 19.9827 12.5365C19.9942 12.3622 20 12.1833 20 12C20 11.6243 19.9743 11.2532 19.9231 10.8865C19.8718 10.5198 19.7981 10.1666 19.7019 9.82688H15.9846C16.0474 10.1987 16.0929 10.5631 16.1211 10.9202C16.1493 11.2772 16.1634 11.6372 16.1634 12C16.1634 12.1833 16.1618 12.3605 16.1586 12.5317C16.1554 12.7029 16.1455 12.8782 16.1288 13.0577H14.6288C14.6455 12.8846 14.6554 12.7109 14.6587 12.5365C14.6618 12.3622 14.6635 12.1833 14.6635 12C14.6635 11.6243 14.6494 11.2612 14.6212 10.9106C14.5929 10.5599 14.5474 10.1987 14.4846 9.82688H9.51535C9.45253 10.1987 9.40702 10.5599 9.3788 10.9106C9.3506 11.2612 9.3365 11.6243 9.3365 12C9.3365 12.3756 9.3506 12.7388 9.3788 13.0894C9.40702 13.4401 9.45253 13.8013 9.51535 14.1731H13.0577V15.673H9.85958C10.0916 16.5089 10.3836 17.2791 10.7356 17.9836C11.0875 18.6881 11.5089 19.3532 12 19.9788C12.1961 19.7186 12.3807 19.4526 12.5538 19.1808C12.7269 18.909 12.8949 18.6314 13.0577 18.3481V21.4403C12.8846 21.4634 12.7109 21.4791 12.5365 21.4875C12.3622 21.4958 12.1833 21.5 12 21.5ZM16.75 17.8192V19.65C16.75 19.8628 16.6782 20.041 16.5346 20.1846C16.391 20.3282 16.2128 20.4 16 20.4C15.7872 20.4 15.609 20.3282 15.4654 20.1846C15.3218 20.041 15.25 19.8628 15.25 19.65V16.1538C15.25 15.8961 15.3362 15.6811 15.5087 15.5086C15.6811 15.3362 15.8961 15.25 16.1538 15.25H19.65C19.8628 15.25 20.041 15.3218 20.1846 15.4654C20.3282 15.609 20.4 15.7872 20.4 16C20.4 16.2128 20.3282 16.391 20.1846 16.5346C20.041 16.6782 19.8628 16.75 19.65 16.75H17.7942L20.4769 19.4231C20.6153 19.5615 20.6846 19.7346 20.6846 19.9423C20.6846 20.15 20.6153 20.3282 20.4769 20.4769C20.3282 20.632 20.15 20.708 19.9423 20.7048C19.7346 20.7016 19.5564 20.6256 19.4077 20.4769L16.75 17.8192Z"
    />
  </Icon>
)
