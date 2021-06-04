import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { applicationStatuses, companyStatusCodes } from "../utils/consts";

export type DropDownOptions = {
    _id: string;
    name: string;
}[];

declare module "@material-ui/core/index" {
    interface Color {
        0: string;
        main: string;
        light: string;
        dark: string;
    }
}

declare module "@material-ui/core/styles/createTypography" {
    // For craetion function
    interface TypographyOptions {
        display1: TypographyStyleOptions;
        interactive1: TypographyStyleOptions;
        interactive2: TypographyStyleOptions;
        caption1: TypographyStyleOptions;
        caption2: TypographyStyleOptions;
    }

    // For usage
    interface Typography {
        display1: TypographyStyle;
        interactive1: TypographyStyle;
        interactive2: TypographyStyle;
        caption1: TypographyStyle;
        caption2: TypographyStyle;
    }
}

interface SpecialColors {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
}

declare module "@material-ui/core/styles/createPalette" {
    // BG types
    interface TypeBackground {
        sidebar: string;
    }

    // Extend palette colors to have these attriburte
    interface PaletteColor {
        0: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    }

    interface Palette {
        specialColors: SpecialColors;
    }

    interface PaletteOptions {
        specialColors: SpecialColors;
    }
}

export type CompanyStatusCode = typeof companyStatusCodes[number];

export interface MainNavItem {
    name: string;
    Icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, "svg">>;
    rootPath?: string;
    items?: NavItem[];
}
export interface NavItem {
    name: string;
    path?: string;
    subItems?: NavItem[];
}
export type ApplicationStatus = typeof applicationStatuses[number];

// eslint-disable-next-line no-shadow
export enum POCStauses {
    CURRENTLY_POC = "Currently POC",
    WON_POC = "Won POC",
    LOST_POC = "Lost POC"
}
