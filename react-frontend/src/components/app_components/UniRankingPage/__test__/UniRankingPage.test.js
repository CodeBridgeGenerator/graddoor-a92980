import React from "react";
import { render, screen } from "@testing-library/react";

import UniRankingPage from "../UniRankingPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders uniRanking page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UniRankingPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("uniRanking-datatable")).toBeInTheDocument();
    expect(screen.getByRole("uniRanking-add-button")).toBeInTheDocument();
});
