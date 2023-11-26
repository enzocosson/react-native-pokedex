import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";

const PokemonView = ({ route }) => {
  const { pokemon } = route.params;

  const extractIdFromUrl = (url) => {
    // L'extraction de l'ID à partir de l'URL dépend de la structure spécifique de votre API
    // Vous pouvez utiliser une expression régulière ou d'autres méthodes pour extraire l'ID
    const match = url.match(/\/(\d+)\/$/);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };
  const id = extractIdFromUrl(pokemon.url);
  const formattedId = String(id).padStart(4, "0");
  const imageUrl = `https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${id}.gif`;
  
  console.log(imageUrl)
  const [pokemonTypes, setPokemonTypes] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemon.url);
        const data = response.data;
        const types = data.types.map((type) => type.type.name);
        setPokemonTypes(types);
      } catch (error) {
        console.error("Erreur lors du chargement des détails du Pokémon", error);
      }
    };
  
    fetchPokemonDetails();
  }, [pokemon]);
  


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

  
  return (
    <View style={[styles.main__container, getBackgroundTypeStyle(pokemonTypes[0])]}>
         <View style={styles.container__number}>
            <Text>n°{formattedId}</Text>
        </View>
        
      <View style={styles.container__info}>
      <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
        <Text style={styles.name}>{pokemon.name}</Text>
        <View style={styles.container__type}>
          {pokemonTypes.map((type, index) => (
            <View key={index} style={[styles.type, getTypeStyle(type)]}>
              <Text style={styles.text__type}>{type}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    main__container: {
        position: "relative",
        flex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    container__info: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "70%",
        borderRadius: "25px 25px 0 0",
        backgroundColor: "white",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,

        shadowColor: "#171717",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,

        gap: 10,
    },
    container__number:{
        position: "absolute",
        top: 5,
        left: 155,
        width: 80,
        height:25,
        backgroundColor: "white",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    image:{
        width: 200,
        height: 190,
        resizeMode: "contain",
        position: "absolute",
        top: -150,
        left: 100,
      },
    name: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    container__type: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
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
    
        display:"flex",
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
    grassBackgroundType:{
        backgroundColor: "#A9DFAF",
    },
    poisonBackgroundType:{
        backgroundColor: "#DBA4EB",
    },
    fireBackgroundType:{
        backgroundColor: "#EEA57B",
    },
    flyingBackgroundType:{
        backgroundColor: "#3DC7EF",
    },
    waterBackgroundType:{
        backgroundColor: "#95C9EA",
    },
    bugBackgroundType:{
        backgroundColor: "#C6D16E",
    },
    normalBackgroundType:{
        backgroundColor: "#C3D1D7",
    },
    electricBackgroundType:{
        backgroundColor: "#E5D776",
    },
    groundBackgroundType:{
        backgroundColor: "#F4DD86",
    },
    fairyBackgroundType:{
        backgroundColor: "#FFE4F6",
    },
    fightingBackgroundType:{
        backgroundColor: "#F1BA80",
    },
    psychicBackgroundType:{
        backgroundColor: "#F993CF",
    },
    rockBackgroundType:{
        backgroundColor: "#E3D8B0",
    },
    steelBackgroundType:{
        backgroundColor: "#DAE9EB",
    },
    iceBackgroundType:{
        backgroundColor: "#C4F7F7",
    },
    ghostBackgroundType:{
        backgroundColor: "#C9BAE2",
    },
    dragonBackgroundType:{
        backgroundColor: "#F89887",
    },

    
    });

export default PokemonView;
