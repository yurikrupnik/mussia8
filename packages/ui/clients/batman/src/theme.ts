import { createMuiTheme } from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";
import createSpacing from "@material-ui/core/styles/createSpacing";
import createTypography from "@material-ui/core/styles/createTypography";

const fontWeights = {
    regular: 400,
    medium: 500,
    semiBold: 600
};

const fontSizes = {
    0: "12px",
    1: "14px",
    2: "16px",
    3: "20px",
    4: "22px",
    5: "32px",
    6: "36px"
};

const palette = createPalette({
    primary: {
        light: "#7490CD",
        dark: "#1F3156",
        main: "#3A5BA2",
        0: "#E5EAF6",
        100: "#BFCCE8",
        200: "#9AAEDB",
        300: "#7490CD",
        400: "#4F72BF",
        500: "#3A5BA2",
        600: "#2D467C",
        700: "#1F3156",
        800: "#182743",
        900: "#121B31"
    },
    grey: {
        light: "#BAC2CC",
        dark: "#455569",
        main: "#7F8C9B",
        0: "#FFFFFF",
        100: "#F4F8FD",
        200: "#D7DDE4",
        300: "#BAC2CC",
        400: "#9CA7B3",
        500: "#7F8C9B",
        600: "#627082",
        700: "#455569",
        800: "#273A51",
        900: "#0A1F38"
    },
    success: {
        light: "#BBF1E5",
        dark: "#36AF94",
        main: "#44D7B6",
        0: "#E2F9F4",
        100: "#D9F7F1",
        200: "#CFF5ED",
        300: "#BBF1E5",
        400: "#93E8D5",
        500: "#44D7B6",
        600: "#3DC3A5",
        700: "#36AF94",
        800: "#288772",
        900: "#0C372D"
    },
    info: {
        light: "#B4D1FF",
        dark: "#1F51A1",
        main: "#3E88FF",
        0: "#DBE9FF",
        100: "#D2E3FF",
        200: "#C8DDFF",
        300: "#B4D1FF",
        400: "#8DB9FF",
        500: "#3E88FF",
        600: "#2F6DD0",
        700: "#1F51A1",
        800: "#103572",
        900: "#08275A"
    },
    warning: {
        light: "#FFEABA",
        dark: "#D0A240",
        main: "#FFC955",
        0: "#FFF4DB",
        100: "#FFF2D3",
        200: "#FFEFCB",
        300: "#FFEABA",
        400: "#FFDF98",
        500: "#FFC955",
        600: "#E8B64B",
        700: "#D0A240",
        800: "#A17B2B",
        900: "#A17B2B"
    },
    error: {
        light: "#FFCCD2",
        dark: "#CF4356",
        main: "#FD596F",
        0: "#FFDCE0",
        100: "#FFD4D9",
        200: "#FFCCD2",
        300: "#FFCCD2",
        400: "#FE9BA8",
        500: "#FD596F",
        600: "#E64E63",
        700: "#CF4356",
        800: "#A02D3C",
        900: "#420109"
    },
    specialColors: {
        1: "#E46086",
        2: "#FF829D",
        3: "#6FCDCD",
        4: "#6BB9D7",
        5: "#C07DB7",
        6: "#AC89F3",
        7: "#F89E7C",
        8: "#FBDF9C",
        9: "#9AD0F5",
        10: "#4DC9F6"
    },
    background: {
        sidebar: "linear-gradient(0deg, #2F4981 0%, #1F3156 100%)"
    }
});

const spacing = createSpacing(8);

const typography = createTypography(palette, {
    fontFamily: "'Inter', sans-serif",
    display1: {
        fontSize: fontSizes[6],
        fontWeight: fontWeights.semiBold,
        lineHeight: "44px"
    },
    h1: {
        fontSize: fontSizes[5],
        fontWeight: fontWeights.semiBold,
        lineHeight: "39px"
    },
    h2: {
        fontSize: fontSizes[4],
        fontWeight: fontWeights.semiBold,
        lineHeight: "26px"
    },
    h3: {
        fontSize: fontSizes[3],
        fontWeight: fontWeights.medium,
        lineHeight: "24px"
    },
    h4: {
        fontSize: fontSizes[2],
        fontWeight: fontWeights.semiBold,
        lineHeight: "20px"
    },
    h5: {
        fontSize: fontSizes[1],
        fontWeight: fontWeights.medium,
        lineHeight: "17px"
    },
    subtitle1: {
        fontSize: fontSizes[1],
        fontWeight: fontWeights.regular,
        lineHeight: "21px"
    },
    body1: {
        fontSize: fontSizes[2],
        fontWeight: fontWeights.regular,
        lineHeight: "24px"
    },
    body2: {
        fontSize: fontSizes[1],
        fontWeight: fontWeights.regular,
        lineHeight: "21px"
    },
    interactive1: {
        fontSize: fontSizes[2],
        fontWeight: fontWeights.medium,
        lineHeight: "24px"
    },
    interactive2: {
        fontSize: fontSizes[1],
        fontWeight: fontWeights.medium,
        lineHeight: "21px"
    },
    caption1: {
        fontSize: fontSizes[0],
        fontWeight: fontWeights.regular,
        lineHeight: "15px"
    },
    caption2: {
        fontSize: fontSizes[0],
        fontWeight: fontWeights.medium,
        lineHeight: "15px"
    }
});

const endIcon = {
    marginRight: "0 !important",
    marginLeft: spacing(1)
};

const startIcon = {
    marginRight: spacing(1),
    marginLeft: "0 !important"
};

const containedPrimaryActive = {
    backgroundColor: palette.info[600]
};
const containedSecondaryActive = {
    backgroundColor: palette.common.white,
    color: palette.info[600]
};

const theme = createMuiTheme({
    typography,
    palette,
    spacing,
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1440
        }
    },
    props: {
        MuiButtonBase: {
            disableRipple: true
        },
        MuiButton: {
            disableElevation: true,
            variant: "contained"
        }
    },
    overrides: {
        MuiSvgIcon: {
            root: {
                height: "16px",
                width: "16px"
            }
        },
        MuiListItemIcon: {
            root: {
                minWidth: 0
            }
        },
        MuiButton: {
            root: {
                ...typography.body2,
                minWidth: spacing(),
                textTransform: "capitalize",
                height: "40px",
                padding: 0
            },
            containedPrimary: {
                backgroundColor: palette.info.main,
                "&$disabled": {
                    backgroundColor: palette.grey[300],
                    color: palette.common.white
                },
                "&:focus-within": containedPrimaryActive,
                "&:hover": containedPrimaryActive
            },
            containedSecondary: {
                backgroundColor: palette.common.white,
                boxShadow: `0px 0px 0px 1px ${palette.primary[0]} !important`,
                borderRadius: spacing(0.5),
                color: palette.info.main,
                "&$disabled": {
                    backgroundColor: palette.common.white,
                    color: palette.grey[300]
                },
                "&:focus-within": containedSecondaryActive,
                "&:hover": containedSecondaryActive
            },
            textPrimary: {
                padding: 0,
                color: palette.info.main,
                "&$disabled": {
                    color: palette.grey[300]
                },
                "&:hover": {
                    backgroundColor: "inherit",
                    color: palette.info[600]
                }
            },
            label: {
                padding: spacing(0, 2),
                "& > svg": {
                    margin: spacing(0, -0.5)
                }
            },
            containedSizeSmall: {
                ...typography.body2,
                height: "32px",
                padding: 0,
                "& .MuiButton-endIcon": endIcon,
                "& .MuiButton-startIcon": startIcon,
                "& > .MuiButton-label > svg": {
                    margin: spacing(0, -1)
                }
            },
            endIcon,
            startIcon
        }
    }
});

export default theme;
