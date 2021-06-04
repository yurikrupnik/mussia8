import React, { useMemo } from "react";
import get from "lodash/get";
import reduce from "lodash/reduce";
import Typography from "@material-ui/core/Typography";

import camelCase from "lodash/camelCase";
import { CompanyStatusCode, POCStauses } from "../../src/types";

import createClasses from "./styles";

interface Props {
    status: CompanyStatusCode;
    poc?: POCStauses;
}

const CompanyStatus = (props: Props) => {
    const { status, poc } = props;
    const classes = createClasses();

    // For type check
    const style = useMemo(
        () => get(classes, camelCase(status), ""),
        [classes, status]
    );

    const content = useMemo(() => {
        const pocLabel = reduce(
            POCStauses,
            (acc, value) => {
                if (!poc) {
                    return "";
                }
                if (poc === POCStauses.CURRENTLY_POC) {
                    return POCStauses.WON_POC;
                }
                if (poc === value) {
                    return value;
                }
                return acc;
            },
            ""
        );

        return `${status}${pocLabel ? ` - ${pocLabel}` : ""}`;
    }, [status, poc]);

    return (
        <Typography component="span" className={`${classes.main} ${style}`}>
            {content}
        </Typography>
    );
};

CompanyStatus.defaultProps = {
    poc: ""
};

export default CompanyStatus;
