
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  <View style={styles.container}>
    <StatusBar backgroundColor="#2c3e50" />
    <Text style={styles.title}>Login</Text>

    <View style={styles.inputContainer}>
      <Text style={styles.inputContainer}>Username</Text>
      <TextInput
       style={styles.input}
       placeholder="Enter your username"
       value={username}
       onChangeText={setUsername}
       autoCapitalize="none"
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputContainer}>Password</Text>
      <TextInput
       style={styles.input}
       placeholder="Enter your password"
       value={password}
       onChangeText={setPassword}
       secureTextEntry
      />
    </View>


       <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={!username || !password}
    >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity> 

    <Text style={styles.hint}>
      (Hint: use user1/password1 or user2/password2)
    </Text>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    color: '#34495e'
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  logoutbutton: {
    width: '100%',
    height: 50,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 20,
  },
  hint: {
    marginTop: 20,
    color: '#7f8c8d',
    fontSize: 14,
  }
});

// #FFCFAD
// #4B0907
// #C95603
// #F57200
// #F4442E