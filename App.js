import React from "react";
import { View, StatusBar } from "react-native";
import CryptoTrackerApp from "./CryptoTrackerApp";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={false} barStyle="dark-content" />
      <CryptoTrackerApp />
    </View>
  );
};

export default App;
