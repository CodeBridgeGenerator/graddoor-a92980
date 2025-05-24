import React from "react";
import { render, screen } from "@testing-library/react";

import UniReviewPage from "../UniReviewPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders uniReview page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UniReviewPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("uniReview-datatable")).toBeInTheDocument();
    expect(screen.getByRole("uniReview-add-button")).toBeInTheDocument();
});
