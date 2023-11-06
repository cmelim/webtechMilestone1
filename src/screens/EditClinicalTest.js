import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,ScrollView,SafeAreaView  } from 'react-native';
import RadioButtonGroup from './../components/RadioButtonGroup';

function EditClinicalTestScreen({ navigation }) {
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState('');
  const [heartbeatRate, setHeartbeatRate] = useState('');
  const [chiefcomplaint, setChiefcomplaint] = useState('');
  const [pastMedicalHistory, setPastMedicalHistory] = useState('');
  const [medicalDiagnosis, setMedicalDiagnosis] = useState('');
  const [medicalPrescription, setMedicalPrescription] = useState('');

  

  const handleRegister = () => {
    // Add your registration logic here
    console.log('Registering with the following information:');
    console.log('bloodPressure:', bloodPressure);
    console.log('respiratoryRate:', respiratoryRate);
    console.log('bloodOxygenLevel:', bloodOxygenLevel);
    console.log('heartbeatRate:', heartbeatRate);
    console.log('chiefcomplaint:', chiefcomplaint);
    console.log('pastMedicalHistory:', pastMedicalHistory);
    console.log('medicalDiagnosis:', medicalDiagnosis);
    console.log('medicalPrescription:', medicalPrescription);

    navigation.navigate('ClinicalTests');

  };

  return (
   
    <ScrollView style={styles.scrollView}>
     <SafeAreaView  style={styles.container}>
        
      {/* <Text style={styles.heading}></Text> */}
      <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailInfo}>Angelina Jolie</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Case Number:</Text>
          <Text style={styles.detailInfo}>123456</Text>
        </View>
      <TextInput
        style={styles.input}
        placeholder="Enter Blood Pressure (X/Y mmHg)"
        value={bloodPressure}
        onChangeText={(text) => setBloodPressure(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Respiratory Rate (X/min)"
        value={respiratoryRate}
        onChangeText={(text) => setRespiratoryRate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Blood Oxygen Level (X%)"
        value={bloodOxygenLevel}
        onChangeText={(text) => setBloodOxygenLevel(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Heartbeat Rate (X/min)"
        value={heartbeatRate}
        onChangeText={(text) => setHeartbeatRate(text)}
      />

      <TextInput
        style={styles.inputForMultilines}
        placeholder="Patient’s chief complaint"
        value={chiefcomplaint}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setChiefcomplaint(text)}
      />
      <TextInput
        style={styles.inputForMultilines}
        placeholder="Patient’s past medical history"
        value={pastMedicalHistory}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setPastMedicalHistory(text)}
      />

      <TextInput
        style={styles.inputForMultilines}
        placeholder="medical diagnosis"
        value={medicalDiagnosis}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setMedicalDiagnosis(text)}
      />

      <TextInput
        style={styles.inputForMultilines}
        placeholder="medical prescription"
        value={medicalPrescription}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setMedicalPrescription(text)}
      />

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
    marginTop : 10,
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
    marginBottom : 30
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },

  scrollView: {
    backgroundColor: '#EFE1E1',
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

});

export default EditClinicalTestScreen;
