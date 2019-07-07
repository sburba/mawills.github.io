import Choices from "./Choices";
import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";

afterEach(cleanup);

it("inserts commas between choices", () => {
  let result = render(
    <Choices choices={["one", "two", "three"]} onChoiceSelected={() => {}} />
  );

  // Right now the spacing between words is provided by padding, which is probably bad for accessibility
  expect(result.container.textContent).toEqual("one,two,three");
});

it("triggers the callback when a choice is selected", done => {
  function onSelected(choice: string) {
    expect(choice).toEqual("two");
    done();
  }

  const result = render(
    <Choices choices={["one", "two", "three"]} onChoiceSelected={onSelected} />
  );

  fireEvent.click(result.getByText(/two/i));
});
