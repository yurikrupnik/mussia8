import { makeStyles } from "@material-ui/core/styles";
import { drawerWidthClose, drawerWidthOpen } from "../../utils/consts";

const createClasses = makeStyles((theme) => ({
    drawerRoot: {
        backgroundColor: theme.palette.primary[700],
        backgroundImage: theme.palette.background.sidebar,
        color: theme.palette.common.white,
        border: "none",
        "& a": {
            textDecoration: "none"
        }
    },
    drawer: {
        width: drawerWidthOpen,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: drawerWidthOpen,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        position: "absolute",
        top: 0,
        bottom: 0,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: drawerWidthClose,
        "&:hover": {
            width: drawerWidthOpen,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
            "& #listItemText, #listItemIcon, #innerListItem, #innerListItemDropDownContainer":
                {
                    display: "flex"
                }
        },
        "& #listItemText, #listItemIcon, #innerListItem, #innerListItemDropDownContainer":
            {
                display: "none"
            }
    },
    dividerRoot: {
        backgroundColor: theme.palette.primary[600],
        alignSelf: "center"
    },
    dividerOpen: {
        width: "200px"
    },
    dividerClosed: {
        width: "32px"
    },
    padding0: {
        padding: "0 !important"
    },
    listItem: {
        ...theme.typography.interactive1,
        cursor: "pointer",
        minHeight: "48px",
        paddingLeft: theme.spacing(3),
        color: theme.palette.common.white,

        "&:hover": {
            color: theme.palette.primary[200]
        },

        "&:focus": {
            color: theme.palette.primary[200]
        }
    },
    listItemSelected: {
        color: theme.palette.primary[200],
        "&:before": {
            borderRight: `${theme.spacing(0.5)}px solid ${
                theme.palette.primary[200]
            }`,
            borderRadius: theme.spacing(0.5),
            content: "''",
            position: "absolute",
            height: "100%",
            width: theme.spacing(0.5),
            left: "-1px"
        }
    },
    subListItemContainer: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(1)
    },
    subListItem: {
        ...theme.typography.subtitle1,
        cursor: "pointer",
        width: "100%",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(1),
        borderRadius: theme.spacing(0.5),
        "&:hover": {
            backgroundColor: theme.palette.primary[600]
        },
        "&:focus": {
            backgroundColor: theme.palette.primary[600]
        }
    },
    subListItemSelected: {
        backgroundColor: theme.palette.primary[600]
    },
    innerListItemDropDownContainer: {
        ...theme.typography.subtitle1,
        cursor: "pointer",
        padding: theme.spacing(1, 1, 1, 3)
    },
    innerListItemContainer: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(1)
    },
    listItemIcon: {
        minWidth: 0,
        width: theme.spacing(3),
        paddingRight: theme.spacing(1),
        color: "inherit"
    },
    linkRoot: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1, 2, 1, 3),
        width: "100%"
    },
    marginBottom2: {
        marginBottom: theme.spacing(0.25)
    },
    marginBottom4: {
        marginBottom: theme.spacing(0.5)
    }
}));

export default createClasses;
