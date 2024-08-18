import { render } from "@testing-library/react";
import { act } from "react";
import Card from "./Card";

// Smoke Test
// Ensure components render without crashing.
it("renders without crashing", function() {
  act(() => {
    render(<Card caption="test caption" src="test.jpg" currNum={1} totalNum={3} />);
  });
});

// Snapshot test
// Ensures UI doesn't change unexpectedly.
it("matches snapshot", function() {
  act(() => {
    const { asFragment } = render(
      <Card caption="test caption" src="test.jpg" currNum={1} totalNum={3} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
