import React from "react";
import Toast, { SHOW_MS } from "./Toast";
import { act } from "react-dom/test-utils";
import { cleanup, render } from "@testing-library/react";
import "jest-dom/extend-expect";

jest.useFakeTimers();

afterEach(cleanup);

it("Starts hidden if no message is provided", () => {
  const { getByTestId } = render(<Toast />);
  expect(getByTestId("toast").classList).not.toContain("show");
});

it("shows and hides the message", async () => {
  const { getByTestId } = render(<Toast msg={"Toast Message"} />);

  const toast = getByTestId("toast");
  expect(toast).toBeVisible();
  expect(toast).toHaveTextContent("Toast Message");

  act(() => {
    jest.advanceTimersByTime(SHOW_MS);
  });

  expect(toast.classList).not.toContain("show");
});

it("resets the timeout when a new message is provided", () => {
  let { getByTestId, rerender } = render(<Toast msg={"Toast Message"} />);
  let toast = getByTestId("toast");
  expect(toast).toHaveTextContent("Toast Message");
  expect(toast.classList).toContain("show");

  // Move to right before when the element should be hidden
  jest.advanceTimersByTime(SHOW_MS - 1);
  act(() => rerender(<Toast msg={"Toast Message 2"} />));

  expect(toast).toHaveTextContent("Toast Message 2");
  expect(toast.classList).toContain("show");

  act(() => {
    // Move past the point in time the timer for the first message would expire
    jest.advanceTimersByTime(2);
  });
  // The element should still be showing, because the message changed
  expect(toast.classList).toContain("show");
  act(() => {
    jest.advanceTimersByTime(SHOW_MS);
  });
  expect(toast.classList).not.toContain("show");
});
