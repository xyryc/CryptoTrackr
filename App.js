import React from "react";
import { View, StatusBar } from "react-native";
import CryptoTrackerApp from "./CryptoTrackerApp";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <CryptoTrackerApp />
    </View>
  );
};

export default App;
