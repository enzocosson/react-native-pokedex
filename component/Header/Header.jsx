// Header.js
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();


  return (
    <View style={styles.container__header}>
      <LinearGradient
        style={styles.header}
        colors={["#22E7B2", "#22E7B2"]}
        start={{ x: -0.3, y: 0 }}
        end={{ x: 1.3, y: 1 }}
      >
        <View style={styles.container__buttons}>
          <TouchableOpacity
            style={styles.menu__button}
            onPress={() => navigation.navigate("Home")}
          >
            <MaterialIcons name="home" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menu__button}
            onPress={() => navigation.navigate("Favorites")}
          >
            <MaterialIcons name="favorite" size={26} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.container__buttons}>
          <TouchableOpacity
            style={styles.menu__button}
            onPress={() => navigation.navigate("Settings")}
          >
            <MaterialIcons name="settings" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menu__button}
            onPress={() => navigation.navigate("Profile")}
          >
            <MaterialIcons name="person" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <TouchableOpacity
        style={styles.input__submit}
        onPress={() => navigation.navigate("ARView")}
      >
        <LinearGradient
          style={styles.central__btn}
          colors={["#18F7A7", "#5191E8"]}
          start={{ x: -0.3, y: 0 }}
          end={{ x: 1.3, y: 1 }}
        >
          <MaterialIcons name="menu" size={40} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container__header: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    position: "absolute",
    top: 740,
    left: "2.5%",
    width: "95%",
    height: 40,
    borderRadius: 50,
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  container__buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
  },
  central__btn: {
    position: "absolute",
    top: 720,
    left: "40%",
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,

    borderWidth: 3,
    borderColor: "white",
  },

  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default Header;
