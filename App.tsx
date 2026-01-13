import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import Home from './src/screens/Home'
import Details from './src/screens/Details'
import ConfettiAnim from './src/screens/ConfettiAnim'
import Toaster from './src/screens/Toaster'
import ShadowButton from './src/screens/ShadowButton'
import PlaceOrder from './src/screens/PlaceOrder'
import ProductList from './src/screens/ProductList'
import ProductDetails from './src/screens/ProductDetails'
import BuyProduct from './src/screens/BuyProduct'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        onStateChange={state => {
          const stackNames = state.routes.map(r => r.name);
          console.log('[Navigator] stack:', stackNames, 'focused:', stackNames[state.index]);
        }}
      >
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="ConfettiAnim" component={ConfettiAnim} />
          <Stack.Screen name="Toaster" component={Toaster} />
          <Stack.Screen name="ShadowButton" component={ShadowButton} />
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="BuyProduct" component={BuyProduct} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})