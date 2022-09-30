import {render, screen} from "@testing-library/react";
import React from "react";
import {Search} from "./Search";
import userEvent from "@testing-library/user-event";
import {messages} from "../../../../messages";

describe('Search input should', () => {
  it('emit input changes', () => {
    const text = 'irrelevant'
    const props = {onChange: jest.fn(), onClose: jest.fn()}
    render(<Search {...props}/>);

    const search = screen.getByLabelText(messages.search.searchInput);
    userEvent.type(search, text)

    expect(props.onChange).toHaveBeenCalledWith(text);
  })

  it('emit input closes when input has no value and button is clicked', async () => {
    const props = {onChange: jest.fn(), onClose: jest.fn()}
    render(<Search {...props}/>);

    const closeButton = screen.getByLabelText(messages.search.closeCTA);
    userEvent.click(closeButton)

    expect(props.onClose).toHaveBeenCalledTimes(1);
  })

  it('reset search value when input has value and button is clicked', () => {
    const text = 'irrelevant'
    const props = {onChange: jest.fn(), onClose: jest.fn()}
    render(<Search {...props}/>);

    const search = screen.getByLabelText(messages.search.searchInput);
    userEvent.type(search, text)
    expect(search.outerHTML).toContain(`value="${text}"`);
    const resetButton = screen.getByLabelText(messages.search.resetCTA);
    userEvent.click(resetButton)

    expect(search.outerHTML).toContain('value=""');
    expect(props.onClose).not.toHaveBeenCalled();
  })
})
