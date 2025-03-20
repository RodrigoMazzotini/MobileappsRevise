import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

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