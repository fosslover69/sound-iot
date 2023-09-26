import React from 'react';
import { View } from 'react-native';
import ApiChecker from './ApiChecker';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ApiChecker />
    </View>
  );
};

export default App;
