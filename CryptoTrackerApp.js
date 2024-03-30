import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
} from "react-native";
import axios from "axios";

const CryptoTrackerApp = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );
      setCryptoData(response.data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(fetchCryptoData, 5000);
  };

  const renderCryptoItem = ({ item }) => (
    <View style={styles.cryptoItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cryptoItemImage} />
      <View style={styles.cryptoItemDetails}>
        <Text style={styles.cryptoItemName}>{item.name}</Text>
        <Text style={styles.cryptoItemSymbol}>{item.symbol}</Text>
      </View>
      <Text style={styles.cryptoItemPrice}>
        ${item.current_price.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cryptoData}
        renderItem={renderCryptoItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flatList: {
    flex: 1,
  },
  cryptoItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cryptoItemImage: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  cryptoItemDetails: {
    flex: 1,
  },
  cryptoItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cryptoItemSymbol: {
    color: "#666",
  },
  cryptoItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CryptoTrackerApp;
