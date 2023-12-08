import React, {useState} from 'react';
import {Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonGroup from './../components/RadioButtonGroup';

function AddPatientScreen({ navigation }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [address, setAddress] = useState('');  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [emergencyFirstName, setEmergencyFirstName] = useState('');
  const [emergencyLastName, setEmergencyLastName] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('');
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState('');

  const genders = ['Male', 'Female'];

  const [open, setOpen] = useState(false);
  
  const [items, setItems] = useState([
    { label: 'Mother', value: 'Mother' },
    { label: 'Father', value: 'Father' },
    { label: 'Sister', value: 'Sister' },
    { label: 'Brother', value: 'Brother' },
    { label: 'Wife', value: 'Wife' },
    { label: 'Husband', value: 'Husband' },
    { label: 'Friend', value: 'Friend' },
  ]);

  // Create a patient object with the data
  const newPatientData = {
    firstName,
    lastName,
    dateOfBirth,
    gender: selectedGender,
    address,
    phoneNumber,
    email,
    height,
    weight,
    bloodType,
    emergencyContact: {
      firstName: emergencyFirstName,
      lastName: emergencyLastName,
      relationship: emergencyRelationship,
      phoneNumber: emergencyPhoneNumber,
    }
  };  

  const handleRegister = () => {
    if (!firstName || !lastName || !phoneNumber || !email || !height || !weight ) {
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

     // Validate date of birth format (YYYY-MM-DD)
    const dateOfBirthPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateOfBirthPattern.test(dateOfBirth)) {
      Alert.alert('Validation Error', 'Please enter a valid date of birth in the format YYYY-MM-DD.');
      return;
    }

    fetch('https://customer-care-api-hf68.onrender.com/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPatientData),
    })
    .then(response => response.json())
    .then(data => {
      navigation.navigate('AllPatients');
    })
    .catch(error => {
      console.error('Error adding patient:', error);
    });
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email);
  };

  return (
    <FlatList
      style={styles.flatlist}
      data={[{ key: 'form' }]}
      renderItem={() => (
      <SafeAreaView style={styles.container}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <Text style={styles.inputLabel}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Date of Birth"
          value={dateOfBirth}
          onChangeText={(text) => setDateOfBirth(text)}
        />
        <Text style={styles.inputLabel}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.inputLabel}>Height (cm))</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Height in cm"
          value={height}
          onChangeText={(text) => setHeight(text)}
        />
        <Text style={styles.inputLabel}>Weight (kg))</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Weight in kg"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <Text style={styles.inputLabel}>Blood Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Blood Type"
          value={bloodType}
          onChangeText={(text) => setBloodType(text)}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Select Gender</Text>
          <RadioButtonGroup
            options={genders}
            selectedOption={selectedGender}
            onOptionSelect={setSelectedGender}
          />
        </View>
        <Text style={styles.heading}>Emergency Contact</Text>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Emergency Contact First Name"
          value={emergencyFirstName}
          onChangeText={(text) => setEmergencyFirstName(text)}
        />
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Emergency Contact Last Name"
          value={emergencyLastName}
          onChangeText={(text) => setEmergencyLastName(text)}
        />
        <View style={styles.dropDownontainer}>
          <Text style={styles.inputLabel}>Relationship</Text>
          <DropDownPicker
            style={styles.dropDown}
            open={open}
            setOpen={setOpen}
            value = {emergencyRelationship}
            setValue={setEmergencyRelationship}
            items = {items}
            setItems= {setItems}
          />
        </View>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Emergency Contact Phone Number"
          value={emergencyPhoneNumber}
          onChangeText={(text) => setEmergencyPhoneNumber(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Add Patient</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )}
  />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3349FF',
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 10,
    marginBottom: 4,
    backgroundColor: 'white'
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
    width : "80%",
    flexDirection: 'Column',
    alignItems: 'center',
    marginTop:8,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  inputLabel:{
    fontSize: 12,
    marginTop: 4
  }, 
  loginButton: {
    backgroundColor: '#3349FF',
    padding: 10,
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 24,
    width: "80%",
    height: 40
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  dropDownontainer:{
    flex: 1,
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  dropDown:{
    width: "100%",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  flatlist:{
    backgroundColor:"#EFE1E1"
  }
});

export default AddPatientScreen;
