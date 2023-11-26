import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const CaptureView = () => {
  return (
    <View style={styles.container}>
      <Canvas style={styles.modelView}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <meshBasicMaterial attach="material" color={0xcccccc} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={0x00ff00} />
        </mesh>
        <OrbitControls />
      </Canvas>
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
