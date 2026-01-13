import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamsList } from '../types/navigation'

// Expanded Product type
type Review = {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

type Dimensions = {
    width: number
    height: number
    depth: number
}

type Meta = {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
}

type Product = {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    tags?: string[]
    sku?: string
    weight?: number
    dimensions?: Dimensions
    warrantyInformation?: string
    shippingInformation?: string
    availabilityStatus?: string
    reviews?: Review[]
    returnPolicy?: string
    minimumOrderQuantity?: number
    meta?: Meta
}

type ProductDetailsProps = {
    route: {
        params: {
            id: number
        }
    }
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ route }) => {
    const { id } = route.params
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>()

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to load product details')
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
        )
    }

    if (!product) return null

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: product.thumbnail || product.images?.[0] }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.info}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>${product.price} <Text style={styles.discount}>({product.discountPercentage}% OFF)</Text></Text>
                <Text style={styles.category}>Category: {product.category}</Text>
                <Text style={styles.brand}>Brand: {product.brand}</Text>
                <Text style={styles.sku}>SKU: {product.sku}</Text>
                <Text style={styles.stock}>Stock: {product.stock} ({product.availabilityStatus})</Text>
                <Text style={styles.rating}>Rating: {product.rating} ⭐️</Text>
                <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => navigation.navigate('BuyProduct', { productId: product.id, productTitle: product.title, productPrice: product.price })}
                >
                    <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
                <Text style={styles.desc}>{product.description}</Text>
                {product.tags && (
                    <View style={styles.tagsContainer}>
                        <Text style={styles.sectionTitle}>Tags:</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {product.tags.map(tag => (
                                <Text key={tag} style={styles.tag}>{tag}</Text>
                            ))}
                        </View>
                    </View>
                )}
                {product.weight && (
                    <Text style={styles.detail}>Weight: {product.weight}g</Text>
                )}
                {product.dimensions && (
                    <Text style={styles.detail}>
                        Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} mm
                    </Text>
                )}
                {product.warrantyInformation && (
                    <Text style={styles.detail}>Warranty: {product.warrantyInformation}</Text>
                )}
                {product.shippingInformation && (
                    <Text style={styles.detail}>Shipping: {product.shippingInformation}</Text>
                )}
                {product.returnPolicy && (
                    <Text style={styles.detail}>Return Policy: {product.returnPolicy}</Text>
                )}
                {product.minimumOrderQuantity && (
                    <Text style={styles.detail}>Minimum Order: {product.minimumOrderQuantity}</Text>
                )}
                {product.meta && (
                    <View style={styles.metaContainer}>
                        <Text style={styles.sectionTitle}>Meta:</Text>
                        <Text style={styles.meta}>Barcode: {product.meta.barcode}</Text>
                        <Text style={styles.meta}>Created: {new Date(product.meta.createdAt).toLocaleDateString()}</Text>
                        <Text style={styles.meta}>Updated: {new Date(product.meta.updatedAt).toLocaleDateString()}</Text>
                    </View>
                )}
                <Text style={styles.sectionTitle}>Gallery:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                    {product.images?.map((img, idx) => (
                        <Image
                            key={idx}
                            source={{ uri: img }}
                            style={styles.galleryImage}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>
                {product.reviews && product.reviews.length > 0 && (
                    <View style={styles.reviewsContainer}>
                        <Text style={styles.sectionTitle}>Reviews:</Text>
                        {product.reviews.map((review, idx) => (
                            <View key={idx} style={styles.reviewCard}>
                                <Text style={styles.reviewRating}>Rating: {review.rating} ⭐️</Text>
                                <Text style={styles.reviewComment}>{review.comment}</Text>
                                <Text style={styles.reviewMeta}>
                                    By {review.reviewerName} on {new Date(review.date).toLocaleDateString()}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 16,
        marginBottom: 20,
        backgroundColor: '#eee',
    },
    info: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        color: '#007AFF',
        fontWeight: '600',
        marginBottom: 8,
    },
    discount: {
        fontSize: 14,
        color: '#FF3B30',
        fontWeight: '500',
    },
    category: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    brand: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    sku: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    stock: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    rating: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    desc: {
        fontSize: 15,
        color: '#444',
        marginBottom: 12,
    },
    tagsContainer: {
        marginBottom: 8,
    },
    tag: {
        backgroundColor: '#E0E0E0',
        color: '#333',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 4,
        fontSize: 12,
    },
    detail: {
        fontSize: 13,
        color: '#444',
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 6,
        color: '#007AFF',
    },
    metaContainer: {
        marginBottom: 8,
    },
    meta: {
        fontSize: 12,
        color: '#888',
        marginBottom: 2,
    },
    galleryImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#eee',
    },
    reviewsContainer: {
        marginTop: 12,
    },
    reviewCard: {
        backgroundColor: '#F3F3F3',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
    },
    reviewRating: {
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 2,
    },
    reviewComment: {
        fontSize: 13,
        color: '#444',
        marginBottom: 2,
    },
    reviewMeta: {
        fontSize: 11,
        color: '#888',
    },
    buyButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
    },
})