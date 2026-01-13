import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'

const ShadowButton = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ShadowButton</Text>
            <Shadow distance={15} startColor={'#03e9f4'} endColor={'#03ef94'} offset={[3, 4]}>
                <View style={{ borderTopStartRadius: 24, borderBottomEndRadius: 0, borderRadius: 10, backgroundColor: '#c454f0dd' }}>
                    <Text style={{ margin: 20, fontSize: 20 }}>🤯</Text>
                </View>
            </Shadow>
        </View>
    )
}

export default ShadowButton

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
})