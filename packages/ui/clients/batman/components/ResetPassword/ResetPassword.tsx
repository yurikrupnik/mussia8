import React from "react";
// import { Field, Form, Formik } from "formik";
// import * as Yup from "yup";

import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";

// import { useToggle } from "react-use";

// import styles from "./resetPasswordStyles";

// import FormField from "../FormField";
// import DialogPasswordInfo from "../../components/uiComponents/DialogPasswordInfo";
// import { Context } from "../../api/auth/context";

const logo =
    "https://res.cloudinary.com/amadeus7/image/upload/v1589968085/react-platform/logoOnboarding.svg";

// const validationSchema = Yup.object().shape({
//     password: Yup.string().required("Password is required")
//     // verifyPassword: Yup.string().when("password", {
//     //     is: (val) => !!(val && val.length > 0),
//     //     then: Yup.string().oneOf([Yup.ref("password")], "Passwords don’t match"),
//     // }),
// });

const ResetPassword = () => {
    // const classes = styles();
    // const { match } = props;
    // const { params } = match;
    // const { token } = params;
    // const auth = useContext(Context);
    // const [openInfo, setOpenInfo] = useToggle(false);

    console.log("a"); // eslint-disable-line
    // const [infoDialogData, setInfoDialogData] = useState({});
    //
    // // eslint-disable-next-line no-unused-vars
    // const handleLinkExpired = useCallback(() => {
    //     setOpenInfo();
    //     setInfoDialogData({
    //         title: "Sorry",
    //         contentText: "Your password reset link has expired. Please request another one",
    //         link: "",
    //         image: "https://res.cloudinary.com/amadeus7/image/upload/v1595401067/react-platform/No_data-rafiki.svg",
    //     });
    // }, [openInfo]);
    //
    // const handleOpenSuccess = useCallback(() => {
    //     setOpenInfo();
    //     setInfoDialogData({
    //         title: "Congratulations",
    //         contentText: "Your password has been successfully changed",
    //         link: "",
    //         image: "https://res.cloudinary.com/amadeus7/image/upload/v1595401046/react-platform/Air_Support-rafiki.svg",
    //         okBtn: "Go to login",
    //     });
    // }, [openInfo]);
    //
    // const handleOpenFail = useCallback(() => {
    //     setOpenInfo();
    //     setInfoDialogData({
    //         title: "Sorry...",
    //         contentText:
    //             "An error occured while attempting to reset your password.  Please try again later or contact our customer service.",
    //         link: "support@roundtrip.co.il",
    //         image: "https://res.cloudinary.com/amadeus7/image/upload/v1595401067/react-platform/No_data-rafiki.svg",
    //     });
    // }, [openInfo]);

    return (
        <Grid
            container
            item
            xs={12}
            direction="row"
            justify="center"
            alignItems="center"
        >
            {/*{openInfo && <DialogPasswordInfo open={openInfo} data={infoDialogData} toggleOpen={setOpenInfo} />}*/}
            <Grid item xs={12}>
                <img src={logo} alt="logo" />
            </Grid>
            <Grid
                container
                item
                xs={10}
                direction="row"
                justify="center"
                alignItems="center"
            >
                Hello
            </Grid>
        </Grid>
    );
};

ResetPassword.propTypes = {
    // match: PropTypes.shape({
    //     params: PropTypes.shape({
    //         token: PropTypes.string
    //     })
    // }).isRequired
};

export default ResetPassword;
