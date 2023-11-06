import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import RadioButtonGroup from './../components/RadioButtonGroup';

function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); // Will store 'Male' or 'Female'
  const [healthcareProvider, setHealthcareProvider] = useState(''); // Will store 'Doctor' or 'Nurse'
  const [isLoading, setIsLoading] = useState(false); // State variable to track loading state

  const genders = ['Male', 'Female'];
  const healthcareProviders = ['Doctor', 'Nurse'];

  const handleRegister = () => {
    if (!firstName || !lastName || !password || !phoneNumber || !email || !gender || !healthcareProvider) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (!/^\d+$/.test(phoneNumber) || phoneNumber.length !== 10) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    const genderValue = gender === 'Male' ? 0 : 1;
    const professionValue = healthcareProvider === 'Doctor' ? 0 : 1;
    const registrationData = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      gender: genderValue,
      healthcareProvider: professionValue,
    };

    setIsLoading(true); // Set loading state to true

    fetch('http://10.0.2.2:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Registration failed');
        }
      })
      .then((data) => {
        if (data.success) {
          Alert.alert('Registration Successful', 'Your registration was successful. Please try logging in.');
          navigation.navigate('Login');
        } else {
          console.log('Registration failed');
          Alert.alert('Registration Failed', 'Please check the information and try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false when the process is completed
      });
  };

  const isValidEmail = (email) => {
    // Regular expression to validate email
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Details</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Gender</Text>
        <RadioButtonGroup
          options={genders}
          selectedOption={gender}
          onOptionSelect={setGender}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Healthcare Provider Type</Text>
        <RadioButtonGroup
          options={healthcareProviders}
          selectedOption={healthcareProvider}
          onOptionSelect={setHealthcareProvider}
        />
      </View>
      {isLoading ? ( // Display loading indicator if isLoading is true
        <ActivityIndicator size="large" color="#3349FF" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.loginText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Login here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFE1E1',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3349FF',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  labelContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#3349FF',
    padding: 10,
    borderRadius: 10,
    width: 300,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  loginText: {
    marginTop: 20,
    color: 'black',
  },
  loginLink: {
    color: '#3349FF',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
