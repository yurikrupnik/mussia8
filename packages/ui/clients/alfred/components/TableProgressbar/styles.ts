import { makeStyles } from "@material-ui/core/styles";

const createClasses = makeStyles((theme) => ({
    linearProgressRoot: {
        backgroundColor: theme.palette.primary[0],
        borderRadius: "1px",
        height: "3px",
        width: "60px"
    },
    bar1Determinate: {
        backgroundColor: theme.palette.info.main
    },
    textRoot: {
        marginBottom: "4px"
    },
    total: {
        ...theme.typography.caption2,
        color: theme.palette.grey[500]
    },
    current: {
        ...theme.typography.caption2,
        color: theme.palette.primary[600]
    }
}));

export default createClasses;
