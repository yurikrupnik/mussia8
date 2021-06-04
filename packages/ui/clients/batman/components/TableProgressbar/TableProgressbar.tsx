import React, { useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import createClasses from "./styles";

interface Props {
    current: number;
    total: number;
}

const TableProgressbar = (props: Props) => {
    const { current, total } = props;
    const classes = createClasses();
    const value = useMemo(() => (current / total) * 100, [current, total]);
    return (
        <Grid container direction="column" data-testid="tableProgressbarRoot">
            <Grid container item className={classes.textRoot}>
                <Typography className={classes.current}>
                    {current}&nbsp;
                </Typography>
                <Typography className={classes.total}>
                    {`/ ${total}`}
                </Typography>
            </Grid>
            <LinearProgress
                variant="determinate"
                value={value}
                classes={{
                    root: classes.linearProgressRoot,
                    bar1Determinate: classes.bar1Determinate
                }}
            />
        </Grid>
    );
};

export default TableProgressbar;
