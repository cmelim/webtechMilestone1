import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonGroup from './../components/RadioButtonGroup';

function EditPatientDeatails({ navigation, route }) {

  // Get the details passed from the previous page
  const {patientID} = route.params;
  
  const [firstName, setFirstName] = useState(patientID.firstName);
  const [lastName, setLastName] = useState(patientID.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(patientID.dateOfBirth).toISOString().split('T')[0]);
  const [selectedGender, setSelectedGender] = useState(patientID.gender);
  const [address, setAddress] = useState(patientID.address);
  const [phoneNumber, setPhoneNumber] = useState(patientID.phoneNumber);
  const [email, setEmail] = useState(patientID.email);
  const [height, setHeight] = useState(patientID.height);
  const [weight, setWeight] = useState(patientID.weight);
  const [bloodType, setBloodType] = useState(patientID.bloodType);
  const [emergencyFirstName, setEmergencyFirstName] = useState(patientID.emergencyContact.firstName);
  const [emergencyLastName, setEmergencyLastName] = useState(patientID.emergencyContact.lastName);
  const [emergencyRelationship, setEmergencyRelationship] = useState(patientID.emergencyContact.relationship);
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState(patientID.emergencyContact.phoneNumber);

  const genders = ['Male', 'Female'];

  const dateOptions = {
    timeZone: 'UTC',
  };

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
  

  // Update a patient
  const updateUser = (userId) => {
    const updatedUserDetails = {
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
  
    fetch(`https://customer-care-api-hf68.onrender.com/patients/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserDetails),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Patient details updated successfully:', data);
        navigation.navigate('Patient Details', { patientID });
      })
      .catch(error => {
        console.error('Error updating patient details:', error);
      });
  };

  const handleRegister = async () => {
    await updateUser(patientID._id);
    // Refetch updated patient details
    fetch(`https://customer-care-api-hf68.onrender.com/patients/${patientID._id}`)
      .then(response => response.json())
      .then(updatedPatientData => {
        // Navigate back to PatientDetailsScreen with the updated data
        navigation.navigate('Patient Details', { patientID: updatedPatientData });
      })
      .catch(error => {
        console.error('Error fetching updated patient details:', error);
      });
  };

  // Update the selectedGender when changing
  useEffect(() => {
    setSelectedGender(patientID.gender);
  }, [patientID.gender]);


  return (
    <FlatList
      style={styles.flatlist}
      data={[{ key: 'form' }]}
      renderItem={() => (
        <SafeAreaView style={styles.container}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text)}}
        />
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <Text style={styles.inputLabel}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={dateOfBirth}
          onChangeText={(text) => setDateOfBirth(text)}
        />
        <Text style={styles.inputLabel}>Address</Text>
        <TextInput
          style={styles.input}
          value={address.toString()}
          onChangeText={(text) => setAddress(text)}
        />
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber.toString()}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.inputLabel}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          value={height.toString()}
          onChangeText={(text) => setHeight(text)}
        />
        <Text style={styles.inputLabel}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          value={weight.toString()}
          onChangeText={(text) => setWeight(text)}
        />
        <Text style={styles.inputLabel}>Blood Type</Text>
        <TextInput
          style={styles.input}
          value={bloodType}
          onChangeText={(text) => {
            setBloodType(text)}}
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
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={emergencyFirstName}
          onChangeText={(text) => {
            setEmergencyFirstName(text)}}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={emergencyLastName}
          onChangeText={(text) => {
            setEmergencyLastName(text)}}
        />
        <View style={styles.dropDownontainer}>
        <Text style={styles.label}>Relationship</Text>
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
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={emergencyPhoneNumber.toString()}
          onChangeText={(text) => {
            setEmergencyPhoneNumber(text)}}
        />
        <TouchableOpacity style={styles.updateButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Update</Text>
        </TouchableOpacity>
        </SafeAreaView>
    )}
  />
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

  updateButton: {
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

export default EditPatientDeatails;