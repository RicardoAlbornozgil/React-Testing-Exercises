import { render, fireEvent, act } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon";
import '@testing-library/jest-dom/extend-expect';

// Test for right arrow click functionality
it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  
  // Expect the first image to show, but not the second
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();

  // Move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  act(() => {
    fireEvent.click(rightArrow);
  });

  // Expect the second image to show, but not the first
  expect(container.querySelector('img[alt="testing image 1"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();
});

// Smoke Test
it("renders without crashing", function() {
  render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
});

// Snapshot test
it("matches snapshot", function() {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
  expect(asFragment()).toMatchSnapshot();
});

// Test for left arrow click functionality
it("moves to the previous image when left arrow is clicked", function() {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  
  // Move to second image
  act(() => {
    fireEvent.click(rightArrow);
  });
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();

  // Ensure the left arrow is present before clicking it
  let leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).toBeInTheDocument();

  // Click left arrow to go back to the first image
  act(() => {
    fireEvent.click(leftArrow);
  });
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
});

// Test for hiding left arrow on first image and right arrow on last image
it("hides left arrow on the first image and right arrow on the last image", function() {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // The left arrow should not be visible on the first image
  let leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).not.toBeInTheDocument();

  // Move to last image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  

  // Now the left arrow should be visible
  leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).toBeInTheDocument();

  // The right arrow should now be hidden on the last image
  expect(rightArrow).not.toBeVisible();
});
