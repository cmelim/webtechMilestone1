import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ClinicalTestDetails({navigation, route }) {
  // Get the details passed from the previous page
  const { name, caseNumber, testDate, bloodPressure, respiratoryRate, bloodOxygenLevel, heartRate, gender, chiefComplaint, pastMedicalHistory, medicalDiagnosis, medicalPrescription } = route.params;

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.pageHeading}>Clinical Test Details</Text>
      </View> */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Patient's Name:</Text>
          <Text style={styles.detailInfo}>{name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Case Number:</Text>
          <Text style={styles.detailInfo}>{caseNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Test Date:</Text>
          <Text style={styles.detailInfo}>{testDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Blood Pressure:</Text>
          <Text style={styles.detailInfo}>{bloodPressure}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Respiratory Rate:</Text>
          <Text style={styles.detailInfo}>{respiratoryRate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Blood Oxygen Level:</Text>
          <Text style={styles.detailInfo}>{bloodOxygenLevel}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Heart Rate:</Text>
          <Text style={styles.detailInfo}>{heartRate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detailInfo}>{gender}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Chief Complaint:</Text>
          <Text style={styles.detailInfo}>{chiefComplaint}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Past Medical History:</Text>
          <Text style={styles.detailInfo}>{pastMedicalHistory}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Medical Diagnosis:</Text>
          <Text style={styles.detailInfo}>{medicalDiagnosis}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Medical Prescription:</Text>
          <Text style={styles.detailInfo}>{medicalPrescription}</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.buttonFilled} onPress={() => navigation.navigate('Edit Clinical Test')}>
            <Icon name="edit" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFilled} onPress={() => { /* Handle delete user action */ }}>
            <Icon name="trash" size={20} color="white" />
          </TouchableOpacity>
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

export default ClinicalTestDetails;
