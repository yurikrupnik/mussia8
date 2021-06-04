import React from "react";
import { cleanup, render } from "@testing-library/react";
import TableProgressbar from "../TableProgressbar";

afterEach(cleanup);

describe("Check TableProgressbar", () => {
    it(`Should render TableProgressbar`, () => {
        const { queryByTestId } = render(
            <TableProgressbar current={1} total={3} />
        );
        const elm = queryByTestId("tableProgressbarRoot");
        expect(elm).toBeTruthy();
    });
});
