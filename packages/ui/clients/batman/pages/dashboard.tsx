import React, { useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import useSwr from "swr";
import TableProgressbar from "../components/TableProgressbar/TableProgressbar";
import ApplicationStatus from "../components/ApplicationStatus/ApplicationStatus";
import CompanyStatus from "../components/CompanyStatus/CompanyStatus";
import { POCStauses } from "../src/types";
import useRouter from "../hooks/useRouter";

function fetcher(url: string) {
    return fetch(url).then((r) => r.json());
}
const dashbaord = () => {
    const router = useRouter();
    const { data } = useSwr(
        "https://aris-8jo9nv6l.ew.gateway.dev/billing",
        fetcher
    );
    console.log("data", data); // eslint-disable-line
    const clickHandler = useCallback(
        () => router.push(`accounts/account`),
        [router]
    );

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>Dashbaord</Grid>
            <Grid container item spacing={2}>
                <Grid item>
                    <TableProgressbar current={5} total={10} />
                </Grid>
                <Grid item>
                    <TableProgressbar current={2} total={3} />
                </Grid>
                <Grid item>
                    <TableProgressbar current={18} total={100} />
                </Grid>
                <Grid item>
                    <TableProgressbar current={78} total={1150} />
                </Grid>
                <Grid item>
                    <TableProgressbar current={1000} total={1150} />
                </Grid>
            </Grid>
            <Grid item container direction="column" spacing={2}>
                <Grid container item spacing={2}>
                    <Grid item>
                        <Button color="primary" endIcon={<SearchIcon />}>
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" startIcon={<SearchIcon />}>
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary">Button Text</Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary">
                            <SearchIcon />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            startIcon={<SearchIcon />}
                            disabled
                        >
                            Button Text
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item spacing={2}>
                    <Grid item>
                        <Button
                            color="primary"
                            endIcon={<SearchIcon />}
                            size="small"
                        >
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            startIcon={<SearchIcon />}
                            size="small"
                        >
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" size="small">
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" size="small">
                            <SearchIcon />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            startIcon={<SearchIcon />}
                            size="small"
                            disabled
                        >
                            Button Text
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item spacing={2}>
                    <Grid item>
                        <Button
                            color="secondary"
                            endIcon={<SearchIcon />}
                            size="small"
                        >
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            startIcon={<SearchIcon />}
                            size="small"
                        >
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="secondary" size="small">
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="secondary" size="small">
                            <SearchIcon />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            startIcon={<SearchIcon />}
                            size="small"
                            disabled
                        >
                            Button Text
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item spacing={2}>
                    <Grid item>
                        <Button color="secondary" endIcon={<SearchIcon />}>
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="secondary" startIcon={<SearchIcon />}>
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="secondary">Button Text</Button>
                    </Grid>
                    <Grid item>
                        <Button color="secondary">
                            <SearchIcon />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            startIcon={<SearchIcon />}
                            disabled
                        >
                            Button Text
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item spacing={2}>
                    <Grid item>
                        <Button
                            color="primary"
                            variant="text"
                            endIcon={<SearchIcon />}
                        >
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            variant="text"
                            startIcon={<SearchIcon />}
                        >
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="text">
                            Button Text
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="text">
                            <SearchIcon />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            variant="text"
                            startIcon={<SearchIcon />}
                            disabled
                        >
                            Button Text
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item direction="column">
                <Grid item>
                    Press this button to go to accounts and check the
                    breadcrumbs
                </Grid>
                <button type="button" onClick={clickHandler}>
                    Click me!
                </button>
            </Grid>
            <Grid container item spacing={2}>
                <Grid item>
                    <CompanyStatus status="Active" />
                </Grid>
                <Grid item>
                    <CompanyStatus status="Active" poc={POCStauses.WON_POC} />
                </Grid>
                <Grid item>
                    <CompanyStatus status="Cancelled" />
                </Grid>
                <Grid item>
                    <CompanyStatus
                        status="Cancelled"
                        poc={POCStauses.LOST_POC}
                    />
                </Grid>
                <Grid item>
                    <CompanyStatus status="Non Renewing" />
                </Grid>
                <Grid item>
                    <CompanyStatus
                        status="Non Renewing"
                        poc={POCStauses.CURRENTLY_POC}
                    />
                </Grid>
                <Grid item>
                    <CompanyStatus status="No status" />
                </Grid>
            </Grid>
            <Grid container item spacing={2}>
                <Grid item>
                    <ApplicationStatus status="http" />
                </Grid>
                <Grid item>
                    <ApplicationStatus status="https" />
                </Grid>
                <Grid item>
                    <ApplicationStatus status="ssh" />
                </Grid>
                <Grid item>
                    <ApplicationStatus status="vnc" />
                </Grid>
                <Grid item>
                    <ApplicationStatus status="sdp" />
                </Grid>
                <Grid item>
                    <ApplicationStatus status="rdp" />
                </Grid>
            </Grid>
            <Grid container item>
                <Box
                    height={600}
                    width={100}
                    display="flex"
                    alignItems="center"
                >
                    Height testing
                </Box>
            </Grid>
        </Grid>
    );
};

export default dashbaord;
