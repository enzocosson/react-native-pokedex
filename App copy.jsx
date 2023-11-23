import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import Home from "./views/Home/Home";
import Pokedex from "./views/Pokedex/Pokedex";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pokedex" component={Pokedex} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const appStyles = StyleSheet.create({
  main: {
    position: "relative",
    width: "100%",
    height: "100vh",
    flex: 1,
  },
  container__dashboard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
