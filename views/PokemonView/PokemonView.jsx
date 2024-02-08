import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PokemonView = ({ route }) => {
  const { pokemon } = route.params;
  const navigation = useNavigation();

  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [pokemonId, setPokemonId] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [teamButtonActive, setTeamButtonActive] = useState(false);

  const handleTeamButtonClick = () => {
    setTeamButtonActive(!teamButtonActive);
  };

  const extractIdFromUrl = (url) => {
    const match = url.match(/\/(\d+)\/$/);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  const id = extractIdFromUrl(pokemon.url);
  const formattedId = String(id).padStart(4, "0");
  const imageUrl = `https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${id}.gif`;

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemon.url);
        const data = response.data;
        const types = data.types.map((type) => type.type.name);
        const pokemonId = data.id;
        setPokemonId(pokemonId);
        setPokemonTypes(types);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des détails du Pokémon",
          error
        );
      }
    };

    fetchPokemonDetails();
  }, [pokemon]);

  useEffect(() => {
    const getTeamData = async () => {
      const storedTeamData =
        JSON.parse(await AsyncStorage.getItem("pokemonTeam")) || [];
      setTeamData(storedTeamData);
      setTeamButtonActive(
        storedTeamData.some((pokemon) => pokemon.id === pokemonId)
      );
      const selectedPokemonData = JSON.parse(
        await AsyncStorage.getItem("selectedPokemon")
      );
      setSelectedPokemon(selectedPokemonData?.id || null);
    };

    if (pokemonId) {
      getTeamData();
    }
  }, [pokemonId]);

  const handleTeamPokemonButtonClick = async (id, name, imageUrl) => {
    const updatedTeam = [...teamData];
    const pokemonIndex = updatedTeam.findIndex((pokemon) => pokemon.id === id);

    if (pokemonIndex !== -1) {
      updatedTeam.splice(pokemonIndex, 1);
      setSelectedPokemon(null);
    } else {
      updatedTeam.push({ id, name, imageUrl });
      setSelectedPokemon(id);
    }

    try {
      await AsyncStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam));
      setTeamData(updatedTeam);
      AsyncStorage.setItem(
        "selectedPokemon",
        JSON.stringify(selectedPokemon ? { id, name, imageUrl } : null)
      );
      setTeamButtonActive(
        updatedTeam.some((pokemon) => pokemon.id === pokemonId)
      );
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'équipe Pokémon :",
        error
      );
    }
  };

  const handleRemoveFromTeam = async () => {
    if (selectedPokemon) {
      try {
        const updatedTeam = teamData.filter(
          (pokemon) => pokemon.id !== selectedPokemon
        );
        await AsyncStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam));
        setTeamData(updatedTeam);
        setSelectedPokemon(null); // Mettez à jour selectedPokemon ici
        // Supprimer également les informations du Pokémon sélectionné
        await AsyncStorage.removeItem("selectedPokemon");
        // Autres actions si nécessaires...
      } catch (error) {
        console.error(
          "Erreur lors de la suppression du Pokémon de l'équipe : ",
          error
        );
      }
    }
  };

  const handleSelectPokemon = (id) => {
    setSelectedPokemon(id);
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "grass":
        return styles.grass;
      case "poison":
        return styles.poison;
      case "fire":
        return styles.fire;
      case "flying":
        return styles.flying;
      case "water":
        return styles.water;
      case "bug":
        return styles.bug;
      case "normal":
        return styles.normal;
      case "electric":
        return styles.electric;
      case "ground":
        return styles.ground;
      case "fairy":
        return styles.fairy;
      case "fighting":
        return styles.fighting;
      case "psychic":
        return styles.psychic;
      case "rock":
        return styles.rock;
      case "steel":
        return styles.steel;
      case "ice":
        return styles.ice;
      case "ghost":
        return styles.ghost;
      case "dragon":
        return styles.dragon;
      default:
        return styles.defaultType;
    }
  };

  const getBackgroundTypeStyle = (type) => {
    switch (type) {
      case "grass":
        return styles.grassBackgroundType;
      case "poison":
        return styles.poisonBackgroundType;
      case "fire":
        return styles.fireBackgroundType;
      case "flying":
        return styles.flyingBackgroundType;
      case "water":
        return styles.waterBackgroundType;
      case "bug":
        return styles.bugBackgroundType;
      case "normal":
        return styles.normalBackgroundType;
      case "electric":
        return styles.electricBackgroundType;
      case "ground":
        return styles.groundBackgroundType;
      case "fairy":
        return styles.fairyBackgroundType;
      case "fighting":
        return styles.fightingBackgroundType;
      case "psychic":
        return styles.psychicBackgroundType;
      case "rock":
        return styles.rockBackgroundType;
      case "steel":
        return styles.steelBackgroundType;
      case "ice":
        return styles.iceBackgroundType;
      case "ghost":
        return styles.ghostBackgroundType;
      case "dragon":
        return styles.dragonBackgroundType;
    }
  };

  const getHexaByTypes = (type) => {
    const backgroundStyle = getBackgroundTypeStyle(type);
  
    // Vérifier si le style est défini
    if (backgroundStyle && backgroundStyle.backgroundColor) {
      // Extrayez la couleur hexadécimale du style
      return backgroundStyle.backgroundColor;
    } else {
      // Couleur par défaut si le type n'est pas géré ou si le style n'est pas défini
      return "#FFFFFF";
    }
  };
  
  
  return (
    // <View
    //   style={[styles.main__container, getBackgroundTypeStyle(pokemonTypes[0])]}
    // >
    console.log(getBackgroundTypeStyle(pokemonTypes[0])),
    <LinearGradient
      colors={[getHexaByTypes(pokemonTypes[0]), "#000"]}
      style={styles.main__container}
      start={{ x: -0.3, y: 0 }}
      end={{ x: 1.3, y: 1 }}
    >
      <TouchableOpacity
        style={styles.button__back}
        onPress={() => navigation.navigate("Pokedex")}
      >
        <MaterialIcons name="arrow-back" size={26} color="white" />
      </TouchableOpacity>

      <View
        style={
          teamButtonActive ? styles.team__button__active : styles.team__button
        }
      >
        <View
          style={
            teamButtonActive
              ? styles.container__team__active
              : styles.container__team
          }
        >
          {[...Array(6)].map((_, index) => {
            const pokemonInfo = teamData[index] || {
              id: "Aucun",
              name: "",
              imageUrl: "",
            };
            const isSelectable = pokemonInfo.id !== "Aucun";

            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  isSelectable && handleSelectPokemon(pokemonInfo.id)
                }
                disabled={!isSelectable}
              >
                <View
                  style={[
                    styles.pokemon__team,
                    isSelectable && styles.withInfo,
                    selectedPokemon === pokemonInfo.id &&
                      styles.selectedPokemon,
                  ]}
                >
                  <Text style={styles.name__team__pokemon}>
                    {pokemonInfo.name}
                  </Text>
                  {pokemonInfo.imageUrl && (
                    <Image
                      source={{ uri: pokemonInfo.imageUrl }}
                      style={styles.team__pokemon__image}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={[
              styles.enlever,
              selectedPokemon ? styles.enlever__active : null,
            ]}
            onPress={handleRemoveFromTeam}
            disabled={!selectedPokemon}
          >
            <Text style={styles.enlever__text}>Retirer de l'équipe</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleTeamButtonClick}
          style={styles.container__pokeball__image}
        >
          <Image
            style={styles.pokeball__image}
            source={require("../../assets/images/pokeball.png")}
          />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: imageUrl }} style={styles.image} />

      <Text style={styles.name}>{pokemon.name}</Text>

      <View style={styles.container__type}>
        {pokemonTypes.map((type, index) => (
          <View key={index} style={[styles.type, getTypeStyle(type)]}>
            <Text style={styles.text__type}>{type}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => handleTeamPokemonButtonClick(id, pokemon.name, imageUrl)}
        style={[
          styles.ajouter__equipe__button,
          teamData.some((teamPokemon) => teamPokemon.id === id)
            ? styles.retirer__equipe__button
            : teamData.length === 6
            ? styles.equipe__pleine__button
            : null,
        ]}
        disabled={
          teamData.length === 6 &&
          !teamData.some((teamPokemon) => teamPokemon.id === id)
        }
      >
        <Text
          style={[
            styles.ajouter__equipe__text,
            teamData.some((teamPokemon) => teamPokemon.id === id)
              ? styles.retirer__equipe__text
              : teamData.length === 6
              ? styles.equipe__pleine__text
              : null,
          ]}
        >
          {teamData.some((teamPokemon) => teamPokemon.id === id)
            ? "Retirer de l'équipe"
            : teamData.length === 6
            ? "Votre équipe est pleine !"
            : "Ajouter à l'équipe"}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
    // </View>
  );
};

const styles = StyleSheet.create({
  main__container: {
    position: "relative",
    flex: 1,
    width: "100%",
    height: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  team__button: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 80,
    height: 100,
    backgroundColor: "#ffffff90",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 50,
    zIndex: 100000,
    transition: "all 0.5s ease",
  },

  team__button__active: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 330,
    height: 600,
    backgroundColor: "#ffffff",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 50,
    zIndex: 100000,
  },
  container__team: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 20,
    opacity: 0,
  },

  container__team__active: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
  pokemon__team: {
    width: 100,
    height: 100,
    backgroundColor: "#EBEBEB",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  withInfo: {
    backgroundColor: "#EBEBEB",
  },

  selectedPokemon: {
    backgroundColor: "#9aed95",
  },
  team__pokemon__image: {
    position: "absolute",
    top: -25,
    left: 10,

    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  name__team__pokemon: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000",
  },
  enlever: {
    width: 220,
    height: 50,
    backgroundColor: "#ebaeaf",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  enlever__active: {
    backgroundColor: "#f26163",
  },
  enlever__text: {
    color: "#fff",
    fontWeight: "bold",
  },

  container__number: {
    position: "absolute",
    top: 55,
    left: 155,
    width: 80,
    height: 25,
    backgroundColor: "white",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  container__pokeball__image: {
    position: "absolute",
    bottom: 20,
    left: 20,
    marginTop: 25,
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  pokeball__image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  ajouter__equipe__button: {
    cursor: "pointer",
    width: 220,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    marginTop: 20,
  },

  ajouter__equipe__text: {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#ff9830",
    padding: 10,
  },
  retirer__equipe__text: {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
    padding: 10,
  },
  equipe__pleine__text: {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
    padding: 10,
  },

  retirer__equipe__button: {
    backgroundColor: "#f26163",
  },
  equipe__pleine__button: {
    backgroundColor: "#ff8640",
  },
  button__back: {
    position: "absolute",
    top: 55,
    left: 5,
    width: 80,
    height: 25,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  image: {
    width: 200,
    height: 240,
    resizeMode: "contain",
    position: "absolute",
    top: 10,
    left: 100,
  },
  name: {
    marginTop: 250,
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
  },

  container__type: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },

  type: {
    width: 90,
    height: 28,
    borderRadius: 50,
    textTransform: "uppercase",
    fontWeight: "bold",
    backgroundColor: "#9BCB51",
    borderWidth: 2,
    borderColor: "#ffffff99",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  text__type: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#fff",
  },

  grass: {
    backgroundColor: "#9BCB51",
    shadowColor: "#9BCB51",
  },
  poison: {
    backgroundColor: "#B97FC9",
    shadowColor: "#B97FC9",
  },
  fire: {
    backgroundColor: "#FD7D24",
    shadowColor: "#FD7D24",
  },
  flying: {
    backgroundColor: "#3DC7EF",
    shadowColor: "#3DC7EF",
  },
  water: {
    backgroundColor: "#4592C4",
    shadowColor: "#4592C4",
  },
  bug: {
    backgroundColor: "#729F3F",
    shadowColor: "#729F3F",
  },
  normal: {
    backgroundColor: "#A4ACAF",
    shadowColor: "#A4ACAF",
  },
  electric: {
    backgroundColor: "#EED535",
    shadowColor: "#EED535",
  },
  ground: {
    backgroundColor: "#AB9842",
    shadowColor: "#AB9842",
  },
  fairy: {
    backgroundColor: "#FDB9E9",
    shadowColor: "#FDB9E9",
  },
  fighting: {
    backgroundColor: "#D56723",
    shadowColor: "#D56723",
  },
  psychic: {
    backgroundColor: "#F366B9",
    shadowColor: "#F366B9",
  },
  rock: {
    backgroundColor: "#A38C21",
    shadowColor: "#A38C21",
  },
  steel: {
    backgroundColor: "#9EB7B8",
    shadowColor: "#9EB7B8",
  },
  ice: {
    backgroundColor: "#51C4E7",
    shadowColor: "#51C4E7",
  },
  ghost: {
    backgroundColor: "#7B62A3",
    shadowColor: "#7B62A3",
  },
  dragon: {
    backgroundColor: "#F16E57",
    shadowColor: "#F16E57",
  },
  // background type :
  grassBackgroundType: {
    backgroundColor: "#A9DFAF",
  },
  poisonBackgroundType: {
    backgroundColor: "#DBA4EB",
  },
  fireBackgroundType: {
    backgroundColor: "#EEA57B",
  },
  flyingBackgroundType: {
    backgroundColor: "#3DC7EF",
  },
  waterBackgroundType: {
    backgroundColor: "#95C9EA",
  },
  bugBackgroundType: {
    backgroundColor: "#C6D16E",
  },
  normalBackgroundType: {
    backgroundColor: "#C3D1D7",
  },
  electricBackgroundType: {
    backgroundColor: "#E5D776",
  },
  groundBackgroundType: {
    backgroundColor: "#F4DD86",
  },
  fairyBackgroundType: {
    backgroundColor: "#FFE4F6",
  },
  fightingBackgroundType: {
    backgroundColor: "#F1BA80",
  },
  psychicBackgroundType: {
    backgroundColor: "#F993CF",
  },
  rockBackgroundType: {
    backgroundColor: "#E3D8B0",
  },
  steelBackgroundType: {
    backgroundColor: "#DAE9EB",
  },
  iceBackgroundType: {
    backgroundColor: "#C4F7F7",
  },
  ghostBackgroundType: {
    backgroundColor: "#C9BAE2",
  },
  dragonBackgroundType: {
    backgroundColor: "#F89887",
  },
});

export default PokemonView;
