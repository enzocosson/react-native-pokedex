import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {
  const profileData = {
    firstName: "John",
    lastName: "Doe",
    age: 28,
    nationality: "French",
    // Ajoutez d'autres informations de profil fictives ici
  };

  const imageUrl = "https://i.redd.it/cb3x6hw93oh91.jpg"

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#18F7A7", "#4843D3"]}
        style={styles.background}
        start={{ x: -0.3, y: 0 }}
        end={{ x: 1.3, y: 1 }}
      >
        <View style={styles.profileContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.text}>{`${profileData.firstName} ${profileData.lastName}`}</Text>
          <Text style={styles.text}>{`Age: ${profileData.age}`}</Text>
          <Text style={styles.text}>{`Nationality: ${profileData.nationality}`}</Text>
          {/* Ajoutez d'autres composants Text pour afficher d'autres informations */}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#091079",
  },
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "#333",
    margin: 5,
    fontWeight: "bold",
  },
  image: {
    width: 120,
    height: 112,
    borderRadius: 75,
    marginBottom: 10,
    border: "2px solid blue",
  },
});

export default Profile;
