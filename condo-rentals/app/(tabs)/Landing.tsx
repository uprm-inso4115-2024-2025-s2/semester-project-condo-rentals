import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function LandingPage() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Find Your Perfect Condo</Text>
            <Text style={styles.subtitle}>Search through thousands of rental properties</Text>

            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Location" placeholderTextColor="#000"/>
                <TouchableOpacity onPress={() => router.push("/Profile")} style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.push("/Profile")} style={[styles.button, styles.signInButton]}>
                <Text style={styles.buttonText}>Sign In / Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#0E4E78",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: "#268DD0",
        marginBottom: 20,
        textAlign: "center",
    },
    searchContainer: {
        flexDirection: "row",
        width: "90%",
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
        marginBottom: 20,
        alignItems: "center",
        padding: 5,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: "#0E4E78",
        padding: 10,
        borderRadius: 8,
    },
    searchButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#268DD0",
        padding: 15,
        borderRadius: 8,
        width: "80%",
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    signInButton: {
        backgroundColor: "#64E2E6",
    },
});
