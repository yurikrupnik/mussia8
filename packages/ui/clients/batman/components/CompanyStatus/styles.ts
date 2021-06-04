import { makeStyles } from "@material-ui/core/styles";

const createClasses = makeStyles((theme) => ({
    main: {
        ...theme.typography.caption1,
        borderRadius: theme.spacing(0.5),
        width: "fit-content",
        padding: theme.spacing(0, 1)
    },
    active: {
        backgroundColor: theme.palette.success[0],
        color: theme.palette.success.main
    },
    cancelled: {
        backgroundColor: theme.palette.error[0],
        color: theme.palette.error.main
    },
    nonRenewing: {
        backgroundColor: theme.palette.info[0],
        color: theme.palette.info.main
    },
    noStatus: {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey.main
    }
}));

export default createClasses;
