import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ClinicalTests({ navigation, route }) {

    // Get the ID passed from previous details
    const { patientID } = route.params || {};

    const [patientTests, setPatientTests] = useState([]);

    // Fetches the test patient list
    const fetchPatientsTests = useCallback(() => {
        fetch(`https://customer-care-api-hf68.onrender.com/patients/${patientID._id}/tests`)
        .then(response => response.json())
        .then(data => setPatientTests(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Load the list of patients
    useEffect(() => {
        fetchPatientsTests();
    },[fetchPatientsTests]);

    // Delete a patient
    const onDeleteTestPress = (patientID, testID) => {
        fetch(`https://customer-care-api-hf68.onrender.com/patients/${patientID}/tests/${testID}`, {
        method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Handle success (e.g., update state, show a success message)
            console.log('Test deleted successfully');
            // Show success alert
            Alert.alert('Deleted', 'Test successfully deleted');
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            // Log the error response from the server
            if (error.response) {
            console.error('Error response:', error.response.data);
            }
        });
    };

    const dateOptions = {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return (
        <View style={styles.container}>
            <View style={styles.testheader}>
            <Text style={styles.cardName}>{patientID.firstName} {patientID.lastName}</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add Clinical Test', {patientID: patientID})}>
                        <Icon name="plus" size={16} color="white" />
                    </TouchableOpacity>
            </View>
                <ScrollView contentContainerStyle={styles.cardContainer}>
                    {patientTests.map((tests, index) => (
                    <View style={styles.card} key={index}>
                        <View style={styles.cardLeft}>
                            <Text style={styles.cardInfo}>
                                <Text style={{ fontWeight: 'bold' }}>Test Date: </Text> {new Date(tests.date).toLocaleDateString('en-CA', dateOptions)}
                            </Text>
                            <Text style={styles.cardInfo}><Text style={{ fontWeight: 'bold' }}>Body Temperature: </Text>{tests.bodyTemperature} °C</Text>
                            <Text style={styles.cardInfo}><Text style={{ fontWeight: 'bold' }}>Blood Pressure: </Text>{tests.bloodPressure} mmHg</Text>
                            <Text style={styles.cardInfo}><Text style={{ fontWeight: 'bold' }}>Respiratory Rate: </Text>{tests.respiratoryRate} bpm</Text>
                            <Text style={styles.cardInfo}><Text style={{ fontWeight: 'bold' }}>Blood Oxygen Level: </Text>{tests.bloodOxygenLevel}%</Text>
                            <Text style={styles.cardInfo}><Text style={{ fontWeight: 'bold' }}>Pulse Rate: </Text>{tests.pulseRate} bpm</Text>
                        </View>
                        <View style={styles.cardRight}>
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity style={styles.buttonFilled} onPress={() => navigation.navigate('Edit Clinical Test', { patientID: patientID, testID: tests})}>
                                    <Icon name="pencil" size={16} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonFilled} onPress={() => onDeleteTestPress(patientID._id, tests._id)}>
                                    <Icon name="trash" size={16} color="white" />
                                </TouchableOpacity>
                            </View>
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
    testheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 16,
        marginTop: 16
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
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardLeft: {
        width: '80%',
        paddingTop: 16,
        paddingBottom: 16,
    },
    cardSubLeft: {
        flex: '100%',
        paddingTop: 16,
        paddingBottom: 16,
    },
    cardRight: {
        width: '20%',
        alignItems: 'flex-end',
    },
    cardTest: {
        fontSize: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTestLeft: {
        flex: 0.8,
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: 'center'
    },
    cardTestRight: {
        flex: 0.2,
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: 'center'
    },
    cardName: {
        fontSize: 24,
        paddingBottom: 8,
        fontWeight: 'bold',
    },
    cardInfo: {
        fontSize: 16,
        paddingBottom: 4,
    },
    buttonGroup: {
        padding: 8,
        flexDirection: 'column',
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

export default ClinicalTests