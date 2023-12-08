import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CriticalPatients from '../screens/CriticalPatients';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('CriticalPatients', () => {
  it('renders correctly', async () => {
    const { getByText, getByPlaceholderText } = render(<CriticalPatients />);

    // Check if the component renders correctly
    expect(getByText('Search Critical Patients by name or email')).toBeTruthy();
    expect(getByText('Patient 1')).toBeTruthy();
    expect(getByText('Case No: 12345')).toBeTruthy();

    // Trigger a search
    const searchInput = getByPlaceholderText('Search Critical Patients by name or email');
    fireEvent.changeText(searchInput, 'Patient 2');

    // Wait for the component to update with the search results
    await waitFor(() => expect(searchInput).toHaveProp('value', 'Patient 2'));

    // Check if the search results are displayed
    expect(getByText('Patient 2')).toBeTruthy();
    expect(getByText('Case No: 56789')).toBeTruthy();
  });
});
