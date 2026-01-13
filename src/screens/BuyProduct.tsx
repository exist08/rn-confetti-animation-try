import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'

// Define the navigation params type for this screen
type BuyProductParams = {
  productId: number
  productTitle: string
  productPrice: number
}

type BuyProductRouteProp = RouteProp<{ params: BuyProductParams }, 'params'>

const BuyProduct: React.FC = () => {
  const route = useRoute<BuyProductRouteProp>()
  const navigation = useNavigation()
  const { productId, productTitle, productPrice } = route.params || {}

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Checkout</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Product:</Text>
        <Text style={styles.value}>{productTitle || 'Product'}</Text>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>${productPrice || '--'}</Text>
        {/* You can add address fields here */}
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.navigate('PlaceOrder', { productId, productTitle, productPrice })}
      >
        <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BuyProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 24,
    width: '100%',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#222',
  },
  confirmButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
})