import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import RadioButtonGroup from './../components/RadioButtonGroup';
import axios from 'axios';

function AddPatientScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState(''); // Will store 'Male' or 'Female'

  const genders = ['Male', 'Female'];

  const handleRegister = () => {
    if (!firstName || !lastName || !phoneNumber || !email || !height || !weight) {
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

    if (!/^\d+$/.test(height) || !/^\d+$/.test(weight)) {
      Alert.alert('Validation Error', 'Height and weight should be numbers.');
      return;
    }

    // Create a patient object with the data
    const newPatientData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      height,
      weight,
      address,
      gender,
    };

    // Send a POST request to your server with the patient data
    axios
      .post('http://localhost:8080/api/patient/', newPatientData)
      .then((response) => {
        console.log('Patient added successfully: ', response.data);
        alert('Patient added successfully');
        navigation.navigate('AllPatients',{ fetchPatients: true });
      })
      .catch((error) => {
        console.error('Error adding patient:', error);
        // Handle the error, show an alert, or other error handling logic
      });
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Height in CM"
          value={height}
          onChangeText={(text) => setHeight(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Weight in KG"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <TextInput
          style={styles.inputForMultilines}
          placeholder="Enter Patient Home Address"
          value={address}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setAddress(text)}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Select Gender</Text>
          <RadioButtonGroup
            options={genders}
            selectedOption={gender}
            onOptionSelect={setGender}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Add Details</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
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
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inputForMultilines: {
    width: 300,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  labelContainer: {
    width: 300,
    flexDirection: 'column',
    alignItems: 'left',
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
  scrollView: {
    backgroundColor: '#EFE1E1',
  },
});

export default AddPatientScreen;
