import Grid from "@material-ui/core/Grid";
import React, { useCallback } from "react";
import useRouter from "../../hooks/useRouter";

// This page is created now only for breadcrumbs checking!
const Accounts = () => {
    const router = useRouter();

    const clickHandler = useCallback(
        () => router.push(`${router.pathname}/account`),
        [router]
    );

    return (
        <Grid container direction="column">
            <Grid item>
                Press this button to go to accounts and check the breadcrumbs
            </Grid>
            <button type="button" onClick={clickHandler}>
                Click me!
            </button>
        </Grid>
    );
};

export default Accounts;
