import React from "react";
import { render, screen } from "@testing-library/react";

import UniRankingEditDialogComponent from "../UniRankingEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders uniRanking edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UniRankingEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("uniRanking-edit-dialog-component")).toBeInTheDocument();
});
