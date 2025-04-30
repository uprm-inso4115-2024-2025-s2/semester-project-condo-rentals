import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function LearnMore() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} style={styles.scrollView}>
                {/* Logo */}
                <Image
                    source={require('../assets/images/Condo Rental Assets/Condo_Logo.png')}
                    style={styles.logo}
                />

                {/* Info Section */}
                <Text style={styles.title}>Why Choose Condo Rentals?</Text>
                <Text style={styles.description}>
                    At Condo Rentals, we take the stress out of finding your perfect home. Our platform is designed 
                    to help you discover high-quality condos in desirable locations, all in just a few clicks.
                </Text>
                <Text style={styles.description}>
                    With verified listings, powerful search filters, and personalized recommendations, 
                    we’re changing the way people find rentals.
                </Text>

                <Text style={styles.description}>
                    
                </Text>

                {/* Title */}
                <Text style={styles.title}>How Condo Rentals Was Created</Text>

                {/* Our Journey */}
                <Text style={styles.description}>
                    At Condo Rentals, we wanted to make finding the perfect condo as easy and stress-free as possible.  
                    As undergraduate students from the University of Puerto Rico, we created a platform that helps users 
                    discover high-quality condos quickly and easily. 
                </Text>
                <Text style={styles.description}>
                    Our journey started with hours of brainstorming, designing, coding, and collaborating. Along the way, 
                    we learned about app development, user experience design, and teamwork.
                </Text>

                <Text style={styles.description}>
                    "We’re incredibly proud of what we’ve built, and we hope this app makes your condo search easier and 
                    more enjoyable."
                </Text>

                <Text style={styles.description}>
                    - The Condo Rentals Team
                </Text>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.homeButton]}
                        onPress={() => router.push("/")}
                    >
                        <Text style={styles.buttonText}>Back to Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.signUpButton]}
                        onPress={() => router.push("/Profile")}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.loginButton]}
                        onPress={() => router.push("/Profile")}
                    >
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    scrollView: {
        width: "100%",
    },

    content: {
        alignItems: "center",
        padding: 20,
    },

    logo: {
        width: 300,
        height: 200,
        marginBottom: 20,
        marginTop: 90,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#0D47A1",
        textAlign: "center",
        marginBottom: 10,
    },

    description: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginVertical: 10,
        paddingHorizontal: 10,
    },

    buttonContainer: {
        marginTop: 30,
        width: "100%",
        alignItems: "center",
    },

    button: {
        padding: 15,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
        marginVertical: 8,
    },

    homeButton: {
        backgroundColor: "#1565C0",
    },

    signUpButton: {
        backgroundColor: "#1565C0",
    },

    loginButton: {
        backgroundColor: "#1565C0",
    },

    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});
  