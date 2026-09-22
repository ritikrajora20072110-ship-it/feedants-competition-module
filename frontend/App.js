import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CompetitionDetailsScreen } from './src/screens/CompetitionDetailsScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.rootContainer}>
        <CompetitionDetailsScreen />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#F1F5F9' : '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
