import React from "react";
import { render, screen } from "@testing-library/react";

import UniRankingCreateDialogComponent from "../UniRankingCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders uniRanking create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UniRankingCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("uniRanking-create-dialog-component")).toBeInTheDocument();
});
