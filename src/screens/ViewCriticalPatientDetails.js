import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ViewCritricalPatientDetails({ route }) {
  // Get the details passed from the previous page
//   const { name, caseNumber, testDate, bloodPressure, respiratoryRate, bloodOxygenLevel, heartRate, gender, chiefComplaint, pastMedicalHistory, medicalDiagnosis, medicalPrescription } = route.params;

  return (
    <View style={styles.container}>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Patient's Name:</Text>
          <Text style={styles.detailInfo}>Khanjan</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Case Number:</Text>
          <Text style={styles.detailInfo}>123456</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Blood Pressure:</Text>
          <Text style={styles.detailInfo}>112</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Respiratory Rate:</Text>
          <Text style={styles.detailInfo}>11</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Blood Oxygen Level:</Text>
          <Text style={styles.detailInfo}>75</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Heart Rate:</Text>
          <Text style={styles.detailInfo}>75</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detailInfo}>Male</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Chief Complaint:</Text>
          <Text style={styles.detailInfo}>fever</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Past Medical History:</Text>
          <Text style={styles.detailInfo}>Fever</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Medical Diagnosis:</Text>
          <Text style={styles.detailInfo}>Fever</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Medical Prescription:</Text>
          <Text style={styles.detailInfo}>Fever</Text>
        </View>
       
      </View>
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
    marginVertical: 5,
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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

export default ViewCritricalPatientDetails;
