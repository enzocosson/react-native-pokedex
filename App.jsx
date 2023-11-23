import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Home from "./views/Home/Home";
import MonContexte from "./createContext";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  const contextValue = {
    pokemon: "Pikachu",
  };
  const Stack = createNativeStackNavigator();

  return (
    <MonContexte.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </MonContexte.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
