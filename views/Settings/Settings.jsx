import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    // Ajoutez ici la logique pour sauvegarder les paramètres
    console.log("Paramètres sauvegardés :", { username, email, password });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#18F7A7", "#4843D3"]}
        style={styles.background}
        start={{ x: -0.3, y: 0 }}
        end={{ x: 1.3, y: 1 }}
      >
        <View style={styles.settingsContainer}>
          <Text style={styles.label}>Nom d'utilisateur :</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <Text style={styles.label}>Langue :</Text>
          <TextInput style={styles.input} value="Français" editable={false} />

          <Text style={styles.label}>Thème :</Text>
          <TextInput style={styles.input} value="Clair" editable={false} />

          <Text style={styles.label}>Notifications :</Text>
          <TextInput style={styles.input} value="Activées" editable={false} />

          <Text style={styles.label}>Son :</Text>
          <TextInput style={styles.input} value="Activé" editable={false} />

          <Text style={styles.label}>Vibration :</Text>
          <TextInput style={styles.input} value="Activée" editable={false} />




          <Button title="Enregistrer" onPress={handleSave} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#091079",
  },
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Settings;
