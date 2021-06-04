import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { sidebarItemsMap } from "../../../utils/consts";
import Sidebar from "../Sidebar";

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: ""
        };
    }
}));

afterEach(cleanup);

describe("Check Sidebar", () => {
    it(`Should render sub item after main item click`, () => {
        const { queryByText } = render(<Sidebar />);
        const elm = queryByText(sidebarItemsMap.marketing.name);
        elm?.click();
        const subElm = queryByText(
            sidebarItemsMap.marketing.items?.[1]?.name || ""
        );
        expect(subElm).toBeTruthy();
    });

    it(`Should render not sub item without a click`, () => {
        const { queryByText } = render(<Sidebar />);
        const subElm = queryByText(
            sidebarItemsMap.marketing.items?.[1]?.name || ""
        );
        expect(subElm).toBeFalsy();
    });

    it("Should render inner item after items clicks with keyboard", () => {
        const { queryByText, queryByTestId } = render(<Sidebar />);
        const elm = queryByTestId(`li_${sidebarItemsMap.cs.name}`);
        if (elm) {
            fireEvent.keyDown(elm, { code: "Enter" });
        }

        const subElm = queryByTestId(
            `li_${sidebarItemsMap.cs.items?.[3]?.name}`
        );
        if (subElm) {
            fireEvent.keyDown(subElm, { code: "Enter" });
        }
        const innerElm = queryByText(
            sidebarItemsMap.cs.items?.[3]?.subItems?.[0].name || ""
        );
        expect(innerElm).toBeTruthy();
    });
});
