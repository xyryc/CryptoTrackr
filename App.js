import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CryptoTrackerApp from "./components/CryptoTrackerApp";
import AboutScreen from "./components/AboutScreen";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Image source={require("./assets/icon.png")} style={styles.logo} />
        <Text style={styles.appTitle}>CryptoTrackr</Text>
      </View>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("CryptoTrackr")}
      >
        <Text style={styles.drawerItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.drawerItemText}>About</Text>
      </TouchableOpacity>
      <Text style={styles.version}>App Version: 1.0.1</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="CryptoTrackr"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerStyle={styles.drawerStyle}
      >
        <Drawer.Screen name="CryptoTrackr" component={CryptoTrackerApp} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
    padding: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  drawerItem: {
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  drawerItemText: {
    fontSize: 18,
    color: "#333",
  },
  drawerStyle: {
    backgroundColor: "#f0f0f0",
  },
  version: {
    marginTop: "auto",
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "right",
  },
});

export default App;
