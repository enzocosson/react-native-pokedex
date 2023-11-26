import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import PokemonCard from "../../component/PokemonCard/PokemonCard";
import { useNavigation } from "@react-navigation/native";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigation = useNavigation();

  const navigateToPokemonView = (pokemon) => {
    if (pokemon) {
      navigation.navigate('PokemonView', { pokemon });
    }
  };
  

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=26"
        );
        const results = response.data.results;
        setPokemonList(results);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données Pokemon",
          error
        );
      }
    };

    fetchPokemonData();
  }, []);

  const getPokemonIdFromUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll___container}>
        <LinearGradient
          colors={["#18F7A7", "#4843D3"]}
          style={styles.header}
          start={{ x: -0.3, y: 0 }}
          end={{ x: 1.3, y: 1 }}
        >
          <Text style={styles.text}>POKEDEX</Text>
        </LinearGradient>

        <View style={styles.search__bar}>
          <TextInput
            style={styles.input__search}
            placeholder="Faites vos recherches..."
          />
          <TouchableOpacity
            style={styles.input__sumbit}
            onPress={() => console.log("Search")}
          >
            <LinearGradient
              colors={["#18F7A7", "#4843D3"]}
              style={styles.header}
              start={{ x: -0.3, y: 0 }}
              end={{ x: 1.3, y: 1 }}
            >
              <MaterialIcons name="search" size={26} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.container___cards}>
          {pokemonList.map((pokemon, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToPokemonView(pokemon)}
            >
              <PokemonCard
                index={index + 1}
                name={pokemon.name}
                id={getPokemonIdFromUrl(pokemon.url)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "relative",
  },
  scroll___container: {
    width: "100%",
  },
  search__bar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  input__search: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#2BC2C1",
    borderRadius: 5,
    paddingLeft: 10,
    borderWidth: 3,
  },
  input__sumbit: {
    position: "relative",
    overflow: "hidden",
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  container___cards: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 10,
    gap: 10,
  },
  card: {
    width: 150,
    height: 150,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#A9DFAF",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  header: {
    width: "100%",
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  cardText: {
    fontSize: 16,
  },
});

export default Pokedex;
