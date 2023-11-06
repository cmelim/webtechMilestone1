import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function UserProfileScreen({  navigation }) {
  // Get the details passed from the previous page

  return (
    <View style={styles.container}>
      <Text style={styles.nameLabel}>Camilo Meli</Text>
      
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detailInfo}>Male</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone Number:</Text>
          <Text style={styles.detailInfo}>+1 (111) 111 1111</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>email Id:</Text>
          <Text style={styles.detailInfo}>camilo.meli@gmail.com</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Profession:</Text>
          <Text style={styles.detailInfo}>Doctor</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.buttonFilled} onPress={() => navigation.navigate('Edit User Profile')}>
            <Icon name="edit" size={20} color="white" />
          </TouchableOpacity>
          
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'Top',
    alignItems: 'center',
    backgroundColor: '#EFE1E1',
    paddingTop : 20  
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
    marginTop : 20
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
  },

  nameLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    
  },
  detailInfo: {
    fontSize: 16,
    width: '50%',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
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

export default UserProfileScreen;
