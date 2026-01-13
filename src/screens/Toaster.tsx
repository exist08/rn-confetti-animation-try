import { Button, Modal, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'

const Toaster = () => {
    const [openModal, setOpenModal] = useState(false)

    const showToast = () => {
        ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
    };

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'All Your Base Are Belong To Us',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    const showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
            'A wild toast appeared!',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            100,
            50,
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Toaster</Text>
            <Button title="Toggle Toast" onPress={() => showToast()} />
            <Button
                title="Toggle Toast With Gravity"
                onPress={() => showToastWithGravity()}
            />
            <Button
                title="Toggle Toast With Gravity & Offset"
                onPress={() => showToastWithGravityAndOffset()}
            />
            <Button
                title="Open Modal"
                onPress={() => setOpenModal(true)}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={openModal}
                onRequestClose={() => {
                    setOpenModal(false);
                }}
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{ color: '#fff', fontSize: 20, marginBlockEnd: 32 }}>This is a modal</Text>
                    <Button title="Close Modal" onPress={() => setOpenModal(false)} />
                </View>
            </Modal>
        </View>
    )
}

export default Toaster

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