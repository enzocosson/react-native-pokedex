import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: "90%",
    left: "5%",
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    zIndex: 10,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
