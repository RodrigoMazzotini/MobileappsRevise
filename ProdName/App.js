import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  return (
    <View style={styles.header}>
      <Text style ={styles.text}>ProdName</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#4B0907',
    alignItems: 'center',
    justifyContent: 'center',
    height:100,
  },
  text: {
    color:'#FFCFAD',
    fontSize:'40px',
    fontweight: 'bold',


  }


});
// #FFCFAD
// #4B0907
// #C95603
// #F57200
// #F4442E

const USERS_DATA = {
  "users": [
    {
      "username": "mainMan", 
      "password": "sauce"
    },
    {
      "username": "sideKick",
      "password": "cheese"
    }

  ]
};

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

useEffect(()  => {
  const checkLoginStatus = async () => {
    try {
      const userValue = await AsyncStorage.getItem('currentUser');
      if (userValue !== null) {
        setCurrentUser(JSON.parse(userValue));
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.error('Failed to load login status:', e);
    }
  };
  
  checkLoginStatus();
}, []);

const handleLogin = () => {

  const user = USERS_DATA.user.find(
    user => user.username === username && user.password === password
  );

  if (user) {
    saveUserSession(user);
    setCurrentUser(user);
    setIsLoggedIn(true);
    setUsername('');
    setPassword('');
    Alert.alert('Success', 'You are Logged in successfully!');
  } else {
    Alert.alert('Error', 'Invalid username or password');
  }
};

const saveUserSession = async (user) => {
  try {
    await AsyncStorage.setItem('currentUser', JSON. stringify(user));
  } catch (e) {
    console.error('Failed to save user session:', e);
  }
};

const handleLogout = async () => {
  try {
    await AsyncStorage.rwmoveItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    Alert.alert('Success', 'You have been logged out');
  } catch (e) {
    console.error('Failed to log out:', e);
  }
};

if (isLoggedIn) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2c3e50" />
      <Text style={styles.welcomeText}>welcome, {currentUser.usernamee}!</Text>
      <Text style={styles.infoText}>You are now logged in.</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

return (
  <View style={styles.container}></View>
)
}