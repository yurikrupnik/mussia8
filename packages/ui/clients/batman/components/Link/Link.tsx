import React, { FC, ReactNode } from "react";
import NextLink from "next/link";

interface Props {
    href: string;
    classes?: {
        root?: string;
    };
    children: ReactNode;
}

const Link: FC<Props> = (props: Props) => {
    const { href, classes, children } = props;
    return (
        <NextLink href={href}>
            <a href={href} className={classes?.root}>
                {children}
            </a>
        </NextLink>
    );
};

Link.defaultProps = {
    classes: {
        root: ""
    }
};

export default Link;
