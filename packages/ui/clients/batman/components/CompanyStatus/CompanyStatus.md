```tsx
import ThemeProvider from "../../providers/ThemeProvider";

<ThemeProvider>
    <div style={{display: "flex", gridGap: "30px"}}>
    <CompanyStatus status="Active" poc="Won POC" />
    <CompanyStatus status="Cancelled" poc="Lost POC" />
    <CompanyStatus status="No status" />
    <CompanyStatus status="Non Renwing" />
    <CompanyStatus status="Active" />
    </div>
</ThemeProvider>
```