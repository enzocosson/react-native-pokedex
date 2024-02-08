import React from "react";
import { StyleSheet } from "react-native";
import Home from "./views/Home/Home";
import Pokedex from "./views/Pokedex/Pokedex";
import PokemonView from "./views/PokemonView/PokemonView";
import ARView from "./views/CaptureView/CaptureView";
import MonContexte from "./createContext";
import Header from "./component/Header/Header";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

const App = () => {
  const contextValue = {
    pokemon: "Pikachu",
  };
  const Stack = createNativeStackNavigator();

  return (
    <MonContexte.Provider value={contextValue} styles={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Pokedex"
            component={Pokedex}
            options={{ header: () => <Header /> }}
          />
          <Stack.Screen
            name="PokemonView"
            component={PokemonView}
            options={{ header: () => <Header /> }}
          />
          <Stack.Screen
            name="ARView"
            component={ARView}
            options={{ header: () => <Header /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MonContexte.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
  },
});

export default App;
