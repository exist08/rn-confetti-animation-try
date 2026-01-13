import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamsList } from '../types/navigation'

const Home = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>()
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home</Text>
            <Pressable onPress={() => navigation.navigate('Details')}>
                <Text style={styles.text}>Go to Details</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ConfettiAnim')}>
                <Text style={styles.text}>Go to Confetti Animation</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Toaster')}>
                <Text style={styles.text}>Go to Toaster</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ShadowButton')}>
                <Text style={styles.text}>Go to Shadow Button</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('PlaceOrder')}>
                <Text style={styles.text}>Go to Place Order</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ProductList')}
                style={styles.productListButton}
                >
                <Text style={[styles.text,{fontWeight: 700}]}>Go to Product List</Text>
            </Pressable>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: '#333',
    },
    productListButton: {
        marginTop: 20,
        padding: 10,
        paddingHorizontal: 30,
        backgroundColor: "#03e9f4",
        borderRadius: 10,
    }
})