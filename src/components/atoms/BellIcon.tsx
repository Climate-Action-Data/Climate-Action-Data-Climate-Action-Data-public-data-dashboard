import { Icon, StyleProps } from "@chakra-ui/react";

export type BellIconProps = StyleProps


export const BellIcon = (props: BellIconProps) => (
    <Icon viewBox="0 0 24 24" width={(props?.width) ?? "24px"} height={(props?.height) ?? "24px"}  {...props}>
        <path fill="currentColor" d="M4.99997 18.6826C4.78747 18.6826 4.60936 18.6107 4.46563 18.4669C4.32188 18.3231 4.25 18.1449 4.25 17.9323C4.25 17.7197 4.32188 17.5417 4.46563 17.3981C4.60936 17.2545 4.78747 17.1827 4.99997 17.1827H6.25V9.93268C6.25 8.60063 6.66667 7.40672 7.5 6.35095C8.33333 5.29518 9.41667 4.61987 10.75 4.325V3.625C10.75 3.27243 10.8702 2.97596 11.1106 2.73557C11.3509 2.49519 11.6474 2.375 12 2.375C12.3525 2.375 12.649 2.49519 12.8894 2.73557C13.1298 2.97596 13.25 3.27243 13.25 3.625V4.325C14.5833 4.61987 15.6666 5.29518 16.5 6.35095C17.3333 7.40672 17.75 8.60063 17.75 9.93268V17.1827H19C19.2125 17.1827 19.3906 17.2546 19.5344 17.3984C19.6781 17.5422 19.75 17.7204 19.75 17.933C19.75 18.1456 19.6781 18.3237 19.5344 18.4673C19.3906 18.6109 19.2125 18.6826 19 18.6826H4.99997ZM12 21.625C11.5077 21.625 11.0833 21.45 10.7269 21.1C10.3705 20.75 10.1923 20.3224 10.1923 19.8173H13.8077C13.8077 20.3224 13.6327 20.75 13.2826 21.1C12.9326 21.45 12.5051 21.625 12 21.625ZM7.74995 17.1827H16.25V9.93268C16.25 8.76391 15.8337 7.76338 15.001 6.9311C14.1683 6.0988 13.1674 5.68265 11.9981 5.68265C10.8288 5.68265 9.82849 6.0988 8.99708 6.9311C8.16566 7.76338 7.74995 8.76391 7.74995 9.93268V17.1827Z" />
    </Icon>
)