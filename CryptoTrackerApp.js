import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";
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
    setTimeout(fetchCryptoData, 7000);
    // fetchCryptoData();
  };

  const renderCryptoItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 30, height: 30, marginRight: 10 }}
      />
      <Text>{item.name}</Text>
      <Text>{item.symbol}</Text>
      <Text>${item.current_price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cryptoData}
        renderItem={renderCryptoItem}
        keyExtractor={(item) => item.id}
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default CryptoTrackerApp;
