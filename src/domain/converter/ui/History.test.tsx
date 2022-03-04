import React from "react";
import { render, screen } from "@testing-library/react";
import History from "./History";
import { generateMockHistoryItem } from "../../../utils/testUtils";

const mockItem = generateMockHistoryItem();

describe("History", () => {
  it("should not render", () => {
    const { container } = render(<History history={[]} />);

    expect(container.hasChildNodes()).toBeFalsy();
  });

  it("should render history", () => {
    render(<History history={[mockItem]} />);

    expect(screen.getByText("History")).toBeVisible();
    expect(
      screen.getByText(
        `${mockItem.amount} ${mockItem.from} was ${mockItem.result} ${
          mockItem.to
        } on the ${new Date(mockItem.timestamp).toLocaleDateString()}`
      )
    ).toBeVisible();
  });
});
