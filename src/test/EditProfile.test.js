import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditUserProfileScreen from '../screens/EditProfile';

describe('EditUserProfileScreen', () => {
  it('renders correctly and handles updates', () => {
    const { getByPlaceholderText, getByText } = render(<EditUserProfileScreen />);

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Sample user input
    fireEvent.changeText(getByPlaceholderText('First Name'), 'Camilo');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Meli');
    fireEvent.changeText(getByPlaceholderText('Password'), '3456789');
    fireEvent.changeText(getByPlaceholderText('Phone Number'), '1234567890');
    fireEvent.changeText(getByPlaceholderText('Email'), 'camilo.meli@gmail.com');

    // Select Gender
    fireEvent.press(getByText('Male'));

    // Select Healthcare Provider Type
    fireEvent.press(getByText('Doctor'));

    // Trigger the update button
    fireEvent.press(getByText('Update'));

    expect(consoleLogSpy).toHaveBeenCalledWith('Registering with the following information:');
    expect(consoleLogSpy).toHaveBeenCalledWith('First Name:', 'Camilo');
    expect(consoleLogSpy).toHaveBeenCalledWith('Last Name:', 'Meli');
    expect(consoleLogSpy).toHaveBeenCalledWith('Username:', ''); 
    expect(consoleLogSpy).toHaveBeenCalledWith('Password:', '3456789');
    expect(consoleLogSpy).toHaveBeenCalledWith('Phone Number:', '1234567890');
    expect(consoleLogSpy).toHaveBeenCalledWith('Email:', 'camilo.meli@gmail.com');
    expect(consoleLogSpy).toHaveBeenCalledWith('Gender:', 'Male');
    expect(consoleLogSpy).toHaveBeenCalledWith('Healthcare Provider:', 'Doctor');

    consoleLogSpy.mockRestore();
  });
});
