import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import reduxStore from './redux/store'
import Login from './screens/Login'
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const App = () => {
  const Stack = createNativeStackNavigator()
  return <>
    <PaperProvider>
      <Provider store={reduxStore}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>


  </>
}

export default App

const styles = StyleSheet.create({})