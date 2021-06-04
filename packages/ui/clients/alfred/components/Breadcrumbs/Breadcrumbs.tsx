import React, { useMemo } from "react";
import MuiBreadcrumbs from "@material-ui/core/Breadcrumbs";
import { makeStyles } from "@material-ui/core/styles";
import startCase from "lodash/startCase";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import Typography from "@material-ui/core/Typography";
import get from "lodash/get";
import { kebabCase } from "lodash";
import { sidebarItemsMap } from "../../utils/consts";
import Link from "../Link";
import { NavItem as Item } from "../../src/types";

const createClasses = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary[600]
    },
    link: {
        "&:hover": {
            textDecoration: "underline"
        }
    }
}));

interface Props {
    pathname: string;
}

const Breadcrumbs = (props: Props) => {
    const { pathname } = props;

    const classes = createClasses();

    const breadcrumbs = useMemo(() => {
        if (pathname) {
            const linkPath = pathname.split("/");
            linkPath.shift();
            return linkPath.map((path, index) => {
                const text = index === 0 ? sidebarItemsMap[path]?.name : path;

                let href;

                if (index === 0) {
                    href = sidebarItemsMap[path]?.rootPath;
                } else {
                    const subItem = sidebarItemsMap[linkPath[0]]?.items?.find(
                        (sub: Item) =>
                            kebabCase(sub?.name).replace("&", "") ===
                            linkPath[1]
                    );
                    if (subItem?.path) {
                        href = subItem.path;
                    } else {
                        const innerItem = get(subItem, "subItems", []).find(
                            (sub: Item) =>
                                kebabCase(sub?.name).replace("&", "") ===
                                linkPath[2]
                        );
                        if (innerItem?.path) {
                            href = innerItem.path;
                        }
                    }
                }
                if (href === pathname) {
                    href = "";
                }
                return {
                    text,
                    href
                };
            });
        }
        return [];
    }, [pathname]);

    return (
        <MuiBreadcrumbs
            className={classes.root}
            separator={<ChevronRightRoundedIcon />}
            data-testid="breadcrumbsRoot"
        >
            {breadcrumbs.map((breadcrumb) => {
                const { href = "", text } = breadcrumb;
                const startCaseText = startCase(text);
                return href.length ? (
                    <Link key={`key_${text}`} href={href}>
                        <Typography className={classes.link} variant="body2">
                            {startCaseText}
                        </Typography>
                    </Link>
                ) : (
                    <Typography key={`key_${text}`} variant="body2">
                        {startCaseText}
                    </Typography>
                );
            })}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;
