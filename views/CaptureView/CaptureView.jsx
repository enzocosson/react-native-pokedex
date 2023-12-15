import React from "react";
import { View, StyleSheet, Button } from "react-native";

const CaptureView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.captureButtonContainer}>
        <Button title="Capture" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modelView: {
    flex: 1,
  },
  captureButtonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
});

export default CaptureView;
