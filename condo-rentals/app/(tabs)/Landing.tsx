import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function LandingPage() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={() => router.push("/Profile")} style={styles.headerButton}>
                        <Text style={styles.headerButtonText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/Profile")} style={styles.headerButton}>
                        <Text style={styles.headerButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Body */}
            <ScrollView contentContainerStyle={styles.content} style={styles.scrollView}>
                <Image source={require('../../assets/images/Condo Rental Assets/Condo_Logo.png')} style={styles.logo} />
                
                <Text style={styles.title}>Find Your Perfect Condo</Text>
                <Text style={styles.subtitle}>Search through thousands of rental properties</Text>

                {/* Search Section */}
                <View style={styles.searchContainer}>
                    <TextInput style={styles.searchInput} placeholder="Enter location" placeholderTextColor="#000"/>
                    <TouchableOpacity onPress={() => router.push("/Profile")} style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Mission Section */}
                {/* Learn More section - future task*/}
                <View style={styles.trialSection}>
                    <Text style={styles.trialTitle}>Our Mission</Text>
                    <Text style={styles.trialText}>At Condo Rentals, we aim to connect renters with their dream condos effortlessly. With a vast selection of premium properties, we make finding the perfect home easier than ever.</Text>
                    <TouchableOpacity onPress={() => router.push("/LearnMore")} style={styles.trialButton}>
                        <Text style={styles.trialButtonText}>Learn More</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Sign In / Sign Up Button */}
                <TouchableOpacity onPress={() => router.push("/Profile")} style={[styles.button, styles.signInButton]}>
                    <Text style={styles.buttonText}>Sign Up Today!</Text>
                </TouchableOpacity>
                

                {/* Success Stories - future task*/}


                {/* Footer */}
                <View style={styles.footer}>
                    <View style={styles.footerLinks}>
                        <TouchableOpacity onPress={() => router.push("https://drive.google.com/file/d/1MQhsmHOi3r207C8i47w4aIdHYj2MhfDT/view?usp=sharing")}>
                            <Text style={styles.footerLink}>Contact Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("https://drive.google.com/file/d/1lLj3BfXZvmkjNqDfc2LqqnCYdKu5VPuv/view?usp=sharing")}>
                            <Text style={styles.footerLink}>FAQs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("https://drive.google.com/file/d/1RX1DD6Jjs5f_JZTzRQup8L1GOXzqZz9q/view?usp=sharing")}>
                            <Text style={styles.footerLink}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("https://drive.google.com/file/d/1o6RgdlDkQgIgOQp1f6r8F6MIvPAcUCE5/view?usp=sharing")}>
                            <Text style={styles.footerLink}>Terms of Service</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.footerText}>© 2025 Condo Rentals. All rights reserved.</Text>
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

    header: {
        width: "100%",
        padding: 20,
        backgroundColor: "#E3F2FD",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 50,
    },

    headerImage: {
        width: 50,
        height: 50,
        marginLeft: 15,
    },

    headerButtons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 80,
    },

    headerButton: {
        backgroundColor: "#1565C0",
        padding: 12,
        borderRadius: 10,
        marginLeft: 10,
    },

    headerButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    content: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#0D47A1",
        marginBottom: 5,
    },

    subtitle: {
        fontSize: 16,
        color: "#42A5F5",
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
        backgroundColor: "#0D47A1",
        padding: 10,
        borderRadius: 8,
    },

    searchButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },

    trialSection: {
        marginTop: 50,
        padding: 15,
        backgroundColor: "#BBDEFB",
        borderRadius: 10,
        alignItems: "center",
    },

    trialTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },

    trialText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
    },

    trialButton: {
        backgroundColor: "#1565C0",
        padding: 10,
        borderRadius: 5,
    },

    trialButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    footer: {
        width: "150%",
        padding: 15,
        backgroundColor: "#1565C0",
        alignItems: "center",
        marginTop: 20,
    },

    footerText: {
        color: "#fff",
        fontSize: 14,
    },

    footerLinks: {
        marginBottom: 5,
    },

    footerLink: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 5,
        textAlign: "center",
    },

    signInButton: {
        backgroundColor: "#42A5F5",
        marginTop: 20,
    },

    button: {
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

    scrollView: {
        width: "100%",
    },

    logo: {
        width: 400,
        height: 280,
        marginBottom: 20,
    },
});
