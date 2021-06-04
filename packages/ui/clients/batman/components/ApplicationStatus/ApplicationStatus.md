```tsx
import ThemeProvider from "../../providers/ThemeProvider";

<ThemeProvider>
    <div style={{display: "flex", gridGap: "30px"}}>
        <ApplicationStatus status="https" />
        <ApplicationStatus status="http" />
        <ApplicationStatus status="ssh" />
        <ApplicationStatus status="vnc" />
        <ApplicationStatus status="sdp" />
        <ApplicationStatus status="rdp" />
    </div>
</ThemeProvider>
```