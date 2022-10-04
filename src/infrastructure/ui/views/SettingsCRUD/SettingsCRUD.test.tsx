import { render, screen, waitFor } from "@testing-library/react";
import { UseCasesBuilder } from "../../../../tests/builders/use-cases-builder";
import React from "react";
import { initStore } from "../../store";
import { UseCaseDouble } from "../../../../tests/doubles/use-case.double";
import { SettingsCRUD } from "./SettingsCRUD";
import userEvent from "@testing-library/user-event";
import { messages } from "../../../../messages";

describe("Settings CRUD view should", () => {
  it("edit database sync url", async () => {
    const expectedSyncUrl = "http://irrelevant.info";
    const setSettingsDouble = new UseCaseDouble();
    await waitFor(() =>
      initStore(
        UseCasesBuilder.init().withSetSettingsCase(setSettingsDouble).build()
      )
    );
    render(<SettingsCRUD />);

    userEvent.type(
      screen.getByLabelText(messages.settings.syncUrlInput),
      expectedSyncUrl
    );
    userEvent.click(screen.getByLabelText(messages.settings.submitButton));

    await waitFor(() =>
      setSettingsDouble.assertHasBeenCalledWith({ syncUrl: expectedSyncUrl })
    );
  });

  it("not edit database sync url if value is empty", async () => {
    const expectedSyncUrl = "";
    const setSettingsDouble = new UseCaseDouble();
    await waitFor(() =>
      initStore(
        UseCasesBuilder.init().withSetSettingsCase(setSettingsDouble).build()
      )
    );
    render(<SettingsCRUD />);

    userEvent.type(
      screen.getByLabelText(messages.settings.syncUrlInput),
      expectedSyncUrl
    );
    userEvent.click(screen.getByLabelText(messages.settings.submitButton));

    await waitFor(() => setSettingsDouble.assertHasBeenCalledTimes(0));
  });
});
