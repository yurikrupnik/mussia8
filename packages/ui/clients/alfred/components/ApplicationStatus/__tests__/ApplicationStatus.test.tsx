import React from "react";
import { cleanup, render } from "@testing-library/react";
import ThemeProvider from "../../../providers/ThemeProvider";
import ApplicationStatus from "../ApplicationStatus";
import { applicationStatuses, companyStatusCodes } from "../../../utils/consts";

afterEach(cleanup);

const status =
    applicationStatuses[
        Math.ceil(Math.random() * companyStatusCodes.length - 1)
    ];
const content = status.toUpperCase();

const Wrapper = () => (
    <ThemeProvider>
        <ApplicationStatus status={status} />
    </ThemeProvider>
);

it(`Should render ApplicationStatus with a status`, () => {
    const { queryByText } = render(<Wrapper />);
    const elm = queryByText(content);
    expect(elm?.innerHTML).toBe(content);
});
