import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders message", () => {
    render(<ErrorMessage message={"Test message"} />);

    expect(screen.getByText("Test message")).toBeVisible();
  });

  it.each([undefined, null])("doesn't render without message %s", (message) => {
    const { container } = render(<ErrorMessage message={message} />);

    expect(container.children.length).toBe(0);
  });
});
