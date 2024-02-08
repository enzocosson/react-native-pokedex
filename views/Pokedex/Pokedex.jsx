import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import PokemonCard from "../../component/PokemonCard/PokemonCard";
import { useNavigation } from "@react-navigation/native";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
  );
  const [prevPageUrl, setPrevPageUrl] = useState("");

  const navigation = useNavigation();

  const navigateToPokemonView = (pokemon) => {
    if (pokemon) {
      navigation.navigate("PokemonView", { pokemon });
    }
  };

  const loadNextPage = async () => {
    try {
      if (!nextPageUrl) {
        console.log("Pas de page suivante disponible");
        return;
      }

      const offsetMatch = nextPageUrl.match(/offset=(\d+)/);

      if (!offsetMatch || offsetMatch.length < 2) {
        console.log("Impossible de trouver l'offset dans l'URL");
        return;
      }

      const currentOffset = parseInt(offsetMatch[1]);
      const newOffset = currentOffset + 20;

      const newNextPageUrl = `https://pokeapi.co/api/v2/pokemon?offset=${newOffset}&limit=20`;

      const response = await axios.get(newNextPageUrl);

      const newPokemonList = response.data.results.map((pokemon) => ({
        ...pokemon,
        id: newOffset + pokemonList.length + 1,
      }));

      setPokemonList((prevList) => [...prevList, ...newPokemonList]);
      setNextPageUrl(newNextPageUrl);
      setPrevPageUrl(response.data.previous);
    } catch (error) {
      console.error("Erreur lors du chargement de la page suivante", error);
    }
  };

  const getPokemonIdFromUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
        );
        const results = response.data.results;
        setPokemonList(results);
        setFilteredPokemonList(results);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données Pokemon",
          error
        );
      }
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    // Filtrer la liste des Pokémon lorsque searchTerm change
    const filteredList = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemonList(filteredList);
  }, [searchTerm, pokemonList]);

  const handleEndReached = () => {
    loadNextPage();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>POKEDEX</Text>
      </View>

      <View style={styles.search__bar}>
        <TextInput
          style={styles.input__search}
          placeholder="Faites vos recherches..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <TouchableOpacity
          style={styles.input__submit}
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
      <FlatList
        data={filteredPokemonList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        progressViewOffset={20}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        keyExtractor={(pokemon) =>
          pokemon.id ? pokemon.id.toString() : pokemon.name
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigateToPokemonView(item)}
          >
            <PokemonCard
              index={index + 1}
              name={item.name}
              id={getPokemonIdFromUrl(item.url)}
              pokemonId={item.id}
            />
          </TouchableOpacity>
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        style={styles.container___cards}
      />
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
  title: {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
backgroundColor: "transparent",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2BC2C1",
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
    height: 50,
    borderWidth: 1,
    borderColor: "#2BC2C1",
    borderRadius: 5,
    paddingLeft: 10,
    borderWidth: 3,
  },
  input__submit: {
    position: "relative",
    overflow: "hidden",
    width: 68,
    height: 50,
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
    padding: 10,
  },
  header: {
    width: "100%",
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

});

export default Pokedex;
