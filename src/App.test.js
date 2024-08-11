
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders the initial welcome message', () => {
  render(<App />);
  const welcomeMessage = screen.getByText(/Welcome to 100 Days of Masterpieces!/i);
  expect(welcomeMessage).toBeInTheDocument();
});

describe('drawWelcome', () => {
  test('renders welcome message for a new user', () => {

    jest.spyOn(React, 'useState')
    .mockReturnValueOnce([false, jest.fn()])         // for isLoading
    .mockReturnValueOnce(['John Doe', jest.fn()])    // for name state
    .mockReturnValueOnce([true, jest.fn()])          // for nameIsSet state
    .mockReturnValueOnce(['itemname', jest.fn()]) // for itemName state
    .mockReturnValueOnce(['description', jest.fn()]) // for itemDescription state
    .mockReturnValueOnce([0, jest.fn()])             // for lastItemIndex state
    .mockReturnValueOnce([0, jest.fn()])             // for prevItemIndex state
    .mockReturnValueOnce([0, jest.fn()])             // for currItemIndex state
    .mockReturnValueOnce([new Date(), jest.fn()])    // for lastVisitDate state
    .mockReturnValueOnce([true, jest.fn()]);         // for welcomeModalOpen state

    // Setup: render the App component
    render(<App />);

    // Action: Simulate the welcome modal being open without a name set
    const welcomeModalOpen = screen.getByText(/Welcome to 100 Days of Masterpieces!/i);

    // Assert: Check if the expected text and button are present
    expect(welcomeModalOpen).toBeInTheDocument();
    expect(screen.getByText(/Let's Start!/i)).toBeInTheDocument();
  });

  test('renders welcome message for a returning user', () => {
    // Setup: we need to mock the useState to simulate a return user
    jest.spyOn(React, 'useState')
      .mockReturnValueOnce([false, jest.fn()])        // for isLoading
      .mockReturnValueOnce(['John Doe', jest.fn()])    // for name state
      .mockReturnValueOnce([true, jest.fn()])          // for nameIsSet state
      .mockReturnValueOnce(['description', jest.fn()])          // for itemDescription state
      .mockReturnValueOnce([0, jest.fn()])             // for lastItemIndex state
      .mockReturnValueOnce([0, jest.fn()])             // for prevItemIndex state
      .mockReturnValueOnce([0, jest.fn()])             // for currItemIndex state
      .mockReturnValueOnce([new Date(), jest.fn()])    // for lastVisitDate state
      .mockReturnValueOnce([true, jest.fn()]);         // for welcomeModalOpen state

    // Action: render the App component
    render(<App />);

    // Assert: Check if the expected text and button are present
    expect(screen.getByText(/Welcome back John Doe!/i)).toBeInTheDocument();
    expect(screen.getByText(/Start a New Day/i)).toBeInTheDocument();
  });

  test('closes the welcome modal when the button is clicked', () => {
    // Mock useState and the function to close the modal
    const setWelcomeModalOpen = jest.fn();
    jest.spyOn(React, 'useState')
      .mockReturnValueOnce([true, setWelcomeModalOpen])
      .mockReturnValueOnce([false, setIsLoading])

    // Setup: render the App component
    render(<App />);

    // Action: Simulate button click
    fireEvent.click(screen.getByText(/Let's Start!/i));

    // Assert: Check if the modal close function was called
    expect(setWelcomeModalOpen).toHaveBeenCalledWith(false);
  });
});