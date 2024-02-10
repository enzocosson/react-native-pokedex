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
      <View style={styles.header}>
        <View style={styles.container__buttons}>
          <TouchableOpacity
            style={styles.menu__button}
            onPress={() => navigation.navigate("Home")}
          >
            <MaterialIcons name="home" size={26} color="#2DD3BF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menu__button}
            onPress={() => navigation.navigate("Favoris")}
          >
            <MaterialIcons name="favorite" size={26} color="#2DD3BF" />
          </TouchableOpacity>
        </View>
        <View style={styles.container__buttons}>
          <TouchableOpacity
            style={styles.menu__button}
            onPress={() => navigation.navigate("Settings")}
          >
            <MaterialIcons name="settings" size={26} color="#2DD3BF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menu__button}
            onPress={() => navigation.navigate("Profile")}
          >
            <MaterialIcons name="person" size={26} color="#2DD3BF" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.input__submit}
        onPress={() => navigation.navigate("Home")}
      >
        <LinearGradient
          style={styles.central__btn}
          colors={["#18F7A7", "#5191E8"]}
          start={{ x: -0.3, y: 0 }}
          end={{ x: 1.3, y: 1 }}
        >
          <MaterialIcons name="home" size={35} color="white" />
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
    top: 760,
    left: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  container__buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 50,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  central__btn: {
    position: "absolute",
    top: 720,
    left: "40%",
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",

  },

  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default Header;
