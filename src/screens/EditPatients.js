import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,ScrollView,SafeAreaView  } from 'react-native';
import RadioButtonGroup from './../components/RadioButtonGroup';

function EditPatientDeatails({ navigation }) {
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
    // Add your registration logic here
    console.log('Registering with the following information:');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
    console.log('Height:', height);
    console.log('Weight:', weight);
    console.log('Gender:', gender);
    console.log('Address:', address);
    navigation.navigate('AllPatients');
  };

  return (
   
    <ScrollView style={styles.scrollView}>
     <SafeAreaView  style={styles.container}>
        
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
        <Text style={styles.loginButtonText}>Update</Text>
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
    backgroundColor: '#EFF0FC',
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
    backgroundColor: 'white'
  },

  labelContainer: {
    width : 300,
    flexDirection: 'Column',
    alignItems: 'left', // Center the labels
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
    backgroundColor: '#EFF0FC',
  },
});

export default EditPatientDeatails;
