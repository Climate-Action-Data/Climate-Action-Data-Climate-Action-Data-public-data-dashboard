import { Text, TextProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

export type ImportantTextProps = TextProps


export const ImportantText = ({ props, children }: { props?: ImportantTextProps, children: ReactNode }): React.JSX.Element => {
    const actualProps = {
        ...props,
        fontWeight: (props?.fontWeight) ?? `500`,
        fontSize: (props?.fontSize) ?? `40px`,
        color: (props?.color) ?? `green.600`,
    }

    return <Text {...actualProps}>
        {children}
    </Text>
}