import React, { useMemo } from "react";
import Typography from "@material-ui/core/Typography";
import createClasses from "./styles";
import { ApplicationStatus as ApplicationStatusEnum } from "../../src/types";

interface Props {
    status: ApplicationStatusEnum;
}

const ApplicationStatus = (props: Props) => {
    const { status } = props;
    const content = useMemo(() => status.toUpperCase(), [status]);
    const classes = createClasses();
    return (
        <Typography className={`${classes.root} ${classes[status]}`}>
            {content}
        </Typography>
    );
};

export default ApplicationStatus;
