```tsx
import { makeStyles } from "@material-ui/core/styles";
import ThemeProvider from "../../providers/ThemeProvider";

const createClasses = makeStyles({
    root: {
        "& .MuiPaper-root, .MuiDrawer-root": {
            position: "relative !important"
        }
    }
});

const classes = createClasses();

<div className={classes.root}>
    <ThemeProvider>
        <Sidebar />
    </ThemeProvider>
</div>
```
