import React from 'react';
import { render } from '@testing-library/react-native';
import RegisterScreen from '../screens/RegisterScreen';

// Mock the navigation prop
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('RegisterScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen />);
    
    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Phone Number')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Gender')).toBeTruthy();
    expect(getByText('Healthcare Provider Type')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });
});
