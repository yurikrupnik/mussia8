import React from "react";
import { cleanup, render } from "@testing-library/react";
import Link from "../Link";

afterEach(cleanup);

const href = "hello-world";

describe("Check Link", () => {
    it(`Should render Link`, () => {
        const { container } = render(<Link href={href}>hello world</Link>);
        const aTag = container.getElementsByTagName("a");
        const res = aTag[0].href.split("/");
        expect(res[res.length - 1]).toBe(href);
    });
});
