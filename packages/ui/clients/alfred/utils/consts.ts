import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import { MainNavItem } from "../src/types";

export const drawerWidthOpen = "240px";

export const drawerWidthClose = "64px";

export const companyStatusCodes = [
    "Active",
    "Cancelled",
    "No status",
    "Non Renewing"
] as const;

export const applicationStatuses = [
    "https",
    "http",
    "ssh",
    "vnc",
    "sdp",
    "rdp"
] as const;

export const sidebarItemsMap: Record<string, MainNavItem> = {
    dashboard: {
        name: "Dashboard",
        Icon: PeopleAltOutlinedIcon,
        rootPath: "/dashboard"
    },
    accounts: {
        name: "Accounts",
        Icon: PeopleAltOutlinedIcon,
        rootPath: "/accounts"
    },
    marketing: {
        name: "Marketing",
        Icon: PeopleAltOutlinedIcon,
        items: [
            { name: "Collection Cohort", path: "/marketing/collection-cohort" },
            { name: "All customers", path: "/marketing/all-customers" }
        ]
    },
    arr: {
        name: "ARR",
        Icon: PeopleAltOutlinedIcon,
        items: [
            { name: "User Configuration", path: "/arr/user-configuration" },
            { name: "ARR Activity", path: "/arr/arr-activty" },
            { name: "ARR Cohort", path: "/arr/arr-cohort" }
        ]
    },
    cs: {
        name: "CS",
        Icon: PeopleAltOutlinedIcon,
        items: [
            { name: "Chrun Cohort", path: "/cs/chrun-cohort" },
            { name: "Cancellations", path: "/cs/cancellations" },
            { name: "Sarisfaction Board", path: "/cs/satisfaction-board" },
            {
                name: "Agent Rollout",
                subItems: [
                    {
                        name: "Rollout Versions",
                        path: "/cs/agent-rollout/rollout-versions"
                    },
                    {
                        name: "Rollout Logs",
                        path: "/cs/agent-rollout/rollout-logs"
                    }
                ]
            }
        ]
    },
    rd: {
        name: "R&D",
        Icon: PeopleAltOutlinedIcon,
        items: [{ name: "Applications", path: "/rd/applications" }]
    },
    product: {
        name: "Product",
        Icon: PeopleAltOutlinedIcon,
        items: [
            { name: "Features Adoption", path: "/product/features-adoption" }
        ]
    }
};
