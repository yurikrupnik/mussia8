import { makeStyles } from "@material-ui/core/styles";

const createClasses = makeStyles((theme) => ({
    root: {
        ...theme.typography.caption2,
        color: theme.palette.common.white,
        width: "fit-content",
        borderRadius: theme.spacing(0.25),
        padding: theme.spacing(0, 1)
    },
    http: {
        backgroundColor: theme.palette.specialColors[6]
    },
    https: {
        backgroundColor: theme.palette.specialColors[7]
    },
    ssh: {
        backgroundColor: theme.palette.specialColors[3]
    },
    vnc: {
        backgroundColor: theme.palette.specialColors[8]
    },
    sdp: {
        backgroundColor: theme.palette.specialColors[5]
    },
    rdp: {
        backgroundColor: theme.palette.specialColors[1]
    }
}));

export default createClasses;
