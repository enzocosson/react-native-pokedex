import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#18F7A7", "#4843D3"]}
        style={styles.background}
        start={{ x: -0.3, y: 0 }}
        end={{ x: 1.3, y: 1 }}
      >
        <Text style={styles.text}>Page de Profile</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
  },
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    margin: 10,
    fontWeight:"bold",
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#1ABEF7",
  },
});

export default Profile;
