import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function AllPatients({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [patients, setPatients] = useState([]); // State to store the list of patients
  const [originalPatients, setOriginalPatients] = useState([]);

  // Search for patients
  const handleSearch = useCallback(() => {
    if (searchText.trim() === '') {
      // If the search text is empty, use the original list of patients
      setPatients(originalPatients);
    } else {
      // Filter the list of patients based on searchText
      const filteredPatients = originalPatients.filter(patient => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
        const email = patient.email.toLowerCase();
        const searchLowerCase = searchText.toLowerCase();
        return fullName.includes(searchLowerCase) || email.includes(searchLowerCase);
      });

      // Update the state with the filtered patients
      setPatients(filteredPatients);
    }
  }, [searchText, originalPatients]);

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
        // Reload the screen by fetching the updated patient list
        fetchPatients();
      })
      .catch(error => {
        // Handle error (e.g., show an error message)
        console.error('Error deleting user:', error);
      });
  };

  // Fetches the patient list
  const fetchPatients = useCallback(() => {
    fetch('https://customer-care-api-hf68.onrender.com/patients')
      .then(response => response.json())
      .then(data => {
        const formattedPatients = data.map(patient => ({
          ...patient,
          formattedPhoneNumber: `+1 (${patient.phoneNumber.toString().slice(0, 3)}) ${patient.phoneNumber.toString().slice(3, 6)}-${patient.phoneNumber.toString().slice(6)}`
        }));
        setPatients(formattedPatients);
        // Save the original list of patients
        setOriginalPatients(formattedPatients);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Load the list of patients
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Automatically fetch data when searchText changes
  useEffect(() => {
    if (searchText.trim() === '') {
      fetchPatients();
    }
  }, [searchText, fetchPatients]);

  // Use the useFocusEffect hook to refetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchPatients();
    }, [fetchPatients])
  );

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
              <Text style={styles.cardName}>{patient.firstName} {patient.lastName}</Text>
              <Text style={styles.cardInfo}>{patient.address}</Text>
              <Text style={styles.cardInfo}>{patient.email}</Text>
              <Text style={styles.cardInfo}>{patient.formattedPhoneNumber}</Text>
            </View>
            <View style={styles.cardRight}>
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.buttonFilled}  onPress={() => deleteUser(patient._id)}>
                  <Icon name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.viewDetailsButton} onPress={() => navigation.navigate('Patient Details', { patientID: patient })}>
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
    width: '95%',
    borderRadius: 10,
    margin: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLeft: {
    width: '70%',
    paddingTop: 16,
    paddingBottom: 16,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  cardName: {
    fontSize: 18,
    paddingBottom: 8,
    fontWeight: 'bold',
  },
  cardInfo: {
    fontSize: 16,
    paddingBottom: 4,
  },
  buttonGroup: {
    padding: 8,
    flexDirection: 'row',
  },
  buttonFilled: {
    backgroundColor: '#3349FF',
    borderRadius: 8,
    padding: 8,
    margin: 8,
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
    borderRadius: 8,
    padding: 8,
    margin: 8,
  },
  viewDetailsButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AllPatients;
