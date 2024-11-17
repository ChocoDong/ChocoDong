import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// src 폴더 내의 컴포넌트들을 import
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';

// Stack Navigator 타입 정의
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#ffffff',
              },
              headerTintColor: '#000000',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShadowVisible: false,
              headerBackTitle: '뒤로가기',
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: '로그인',
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: '회원가입',
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: '홈',
                headerBackVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;