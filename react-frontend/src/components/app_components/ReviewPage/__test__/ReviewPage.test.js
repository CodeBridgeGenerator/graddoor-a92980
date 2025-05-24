import React from "react";
import { render, screen } from "@testing-library/react";

import ReviewPage from "../ReviewPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders review page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReviewPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("review-datatable")).toBeInTheDocument();
    expect(screen.getByRole("review-add-button")).toBeInTheDocument();
});
