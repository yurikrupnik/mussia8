import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Breadcrumbs from "../Breadcrumbs";
import { drawerWidthClose, drawerWidthOpen } from "../../utils/consts";
import useRouter from "../../hooks/useRouter";

const createClasses = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        borderBottom: `1px solid ${theme.palette.primary[0]}`,
        width: `calc(100% - ${drawerWidthOpen})`,
        marginLeft: `${drawerWidthOpen}`,
        [theme.breakpoints.down("lg")]: {
            width: `calc(100% - ${drawerWidthClose})`,
            marginLeft: `${drawerWidthClose}`
        }
    },
    toolBarRoot: {
        padding: theme.spacing(2, 4)
    }
}));

const Header = () => {
    const classes = createClasses();
    const router = useRouter();
    return (
        <AppBar elevation={0} position="static" className={classes.root}>
            <Toolbar className={classes.toolBarRoot}>
                <Breadcrumbs pathname={router.pathname} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
