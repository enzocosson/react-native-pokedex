import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

const ouvrirPokedex = () => {
  navigation.navigate('Pokedex');
};

const Home = () => {
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
        source={require("../../assets/images/poke_25.gif")}
        style={styles.pikachu}
      />
        <TouchableOpacity onPress={ouvrirPokedex} style={styles.button}>
           <Text style={styles.buttonText}>Ouvrir mon Pokédex</Text>
      </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    left: 25,
    top: -100,
    width: 500,
    height: 300,
    resizeMode: "contain",
    zIndex: 9,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    margin: 10,
  },
});

export default Home;
