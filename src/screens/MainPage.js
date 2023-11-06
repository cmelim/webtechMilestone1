import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardButton from '../components/CardButton';

function MainPage({ navigation }) {
    const handleCardClick = (destination) => {
      navigation.navigate(destination);
    };
  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.username}>Hello</Text>
          <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
            <Icon name="user" size={24} color="black" />
            {isDropdownOpen && (
              <View style={styles.dropdownContent}>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => navigation.navigate('User Profile')}>
                  <Text>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <CardButton
          style={styles.card} // Pass the style here
          imageSource={require('../../assets/person-care.jpg')}
          title="All Patients"
          onPress={() => handleCardClick('AllPatients')}
        />
        <CardButton
          style={styles.card} // Pass the style here
          imageSource={require('../../assets/critical.png')}
          title="Critical Patients"
          onPress={() => handleCardClick('CriticalPatients')}
        />
        <CardButton
          style={styles.card} // Pass the style here
          imageSource={require('../../assets/Blood_pressure_monitoring.jpg')}
          title="Clinical Tests"
          onPress={() => handleCardClick('ClinicalTests')}
        />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFE1E1',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    zIndex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContent: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 30,
    right: 0,
    width: 100,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    height: 900,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 16,
  },
  cardGroup: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cardButton: {
    flex: 1,
    backgroundColor: '#3349FF',
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 800,
  },
  cardButtonText: {
    color: 'white',
  },
});

export default MainPage;
