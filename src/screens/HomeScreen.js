import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FontAwesome name="user" size={170} color="#3349FF" />
      <Text style={styles.appName}> Clinic Service</Text>
      <Text style={styles.slogan}>Care for you</Text>
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
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3349FF',
  },
  slogan: {
    fontSize: 30,
    color: '#3349FF',
  },
});

export default SplashScreen;
