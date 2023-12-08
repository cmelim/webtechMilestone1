import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import AddClinicalTest from '../screens/AddClinicalTest';
import AddPatientScreen from '../screens/AddPatients';
import AllPatients from '../screens/AllPatients';
import ClinicalTestDetails from '../screens/ClinicalTestDetails';
import ClinicalTests from '../screens/ClinicalTests';
import CriticalPatients from '../screens/CriticalPatients';
import EditClinicalTest from '../screens/EditClinicalTest';
import EditPatientDeatails from '../screens/EditPatients';
import EditUserProfileScreen from '../screens/EditProfile';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MainPage from '../screens/MainPage';
import PatientsClinicalTests from '../screens/PatientsClinicalTests';
import PatientsDetails from '../screens/PatientsDetails';
import RegisterScreen from '../screens/RegisterScreen';
import UserProfileScreen from '../screens/UserProfile';
import ViewCritricalPatientDetails from '../screens/ViewCriticalPatientDetails';


function AppNavigator() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerTitle:'Login'}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerTitle:'Welcome'}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerTitle:'Register Here'}}/>
        <Stack.Screen name="Main" component={MainPage} options={{headerLeft: null, headerTitle: 'Main Page'}}/>
        <Stack.Screen name="AllPatients" component={AllPatients} options={{headerTitle:'All Patients'}} />
        <Stack.Screen name="CriticalPatients" component={CriticalPatients} options={{headerTitle:'Critical Patients'}}/>
        <Stack.Screen name="PatientsClinicalTests" component={PatientsClinicalTests} options={{headerTitle:'Patients Clinical Tests'}}/>
        <Stack.Screen name="ClinicalTests" component={ClinicalTests} options={{headerTitle:'Clinical Tests'}}/>
        <Stack.Screen name="ClinicalTestDetails" component={ClinicalTestDetails} options={{headerTitle:'Clinical Test Data'}}/>
        <Stack.Screen name="AddPatients" component={AddPatientScreen} options={{headerTitle:'Add Patients'}}/>
        <Stack.Screen name="Edit Patient Details" component={EditPatientDeatails} options={{headerTitle:'Edit Details'}}/>
        <Stack.Screen name="Patient Details" component={PatientsDetails} options={{headerTitle:'Patient Details'}}/>
        <Stack.Screen name="Add Clinical Test" component={AddClinicalTest} options={{headerTitle:'Add Clinical Test'}} />
        <Stack.Screen name="Edit Clinical Test" component={EditClinicalTest} options={{headerTitle:'Edit Clinical Test'}} />
        <Stack.Screen name="Critrical Patient Details" component={ViewCritricalPatientDetails} options={{headerTitle:'Critical Patients'}} />
        <Stack.Screen name="User Profile" component={UserProfileScreen} options={{headerTitle:'Profile'}}/>
        <Stack.Screen name="Edit User Profile" component={EditUserProfileScreen} options={{headerTitle:'Edit Profile'}} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
