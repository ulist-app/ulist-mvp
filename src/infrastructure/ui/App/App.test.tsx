import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { UseCasesBuilder } from "../../../tests/builders/use-cases-builder";

describe("Groceries list App should", () => {
  it("renders app name", () => {
    render(<App {...UseCasesBuilder.random()} />);

    screen.getByText(/Groceries list/);
  });
});
