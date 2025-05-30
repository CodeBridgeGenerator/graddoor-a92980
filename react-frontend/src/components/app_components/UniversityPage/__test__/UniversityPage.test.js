import React from "react";
import { render, screen } from "@testing-library/react";

import UniversityPage from "../UniversityPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders university page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UniversityPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("university-datatable")).toBeInTheDocument();
    expect(screen.getByRole("university-add-button")).toBeInTheDocument();
});
