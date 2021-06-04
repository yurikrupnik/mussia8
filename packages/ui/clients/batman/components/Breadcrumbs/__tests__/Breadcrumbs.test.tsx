import React from "react";
import { cleanup, render } from "@testing-library/react";
import Breadcrumbs from "../Breadcrumbs";

afterEach(cleanup);

// This test currently supports 3 levels of nesting, we can make it more generic using recursion
it(`Should render Breadcrumbs when router is null`, () => {
    const { queryByTestId } = render(
        <Breadcrumbs pathname="/cs/agent-rollout/rollout-logs" />
    );
    expect(queryByTestId("breadcrumbsRoot")).toBeTruthy();
});
