import React, { FC, ReactElement } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../../src/theme";

interface Props {
    children: ReactElement;
}

const ThemeProvider: FC<Props> = (props: Props) => {
    const { children } = props;
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
