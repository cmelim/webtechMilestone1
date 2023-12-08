import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

function EditClinicalTest({ navigation, route }) {
  
  // Get the details passed from the previous page
  const {patientID, testID} = route.params;
  console.log(testID)
  console.log(testID.bloodOxygenLevel)
  console.log(testID.respiratoryRate)

  
  const [date, setDate] = useState(new Date(testID.date).toISOString().split('T')[0]);
  const [bodyTemperature, setBodyTemperature] = useState(testID.bodyTemperature);
  const [bloodPressure, setBloodPressure] = useState(testID.bloodPressure);
  const [respiratoryRate, setRespiratoryRate] = useState(testID.respiratoryRate);
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState(testID.bloodOxygenLevel);
  const [pulseRate, setPulseRate] = useState(testID.pulseRate);

  const updateTest = (patientID, testID) => {
    const updatedTestDetail = {
      date,
      bodyTemperature,
      bloodPressure,
      respiratoryRate,
      bloodOxygenLevel,
      pulseRate
    };

    fetch(`https://customer-care-api-hf68.onrender.com/patients/${patientID}/tests/${testID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTestDetail),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Patient details updated successfully:', data);
        navigation.navigate('ClinicalTests', { patientID: patientID });
      })
      .catch(error => {
        console.error('Error updating patient details:', error);
      });
  };

  const handleUpdate = async () => {
    await updateTest(patientID._id, testID._id);
    // Refetch updated patient details
    fetch(`https://customer-care-api-hf68.onrender.com/patients/${patientID._id}/tests/${testID._id}`)
      .then(response => response.json())
      .then(updatedTestData => {
        // Navigate back to PatientDetailsScreen with the updated data
        navigation.navigate('ClinicalTests', { patientID: updatedTestData });
      })
      .catch(error => {
        console.error('Error fetching updated patient details:', error);
      });
  };


  return (
    <FlatList
    style={styles.flatlist}
    data={[{ key: 'form' }]}
    renderItem={() => (
    <SafeAreaView  style={styles.container}>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Name:</Text>
        <Text style={styles.detailInfo}>{patientID.firstName} {patientID.lastName}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>ID Number:</Text>
        <Text style={styles.detailInfo}>{patientID._id}</Text>
      </View>
      <Text style={styles.inputLabel}>Test Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <Text style={styles.inputLabel}>Body Temperature</Text>
      <TextInput
        style={styles.input}
        value={bodyTemperature.toString()}
        onChangeText={(text) => setBodyTemperature(text)}
      />
      <Text style={styles.inputLabel}>Blood Pressure</Text>
      <TextInput
        style={styles.input}
        value={bloodPressure}
        onChangeText={(text) => setBloodPressure(text)}
      />
      <Text style={styles.inputLabel}>Respiratory Rate</Text>
      <TextInput
        style={styles.input}
        value={respiratoryRate.toString()}
        onChangeText={(text) => setRespiratoryRate(text)}
      />
      <Text style={styles.inputLabel}>Blood Oxygen Level</Text>
      <TextInput
        style={styles.input}
        value={bloodOxygenLevel.toString()}
        onChangeText={(text) => setBloodOxygenLevel(text)}
      />
      <Text style={styles.inputLabel}>Pulse Rate</Text>
      <TextInput
        style={styles.input}
        value={pulseRate.toString()}
        onChangeText={(text) => setPulseRate(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleUpdate}>
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
    width: "80%",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 10,
    marginBottom: 4,
    backgroundColor: 'white'
  },
  inputLabel:{
    fontSize: 12,
    marginTop: 4
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
    marginBottom : 30
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },

  detailRow: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginTop : 20
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
  },

  detailInfo: {
    fontSize: 16,
    width: '50%',
  },
  flatlist:{
    backgroundColor:"#EFE1E1"
  }

});

export default EditClinicalTest;
