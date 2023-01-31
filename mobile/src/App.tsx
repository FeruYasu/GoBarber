import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';
import AppProvider from './hooks';
import Routes from './routes';
import Theme from './styles/themes/theme';

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e38"
        translucent
      />
      <AppProvider>
        <Theme>
          <View style={{ flex: 1, backgroundColor: '#312E38' }}>
            <Routes />
          </View>
        </Theme>
      </AppProvider>
    </NavigationContainer>
  );
}

export default App;
