import React, {
    Dispatch,
    Fragment,
    KeyboardEvent,
    SetStateAction,
    memo,
    useCallback,
    useMemo,
    useState
} from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import Collapse from "@material-ui/core/Collapse";
import Hidden from "@material-ui/core/Hidden";
import { useTheme } from "@material-ui/core/styles";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";
import values from "lodash/values";
import reduce from "lodash/reduce";
import Grid from "@material-ui/core/Grid";
import { kebabCase } from "lodash";
import useRouter from "../../hooks/useRouter";

import Link from "../Link";
import createClasses from "./styles";
import { NavItem as Item } from "../../src/types";
import { sidebarItemsMap } from "../../utils/consts";

const listItems = values(sidebarItemsMap);

interface ListItemProps {
    name: string;
    Icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, "svg">>;
    items?: Array<Item>;
    rootPath?: string;
    open: string;
    setOpen: Dispatch<SetStateAction<string>>;
    innerOpen: string;
    setInnerOpen: Dispatch<SetStateAction<string>>;
}

const BaseListItem = (props: ListItemProps) => {
    const classes = createClasses();
    const {
        Icon: IconComponent,
        items,
        name,
        rootPath,
        open,
        setOpen,
        innerOpen,
        setInnerOpen
    } = props;

    const router = useRouter();

    // For the styles
    const { selected, subSelected, innerSelected } = useMemo(() => {
        if (!items) {
            return { selected: false, subSelected: "", innerSelected: "" };
        }
        const { sub, inner } = reduce(
            items,
            (acc, item) => {
                let { sub: curSub, inner: curInner } = acc;
                if (
                    router.pathname.includes(
                        kebabCase(item.name.replace("&", ""))
                    )
                ) {
                    curSub = item.name;
                    curInner =
                        item.subItems?.find(
                            (subItem) =>
                                subItem.path &&
                                router.pathname.includes(
                                    kebabCase(subItem.name)
                                )
                        )?.name || "";
                }
                return { sub: curSub, inner: curInner };
            },
            {
                sub: "",
                inner: ""
            }
        );
        if (sub) {
            return { selected: true, subSelected: sub, innerSelected: inner };
        }
        if (
            typeof rootPath === "string" &&
            rootPath.length > 0 &&
            router.pathname.includes(rootPath)
        ) {
            return { selected: true, subSelected: "", innerSelected: "" };
        }
        return { selected: false, subSelected: "", innerSelected: "" };
    }, [items, rootPath, router.pathname]);

    // Open menu
    const handleSetOpen = useCallback(() => {
        setOpen(open === name ? "" : name);
        setInnerOpen("");
    }, [name, open, setInnerOpen, setOpen]);

    const handleSetSubOpen = useCallback(
        (text: string) => () => {
            setInnerOpen(innerOpen === text ? "" : text);
        },
        [innerOpen, setInnerOpen]
    );

    // For accessibility
    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLLIElement>) => {
            switch (e.code) {
                case "Space":
                case "Enter":
                    e.preventDefault();
                    handleSetOpen();
                    break;
                default:
            }
        },
        [handleSetOpen]
    );

    const handleSubKeyDown = useCallback(
        (text: string) => (e: KeyboardEvent<HTMLLIElement>) => {
            switch (e.code) {
                case "Space":
                case "Enter":
                    e.preventDefault();
                    handleSetSubOpen(text)();
                    break;
                default:
            }
        },
        [handleSetSubOpen]
    );

    return items?.length && !rootPath ? (
        <Fragment key={name}>
            <MuiListItem
                component="li"
                data-testid={`li_${name}`}
                tabIndex={0}
                className={`${classes.listItem} ${
                    open ? classes.marginBottom2 : classes.marginBottom4
                } ${selected ? classes.listItemSelected : ""}`}
                onKeyDown={handleKeyDown}
                onClick={handleSetOpen}
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <IconComponent color="inherit" fontSize="inherit" />
                </ListItemIcon>
                <ListItemText id="listItemText" primary={name} />

                {open === name ? (
                    <ExpandMoreRoundedIcon id="listItemIcon" fontSize="small" />
                ) : (
                    <ChevronRightRoundedIcon
                        id="listItemIcon"
                        fontSize="small"
                    />
                )}
            </MuiListItem>

            <Collapse
                unmountOnExit
                component="ul"
                in={open === name}
                className={`${classes.marginBottom4} ${classes.padding0}`}
            >
                {items?.map((item) => {
                    const { name: innerName, path = "", subItems } = item;
                    return subItems?.length ? (
                        <Fragment key={innerName}>
                            <MuiListItem
                                data-testid={`li_${innerName}`}
                                component="li"
                                className={`${
                                    classes.innerListItemDropDownContainer
                                } ${
                                    innerOpen === innerName
                                        ? classes.marginBottom2
                                        : classes.marginBottom4
                                }`}
                                id="innerListItemDropDownContainer"
                                onKeyDown={handleSubKeyDown(innerName)}
                                onClick={handleSetSubOpen(innerName)}
                            >
                                <Grid
                                    container
                                    tabIndex={0}
                                    alignItems="center"
                                    className={`${classes.subListItem} ${
                                        subSelected === innerName
                                            ? classes.subListItemSelected
                                            : ""
                                    }`}
                                >
                                    <ListItemText
                                        primaryTypographyProps={{
                                            variant: "subtitle1"
                                        }}
                                        primary={innerName}
                                    />

                                    {innerOpen === innerName ? (
                                        <ExpandMoreRoundedIcon
                                            id="listItemIcon"
                                            fontSize="small"
                                        />
                                    ) : (
                                        <ChevronRightRoundedIcon
                                            id="listItemIcon"
                                            fontSize="small"
                                        />
                                    )}
                                </Grid>
                            </MuiListItem>
                            <Collapse
                                unmountOnExit
                                in={innerName === innerOpen}
                            >
                                {subItems.map((subItem) => {
                                    const { name: subName, path: subPath } =
                                        subItem;
                                    return (
                                        <MuiListItem
                                            id="innerListItem"
                                            key={subName}
                                            className={
                                                classes.innerListItemContainer
                                            }
                                        >
                                            <Link
                                                classes={{
                                                    root: `${
                                                        classes.subListItem
                                                    }
                                            ${
                                                innerSelected.length > 0 &&
                                                innerSelected === subName
                                                    ? classes.subListItemSelected
                                                    : ""
                                            }`
                                                }}
                                                href={subPath || ""}
                                            >
                                                <ListItemText
                                                    primary={subName}
                                                    primaryTypographyProps={{
                                                        variant: "subtitle1"
                                                    }}
                                                />
                                            </Link>
                                        </MuiListItem>
                                    );
                                })}
                            </Collapse>
                        </Fragment>
                    ) : (
                        <MuiListItem
                            id="innerListItem"
                            key={innerName}
                            className={classes.subListItemContainer}
                        >
                            <Link
                                classes={{
                                    root: `${classes.subListItem}
                                ${
                                    subSelected.length > 0 &&
                                    subSelected === innerName
                                        ? classes.subListItemSelected
                                        : ""
                                }`
                                }}
                                href={path}
                            >
                                <ListItemText
                                    primary={innerName}
                                    primaryTypographyProps={{
                                        variant: "subtitle1"
                                    }}
                                />
                            </Link>
                        </MuiListItem>
                    );
                })}
            </Collapse>
        </Fragment>
    ) : (
        <MuiListItem
            key={name}
            component="li"
            classes={{
                gutters: classes.padding0,
                root: `${classes.listItem} ${classes.marginBottom4} ${
                    selected ? classes.listItemSelected : ""
                }`
            }}
        >
            <Link
                href={rootPath || ""}
                classes={{ root: `${classes.listItem} ${classes.linkRoot}` }}
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <IconComponent fontSize="inherit" />
                </ListItemIcon>
                <ListItemText id="listItemText" primary={name} />
            </Link>
        </MuiListItem>
    );
};

BaseListItem.defaultProps = {
    items: [],
    rootPath: ""
};

const ListItem = memo(BaseListItem);

const Sidebar = () => {
    const classes = createClasses();
    const [open, setOpen] = useState("");
    const [innerOpen, setInnerOpen] = useState("");
    const theme = useTheme();
    const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));

    return (
        <Box position="relative">
            <Drawer
                variant="permanent"
                anchor="left"
                className={isLgDown ? classes.drawerClose : classes.drawerOpen}
                classes={{
                    paper: `${classes.drawerRoot} ${
                        isLgDown ? classes.drawerClose : classes.drawerOpen
                    }`
                }}
                ModalProps={{
                    disablePortal: true
                }}
            >
                <Box p={2.5} display="flex" alignItems="center">
                    <PeopleAltOutlinedIcon />
                    <Hidden lgDown>
                        <Typography>Logo</Typography>
                    </Hidden>
                </Box>
                <Divider
                    className={`${classes.dividerRoot} ${
                        isLgDown ? classes.dividerClosed : classes.dividerOpen
                    }`}
                />
                <List>
                    {listItems.map((item) => (
                        <ListItem
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...item}
                            key={`item_${item.name}`}
                            open={open}
                            setOpen={setOpen}
                            innerOpen={innerOpen}
                            setInnerOpen={setInnerOpen}
                        />
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
