import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//AAGC 22/02/2023
export default function App() {
  return (
    <View style={styles.container}>
      <Text>AAGC Android</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
