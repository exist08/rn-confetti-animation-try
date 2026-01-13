import { Alert, Button, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Shadow } from 'react-native-shadow-2'
import { Confetti, ConfettiMethods, PIConfetti } from 'react-native-fast-confetti';

const ConfettiAnim = () => {
    const { width, height } = Dimensions.get('window');
    const confettiRef = useRef<ConfettiMethods>(null);
    const piConfettiRef = useRef<ConfettiMethods>(null);

    const [showConfetti, setShowConfetti] = useState(false);
    const [showPIConfetti, setShowPIConfetti] = useState(false);

    const triggerConfetti = () => {
        setShowConfetti(true);
        // You can also use the ref to control the animation
        confettiRef.current?.restart(); // If autoplay is false
    };

    const triggerPIConfetti = () => {
        setShowPIConfetti(true);
        piConfettiRef.current?.restart(); // If autoplay is false
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>ConfettiAnim</Text>
            <Shadow distance={5} startColor={'#ffa50066'} endColor={'#ffa50000'} offset={[0, 5]}>
                <Pressable style={{ borderRadius: 10, backgroundColor: '#c454f0dd' }}
                    onPress={() => Alert.alert('Order placed!')}
                >
                    <Text style={{ fontSize: 20, padding: 20, fontWeight: 'bold' }}>Order Now</Text>
                </Pressable>
            </Shadow>
            <View style={styles.buttonContainer}>
                <Button title="Trigger Falling Confetti" onPress={triggerConfetti} />
                <Button title="Trigger Burst Confetti" onPress={triggerPIConfetti} />
            </View>
            {showConfetti && (
                <Confetti
                    ref={confettiRef}
                    count={200} // Number of confetti pieces
                    fallDuration={5000} // How long they fall (ms)
                    colors={['#FFD700', '#FF4500', '#00BFFF', '#32CD32']} // Custom colors
                    autoplay={false} // Play automatically on mount
                    isInfinite={false} // Play once
                    onAnimationEnd={() => setShowConfetti(false)} // Remove after animation
                    style={StyleSheet.absoluteFillObject} // Cover the whole screen
                />
            )}

            {/* Burst Confetti */}
            {showPIConfetti && (
                <PIConfetti
                    ref={piConfettiRef}
                    count={200} // Number of confetti pieces
                    blastDuration={500} // How long the initial burst lasts (ms)
                    fallDuration={2000} // How long they fall after blast (ms)
                    blastPosition={{ x: width / 2, y: height / 2 }} // Where the blast originates
                    blastRadius={250} // Radius of the blast
                    colors={['#FFC0CB', '#DA70D6', '#8A2BE2', '#4169E1','#FFD700', '#FF4500', '#00BFFF', '#32CD32']} // Custom colors
                    autoplay={false}
                    isInfinite={false}
                    onAnimationEnd={() => setShowPIConfetti(false)}
                    style={StyleSheet.absoluteFillObject}
                />
            )}
        </View>
    )
}

export default ConfettiAnim

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
    buttonContainer: {
        position: 'absolute',
        top: 50,
        zIndex: 1, // Ensure buttons are clickable above confetti
        gap: 20,
    },
})