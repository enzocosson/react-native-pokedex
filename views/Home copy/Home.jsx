import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MonContexte from "../../createContext";
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const contextValue = useContext(MonContexte);
  const navigation = useNavigation();

  const handleButtonPress = () => {
    // Logique à exécuter lorsque le bouton est pressé
    console.log("Bouton pressé !");
    navigation.navigate('Pokedex'); // Utilisez la navigation pour passer à la page du Pokedex
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#18F7A7", "#4843D3"]}
        style={styles.background}
        start={{ x: -0.3, y: 0 }}
        end={{ x: 1.3, y: 1 }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.image}
        />
        <Image
          source={require("../../assets/images/pikachu_home.png")}
          style={styles.pikachu}
        />
        <Text style={styles.text}>{contextValue.welcomeMessage}</Text>

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <LinearGradient
            colors={['#4B34DA', '#18F7C1']}
            start={{ x: -0.3, y: 0 }}
            end={{ x: 1.3, y: 1 }}
            style={styles.gradient}>
            <Text style={styles.buttonText}>OUVRIR MON POKEDEX</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
  },
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    resizeMode: "contain",
    zIndex: 9,
  },
  pikachu: {
    left: 10,
    top: -20,
    width: 400,
    height: 250,
    resizeMode: "contain",
    zIndex: 9,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    margin: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#1ABEF7",
  },
  button: {
    width: '70%',
    height: 45,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default Home;
