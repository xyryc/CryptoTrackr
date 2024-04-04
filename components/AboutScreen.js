import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <Text style={styles.title}>CryptoTrackr</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          CryptoTrackr is a mobile application developed by xyryc that allows
          users to track cryptocurrency prices and view detailed information
          about different cryptocurrencies.
        </Text>
        <Text style={styles.text}>Version: 1.0</Text>
        <Text style={styles.text}>© 2024 xyryc. All rights reserved.</Text>
        <Text style={styles.text}>
          All trademarks, service marks, trade names, product names, and logos
          appearing on this app are the property of their respective owners.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: "#555",
  },
});

export default AboutScreen;
