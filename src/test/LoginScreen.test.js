import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen.js';

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    
    expect(getByText('Login')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('handles user input', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'ram@gmail.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('ram@gmail.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('performs login action with success', async () => {
    // Mock the fetch function for a successful login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'ram@gmail.com');
    fireEvent.changeText(passwordInput, 'password123');

    fireEvent.press(getByText('Login'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

  });

  it('performs login action with failure', async () => {
    // Mock the fetch function for a failed login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ success: false }),
      })
    );

    const { getByText, getByPlaceholderText, findByText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'ram@gmail.com');
    fireEvent.changeText(passwordInput, 'password123');

    fireEvent.press(getByText('Login'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // Expect an error message to be displayed
    const errorMessage = await findByText('Login Failed');
    expect(errorMessage).toBeTruthy();
  });


  // Clean up after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
});
