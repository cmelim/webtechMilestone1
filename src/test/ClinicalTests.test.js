import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ClinicalTests from '../screens/ClinicalTests'; // Adjust the path accordingly

jest.mock('react-native-vector-icons/FontAwesome', () => 'IconMock');

describe('ClinicalTests', () => {
  const mockRoute = {
    params: {
      patientID: {
        _id: '123',
        firstName: 'Ankit',
        lastName: 'Gurung',
      },
    },
  };

  const mockPatientTests = [
    {
      _id: 'testId1',
      date: '2023-12-05',
      bodyTemperature: '98.6',
      bloodPressure: '120/80',
      respiratoryRate: '18',
      bloodOxygenLevel: '98',
      pulseRate: '70',
    },
  ];

  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: jest.fn().mockResolvedValueOnce(mockPatientTests),
    })
  );

  it('renders correctly', async () => {
    const { getByText } = render(<ClinicalTests route={mockRoute} />);
    expect(getByText('Ankit Gurung')).toBeTruthy();

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    
    // Check if the test data is displayed
    expect(getByText('Test Date: December 5, 2023')).toBeTruthy(); // Adjust the expected date format
    expect(getByText('Body Temperature: 98.6 °C')).toBeTruthy();
    expect(getByText('Blood Pressure: 120/80 mmHg')).toBeTruthy();
    expect(getByText('Respiratory Rate: 18 bpm')).toBeTruthy();
    expect(getByText('Blood Oxygen Level: 98%')).toBeTruthy();
    expect(getByText('Pulse Rate: 70 bpm')).toBeTruthy();
  });
});
