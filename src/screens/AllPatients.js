import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

function AllPatients({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [patients, setPatients] = useState([]); // State to store the list of patients

  useEffect(() => {
    // Fetch patients from your server when the component mounts
    /*
    axios
      .get('http://localhost:8080/api/patient/')
      .then((response) => {
        // Log the response to inspect its structure
        console.log('Response data:', response.data);
  
        if (Array.isArray(response.data)) { // Verificar si la respuesta es un array directamente
          console.log('Ver pacientes:');
  
          // Convert the array of JSON objects to a JSON string
          const patientsJSON = JSON.stringify(response.data, null, 2);
  
          // Log the JSON string to the console
          console.log('Patients data in JSON format:', patientsJSON);
  
          setPatients(response.data);
        } else {
          console.error('Invalid data format - expected an array of patients');
        }
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      })/
      
      */
     fetchPatients();
  }, []);
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/patient/');
      if (Array.isArray(response.data)) {
        setPatients(response.data);
      } else {
        console.error('Invalid data format - expected an array of patients');
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };
 
  const handleDeletePatient = (patientId) => {

    const patientToDelete = patients.find((patient) => patient._id === patientId);

    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete the patient with ID: ${patientId}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel', // Opción de cancelar
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Realiza una solicitud DELETE al servidor para eliminar el paciente
              await axios.delete(`http://localhost:8080/api/patient/delete/${patientId}`);
  
              // Actualiza la lista de pacientes después de eliminar al paciente
              setPatients((prevPatients) => prevPatients.filter((patient) => patient._id !== patientId));

              fetchPatients();
            } catch (error) {
              console.error('Error deleting patient:', error);
            }
          },
        },
      ]
    );
  };
  

  const handleSearch = () => {
    // Implement your search logic here
    // You can use the 'searchText' state to filter the list of patients
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Patients by name or email"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPatients')}>
          <Icon name="user-plus" size={17} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {patients.map((patient, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardName}>{patient.firstName}</Text>
              <Text style={styles.cardInfo}>Case Number: {patient._id}</Text>
              {/* Display other patient details as needed */}
            </View>
            <View style={styles.cardRight}>
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.buttonFilled} onPress={() => { handleDeletePatient(patient.id)}}>
                  <Icon name="trash" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFilled} onPress={() => { navigation.navigate('Edit Patient Details') }}>
                  <Icon name="pencil" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.viewDetailsButton} onPress={() => { navigation.navigate('Patient Details') }}>
                <Text style={styles.viewDetailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    marginTop: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    padding: 5,
  },
  searchButton: {
    padding: 10,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3349FF',
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    margin: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLeft: {
    width: '60%',
    paddingTop: 15,
    paddingBottom: 10,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  cardName: {
    fontSize: 18,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  cardInfo: {
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
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
  viewDetailsButton: {
    backgroundColor: '#3349FF',
    borderRadius: 10,
    padding: 10,
  },
  viewDetailsButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AllPatients;
