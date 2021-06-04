import React from "react";
import { cleanup, render } from "@testing-library/react";
import CompanyStatus from "../CompanyStatus";
import { companyStatusCodes } from "../../../utils/consts";
import { POCStauses } from "../../../src/types";

afterEach(cleanup);

const companyStatus =
    companyStatusCodes[
        Math.ceil(Math.random() * companyStatusCodes.length - 1)
    ];

describe("Check CompanyStatus", () => {
    it(`Should render CompanyStatus without poc`, () => {
        const { queryByText } = render(
            <CompanyStatus status={companyStatus} />
        );
        const textEl = queryByText(companyStatus);
        expect(textEl?.innerHTML).toBe(companyStatus);
    });

    it(`Should render CompanyStatus with poc`, () => {
        const label = `${companyStatus} - ${POCStauses.WON_POC}`;
        const { queryByText } = render(
            <CompanyStatus status={companyStatus} poc={POCStauses.WON_POC} />
        );
        const textEl = queryByText(label);
        expect(textEl?.innerHTML).toBe(label);
    });
});
