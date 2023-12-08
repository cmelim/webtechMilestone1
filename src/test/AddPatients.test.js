import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddPatientScreen from '../screens/AddPatients.js';

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('AddPatientScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<AddPatientScreen />);
    
    expect(getByText('Add Patient')).toBeTruthy();
    expect(getByPlaceholderText('Enter Patient First Name')).toBeTruthy();
    expect(getByPlaceholderText('Enter Patient Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Enter Patient Date of Birth')).toBeTruthy();
    expect(getByPlaceholderText('Enter Patient Address')).toBeTruthy();
    expect(getByPlaceholderText('Enter Patient Phone Number')).toBeTruthy();
    expect(getByPlaceholderText('Enter Patient Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter Patient Height in cm')).toBeTruthy();
    expect(getByPlaceholderText('Enter Patient Weight in kg')).toBeTruthy();
    expect(getByPlaceholderText('Enter Patient Blood Type')).toBeTruthy();
    expect(getByPlaceholderText('Enter Emergency Contact First Name')).toBeTruthy();
    expect(getByPlaceholderText('Enter Emergency Contact Last Name')).toBeTruthy();
    expect(getByPlaceholderText('Enter Emergency Contact Phone Number')).toBeTruthy();
  });

  it('handles user input', () => {
    const { getByPlaceholderText } = render(<AddPatientScreen />);
    const firstNameInput = getByPlaceholderText('Enter Patient First Name');
    const lastNameInput = getByPlaceholderText('Enter Patient Last Name');
    const dateOfBirthInput = getByPlaceholderText('Enter Patient Date of Birth');
    const addressInput = getByPlaceholderText('Enter Patient Address');
    const phoneNumberInput = getByPlaceholderText('Enter Patient Phone Number');
    const emailInput = getByPlaceholderText('Enter Patient Email');
    const heightInput = getByPlaceholderText('Enter Patient Height in cm');
    const weightInput = getByPlaceholderText('Enter Patient Weight in kg');
    const bloodTypeInput = getByPlaceholderText('Enter Patient Blood Type');
    const emergencyFirstNameInput = getByPlaceholderText('Enter Emergency Contact First Name');
    const emergencyLastNameInput = getByPlaceholderText('Enter Emergency Contact Last Name');
    const emergencyPhoneNumberInput = getByPlaceholderText('Enter Emergency Contact Phone Number');

    fireEvent.changeText(firstNameInput, 'Anjali');
    fireEvent.changeText(lastNameInput, 'Thapa');
    fireEvent.changeText(dateOfBirthInput, '2000-01-01');
    fireEvent.changeText(addressInput, '96 Progress Ave');
    fireEvent.changeText(phoneNumberInput, '1234567890');
    fireEvent.changeText(emailInput, 'anjali.magar@gmail.com');
    fireEvent.changeText(heightInput, '180');
    fireEvent.changeText(weightInput, '75');
    fireEvent.changeText(bloodTypeInput, 'O+');
    fireEvent.changeText(emergencyFirstNameInput, 'Emergency');
    fireEvent.changeText(emergencyLastNameInput, 'Contact');
    fireEvent.changeText(emergencyPhoneNumberInput, '9876543210');

    expect(firstNameInput.props.value).toBe('Anjali');
    expect(lastNameInput.props.value).toBe('Thapa');
    expect(dateOfBirthInput.props.value).toBe('2000-01-01');
    expect(addressInput.props.value).toBe('96 Progress Ave');
    expect(phoneNumberInput.props.value).toBe('1234567890');
    expect(emailInput.props.value).toBe('anjali.magar@gmail.com');
    expect(heightInput.props.value).toBe('180');
    expect(weightInput.props.value).toBe('75');
    expect(bloodTypeInput.props.value).toBe('O+');
    expect(emergencyFirstNameInput.props.value).toBe('Emergency');
    expect(emergencyLastNameInput.props.value).toBe('Contact');
    expect(emergencyPhoneNumberInput.props.value).toBe('9876543210');
  });

  it('performs add patient action with success', async () => {
    const { getByText, getByPlaceholderText } = render(<AddPatientScreen />);
    const firstNameInput = getByPlaceholderText('Enter Patient First Name');
    const lastNameInput = getByPlaceholderText('Enter Patient Last Name');
    const dateOfBirthInput = getByPlaceholderText('Enter Patient Date of Birth');
    const addressInput = getByPlaceholderText('Enter Patient Address');
    const phoneNumberInput = getByPlaceholderText('Enter Patient Phone Number');
    const emailInput = getByPlaceholderText('Enter Patient Email');
    const heightInput = getByPlaceholderText('Enter Patient Height in cm');
    const weightInput = getByPlaceholderText('Enter Patient Weight in kg');
    const bloodTypeInput = getByPlaceholderText('Enter Patient Blood Type');
    const emergencyFirstNameInput = getByPlaceholderText('Enter Emergency Contact First Name');
    const emergencyLastNameInput = getByPlaceholderText('Enter Emergency Contact Last Name');
    const emergencyPhoneNumberInput = getByPlaceholderText('Enter Emergency Contact Phone Number');

    fireEvent.changeText(firstNameInput, 'Anjali');
    fireEvent.changeText(lastNameInput, 'Thapa');
    fireEvent.changeText(dateOfBirthInput, '2000-01-01');
    fireEvent.changeText(addressInput, '96 Progress Ave');
    fireEvent.changeText(phoneNumberInput, '1234567890');
    fireEvent.changeText(emailInput, 'anjali.magar@gmail.com');
    fireEvent.changeText(heightInput, '180');
    fireEvent.changeText(weightInput, '75');
    fireEvent.changeText(bloodTypeInput, 'O+');
    fireEvent.changeText(emergencyFirstNameInput, 'Emergency');
    fireEvent.changeText(emergencyLastNameInput, 'Contact');
    fireEvent.changeText(emergencyPhoneNumberInput, '9876543210');

    fireEvent.press(getByText('Add Patient'));

    // Wait for the asynchronous action to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  // Clean up after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
});
