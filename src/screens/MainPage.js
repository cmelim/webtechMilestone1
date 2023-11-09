import React, { useState,useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardButton from '../components/CardButton';

function MainPage({ navigation }) {
  const handleCardClick = (destination) => {
    navigation.navigate(destination);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleDropdownPress = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (destination) => {
    closeDropdown();
    navigation.navigate(destination);
  };
  return (

    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.username}>Hello Dr Smith</Text>
          <TouchableOpacity
            ref={dropdownRef}
            style={styles.dropdown}
            onPress={handleDropdownPress}
          >
            <Icon name="user-md" size={24} color="black" />
            {isDropdownOpen && (
              <View style={styles.dropdownContent}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleDropdownItemClick('User Profile')}
                >
                  <Text>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleDropdownItemClick('Login')}
                >
                  <Text>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.scrollview}>
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
        <CardButton
          style={styles.card}  
          imageSource={require('../../assets/doctors.jpg')}
          title="Create Doctors Profile"
          onPress={() => handleCardClick('ClinicalTests')}
        />
        </ScrollView>
      </View>
      
      </TouchableWithoutFeedback>
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
  scrollview: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    
  },
  cardButtonText: {
    color: 'white',
  },
});

export default MainPage;

