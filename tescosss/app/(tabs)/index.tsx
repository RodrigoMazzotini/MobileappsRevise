import { Image, StyleSheet, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';


export default function HomeScreen() {
  return (

          <ThemedText style= {styles.baseStyle } type="defaultSemiBold">
            {Platform.select({
              ios: 'Apple',
              android: 'Android',
              web: 'Web'
            })}
          </ThemedText>
          
  );
}
const styles = StyleSheet.create({
  baseStyle:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    padding: 100, 
    color: 'green',
    backgroundColor: 'black'



  }

});