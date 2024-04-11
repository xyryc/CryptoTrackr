import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

const AboutScreen = () => {
  const openGithub = () => {
    Linking.openURL("https://github.com/duskdev17");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <Text style={styles.title}>CryptoTrackr</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          Welcome to CryptoTrackr! This mobile application is developed by{" "}
          <TouchableOpacity onPress={openGithub}>
            <Text style={styles.link}>xyryc</Text>
          </TouchableOpacity>{" "}
          to help you track cryptocurrency prices and explore detailed
          information about various cryptocurrencies.
        </Text>
        <Text style={styles.text}>Version: 1.0.1</Text>
        <Text style={styles.text}>
          © 2024{" "}
          <TouchableOpacity onPress={openGithub}>
            <Text style={styles.link}>xyryc</Text>
          </TouchableOpacity>
          . All rights reserved.
        </Text>
        <Text style={styles.text}>
          Please note that all trademarks, service marks, trade names, product
          names, and logos appearing on this app are the property of their
          respective owners.
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
    color: "#333",
  },
  link: {
    color: "#007bff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default AboutScreen;
