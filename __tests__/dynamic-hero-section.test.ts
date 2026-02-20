import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from './HeroSection'; // Assuming the component is named HeroSection

// Mocking a timer for content change
jest.useFakeTimers();

// Test if the hero section changes content every few seconds
it('should change content every few seconds', () => {
  render(<HeroSection />);

  const initialContent = screen.getByTestId('hero-content');
  const initialText = initialContent.textContent;

  // Fast forward time by 5000ms assuming content changes every 5 seconds
  jest.advanceTimersByTime(5000);

  const updatedContent = screen.getByTestId('hero-content');
  expect(updatedContent.textContent).not.toBe(initialText);
});

// Test if the hero section pauses on hover
it('should pause content change on hover', () => {
  render(<HeroSection />);

  const heroSection = screen.getByTestId('hero-section');
  fireEvent.mouseOver(heroSection);

  const initialContent = screen.getByTestId('hero-content');
  const initialText = initialContent.textContent;

  // Fast forward time by 5000ms, content should not change due to hover
  jest.advanceTimersByTime(5000);

  expect(screen.getByTestId('hero-content').textContent).toBe(initialText);

  fireEvent.mouseLeave(heroSection);

  // Fast forward time by 5000ms, content should change now
  jest.advanceTimersByTime(5000);

  expect(screen.getByTestId('hero-content').textContent).not.toBe(initialText);
});

// Test the responsiveness of the hero section on different screen sizes
it('should be responsive on different screen sizes', () => {
  const { rerender } = render(<HeroSection />);

  // Mock different screen sizes
  global.innerWidth = 1200; // Desktop
  window.dispatchEvent(new Event('resize'));
  expect(screen.getByTestId('hero-section')).toHaveClass('desktop-layout');

  global.innerWidth = 768; // Tablet
  window.dispatchEvent(new Event('resize'));
  expect(screen.getByTestId('hero-section')).toHaveClass('tablet-layout');

  global.innerWidth = 375; // Mobile
  window.dispatchEvent(new Event('resize'));
  expect(screen.getByTestId('hero-section')).toHaveClass('mobile-layout');
});
