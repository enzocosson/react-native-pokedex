// Navigation.js
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./views/Home/Home";
import Pokedex from "./views/Pokedex/Pokedex";

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Pokedex: { screen: Pokedex },
  },
  {
    initialRouteName: "Home",
  }
);

export default createAppContainer(AppNavigator);
