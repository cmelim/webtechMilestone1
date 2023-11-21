import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function PatientsDetailsScreen({ navigation, route }) {

  const [patientData, setPatientData] = useState(patientID);
  
  // Get the details passed from the previous page
  const {patientID} = route.params;

  // Helper function to format phone numbers
  const formatPhoneNumber = (phoneNumber) => {
    return `+1 (${phoneNumber.toString().slice(0, 3)}) ${phoneNumber.toString().slice(3, 6)}-${phoneNumber.toString().slice(6)}`;
  };
  // Format the phone number
  const formattedPhoneNumber = formatPhoneNumber(patientID.phoneNumber);

  // Format emergency contact phone numbers
  const formattedPhoneNumberEmergencyContact = formatPhoneNumber(patientID.emergencyContact.phoneNumber);

  const dateOptions = {
    timeZone: 'UTC',
    year: "numeric",
    month: "long",
    day:"numeric"
  };
  
  // Delete a patient
  const deleteUser = (userId) => {
    fetch(`https://customer-care-api-hf68.onrender.com/patients/${userId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Handle success (e.g., update state, show a success message)
        console.log('User deleted successfully');
        // Show success alert
        Alert.alert('Deleted', 'User successfully deleted');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        // Log the error response from the server
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
      });
  };

  // Delete handler
  const handleDelete = () => {
    deleteUser(patientID._id); 
    navigation.navigate('AllPatients'); 
  };

  useEffect(() => {
    setPatientData(route.params.patientID);
  }, [route.params.patientID]);


  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.buttonFilled} onPress={handleDelete}>
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFilled} onPress={() =>  navigation.navigate('Edit Patient Details', { patientID }) }>
          <Icon name="edit" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.nameLabel}>{patientID.firstName} {patientID.lastName}</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>ID Number:</Text>
        <Text style={styles.detailInfo}>{patientID._id}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date of Birth:</Text>
        <Text style={styles.detailInfo}>{new Date(patientID.dateOfBirth).toLocaleDateString('en-CA', dateOptions)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Gender:</Text>
        <Text style={styles.detailInfo}>{patientID.gender}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Address:</Text>
        <Text style={styles.detailInfo}>{patientID.address}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Phone Number:</Text>
        <Text style={styles.detailInfo}>{formattedPhoneNumber}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Email:</Text>
        <Text style={styles.detailInfo}>{patientID.email}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Height:</Text>
        <Text style={styles.detailInfo}>{patientID.height} cm</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Weight:</Text>
        <Text style={styles.detailInfo}>{patientID.weight} kg</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Blood Type:</Text>
        <Text style={styles.detailInfo}>{patientID.bloodType}</Text>
      </View>
      <Text style={styles.emergencyContactLabel}>Emergency Contact</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Full Name:</Text>
        <Text style={styles.detailInfo}>{patientID.emergencyContact.firstName} {patientID.emergencyContact.lastName} </Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Relationship:</Text>
        <Text style={styles.detailInfo}>{patientID.emergencyContact.relationship}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Phone Number:</Text>
        <Text style={styles.detailInfo}>{formattedPhoneNumberEmergencyContact}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'Top',
    alignItems: 'center',
    backgroundColor: '#EFE1E1',
    paddingTop : 8  
}, 
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    marginTop: 20,
  },
  pageHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3349FF',
  },
  detailsContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    marginTop : 16
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
  },

  nameLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 8,
  },
  emergencyContactLabel:{
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  detailInfo: {
    fontSize: 16,
    width: '50%',
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent:'flex-end',
    marginRight: 16
  },
  buttonFilled: {
    backgroundColor: '#3349FF',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PatientsDetailsScreen;
