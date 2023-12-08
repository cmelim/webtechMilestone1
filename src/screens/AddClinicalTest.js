import React, {useState} from 'react';
import {Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

function AddClinicalTestScreen({ navigation, route}) {

  const {patientID} = route.params;

  const [date, setDate] = useState('');
  const [bodyTemperature, setBodyTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState('');
  const [pulseRate, setPulseRate] = useState('');

  const newClinicalTestData = {
    date,
    bodyTemperature,
    bloodPressure,
    respiratoryRate,
    bloodOxygenLevel,
    pulseRate
  }
  
  const handleAddTest = () => {

    if (!date || !bodyTemperature || !bloodPressure || !respiratoryRate || !bloodOxygenLevel || !pulseRate ) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    // Validate date format (YYYY-MM-DD)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      Alert.alert('Validation Error', 'Please enter a valid date in the format YYYY-MM-DD.');
      return;
    }

    if (!/^\d+$/.test(bodyTemperature) || !/^\d+$/.test(respiratoryRate) || !/^\d+$/.test(bloodOxygenLevel) || !/^\d+$/.test(pulseRate)) {
      Alert.alert('Validation Error', 'Body Temperature, Respiratory Rate,  Blood Oxygen Level and Pulse Rate should be numbers.');
      return;
    }

    fetch(`https://customer-care-api-hf68.onrender.com/patients/${patientID._id}/tests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClinicalTestData),
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('Data from API:', data);
      navigation.navigate('ClinicalTests', { patientID: patientID });
    })
    .catch(error => {
      console.error('Error adding tests:', error);
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
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <Text style={styles.inputLabel}>Body Temperature</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Body Tempertaure (X°C)"
        value={bodyTemperature}
        onChangeText={(text) => setBodyTemperature(text)}
      />
      <Text style={styles.inputLabel}>Bloood Pressure</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Blood Pressure (X/Y mmHg)"
        value={bloodPressure}
        onChangeText={(text) => setBloodPressure(text)}
      />
      <Text style={styles.inputLabel}>Respiratory Rate</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Respiratory Rate (X/min)"
        value={respiratoryRate}
        onChangeText={(text) => setRespiratoryRate(text)}
      />
      <Text style={styles.inputLabel}>Blood Oxygen Level</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Blood Oxygen Level (X%)"
        value={bloodOxygenLevel}
        onChangeText={(text) => setBloodOxygenLevel(text)}
      />
      <Text style={styles.inputLabel}>Pulse Rate</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Pulse Rate (Xbpm)"
        value={pulseRate}
        onChangeText={(text) => setPulseRate(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleAddTest}>
        <Text style={styles.loginButtonText}>Add Test</Text>
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
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 4,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  inputLabel:{
    fontSize: 12,
    marginTop: 8
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
    marginTop : 30
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

export default AddClinicalTestScreen;
