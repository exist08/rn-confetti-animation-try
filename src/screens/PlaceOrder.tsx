import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Shadow } from 'react-native-shadow-2'
import { Confetti, ConfettiMethods } from 'react-native-fast-confetti'
import { RootStackParamsList } from '../types/navigation'
import { NavigationProp, useNavigation, RouteProp, useRoute, StackActions } from '@react-navigation/native'

// Define the navigation params type for this screen
type PlaceOrderParams = {
  productId: number
  productTitle: string
  productPrice: number
}

type PlaceOrderRouteProp = RouteProp<{ params: PlaceOrderParams }, 'params'>

const PlaceOrder: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const confettiRef = useRef<ConfettiMethods>(null)
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>()
    const route = useRoute<PlaceOrderRouteProp>()
    const { productId, productTitle, productPrice } = route.params || {}

    const handleOrder = async () =>{
        try{
            setLoading(true)
            // Simulate a network request
            await new Promise(resolve => setTimeout(resolve, 2000))
            Alert.alert('Order placed successfully!', `${productTitle} : ${productPrice}`)
        } catch (error) {
            Alert.alert('Failed to place order')
        } finally {
            setLoading(false)
            setOrderPlaced(true)
            confettiRef.current?.restart()
            await new Promise(resolve => setTimeout(resolve, 3000))
            // navigation.dispatch(StackActions.pop(2)) //pop 2 screens back
            navigation.dispatch(StackActions.popToTop())
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>PlaceOrder</Text>
            <Shadow distance={5} startColor={'#ffa50066'} endColor={'#ffa50000'} offset={[0, 5]}>
                <Pressable style={{ borderRadius: 10, backgroundColor: '#c454f0dd' }}
                    onPress={handleOrder}
                    android_ripple={{ color: '#ffa50066' }}
                    disabled={loading}
                >
                    {
                        !loading ? (
                            <Text style={{ fontSize: 20, padding: 20, fontWeight: 'bold' }}>Order Now</Text>
                        ):(
                            <ActivityIndicator
                            size="small"
                            color="#000"
                            animating={loading}
                            style={{ padding: 20 }}
                            />
                        )
                    }
                </Pressable>
            </Shadow>
            {orderPlaced && (
                <Confetti
                    ref={confettiRef}
                    count={200}
                    fallDuration={5000}
                    colors={['#FFD700', '#FF4500', '#00BFFF', '#32CD32']}
                    autoplay={true}
                    isInfinite={false}
                    onAnimationEnd={() => setOrderPlaced(false)}
                    style={StyleSheet.absoluteFillObject}
                />
            )}
        </View>
    )
}

export default PlaceOrder

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
    },
})