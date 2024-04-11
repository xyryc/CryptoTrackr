import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const CryptoTrackerApp = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const screenHeight = Dimensions.get("window").height;

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
    <TouchableOpacity
      style={styles.cryptoItemContainer}
      onPress={() => setSelectedCoin(item)}
    >
      <Image source={{ uri: item.image }} style={styles.cryptoItemImage} />
      <View style={styles.cryptoItemDetails}>
        <Text style={styles.cryptoItemName}>{item.name}</Text>
        <Text style={styles.cryptoItemSymbol}>{item.symbol}</Text>
      </View>
      <Text style={styles.cryptoItemPrice}>
        ${item.current_price.toFixed(2)}
      </Text>
    </TouchableOpacity>
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
      {selectedCoin && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedCoin !== null}
          onRequestClose={() => setSelectedCoin(null)}
        >
          <View style={styles.modalBackground}>
            <View
              style={[styles.modalContainer, { maxHeight: screenHeight - 100 }]}
            >
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedCoin(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <ScrollView>
                <Image
                  source={{ uri: selectedCoin.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalHeader}>
                  {selectedCoin.name} ({selectedCoin.symbol})
                </Text>
                <View style={styles.dataContainer}>
                  <Text style={styles.dataLabel}>Current Price:</Text>
                  <Text style={styles.dataValue}>
                    ${selectedCoin.current_price}
                  </Text>
                  <Text style={styles.dataLabel}>Market Cap:</Text>
                  <Text style={styles.dataValue}>
                    ${selectedCoin.market_cap}
                  </Text>
                  <Text style={styles.dataLabel}>Market Cap Rank:</Text>
                  <Text style={styles.dataValue}>
                    {selectedCoin.market_cap_rank}
                  </Text>
                  <Text style={styles.dataLabel}>Total Volume:</Text>
                  <Text style={styles.dataValue}>
                    ${selectedCoin.total_volume}
                  </Text>
                  <Text style={styles.dataLabel}>24h High:</Text>
                  <Text style={styles.dataValue}>${selectedCoin.high_24h}</Text>
                  <Text style={styles.dataLabel}>24h Low:</Text>
                  <Text style={styles.dataValue}>${selectedCoin.low_24h}</Text>
                  <Text style={styles.dataLabel}>Price Change (24h):</Text>
                  <Text style={styles.dataValue}>
                    ${selectedCoin.price_change_24h}
                  </Text>
                  <Text style={styles.dataLabel}>
                    Price Change Percentage (24h):
                  </Text>
                  <Text style={styles.dataValue}>
                    {selectedCoin.price_change_percentage_24h}%
                  </Text>
                  <Text style={styles.dataLabel}>Market Cap Change (24h):</Text>
                  <Text style={styles.dataValue}>
                    ${selectedCoin.market_cap_change_24h}
                  </Text>
                  <Text style={styles.dataLabel}>
                    Market Cap Change Percentage (24h):
                  </Text>
                  <Text style={styles.dataValue}>
                    {selectedCoin.market_cap_change_percentage_24h}%
                  </Text>
                  <Text style={styles.dataLabel}>Circulating Supply:</Text>
                  <Text style={styles.dataValue}>
                    {selectedCoin.circulating_supply}
                  </Text>
                  <Text style={styles.dataLabel}>Total Supply:</Text>
                  <Text style={styles.dataValue}>
                    {selectedCoin.total_supply}
                  </Text>
                  <Text style={styles.dataLabel}>Max Supply:</Text>
                  <Text style={styles.dataValue}>
                    {selectedCoin.max_supply
                      ? `$${selectedCoin.max_supply}`
                      : "N/A"}
                  </Text>
                  <Text style={styles.dataLabel}>All-Time High (ATH):</Text>
                  <Text style={styles.dataValue}>${selectedCoin.ath}</Text>
                  <Text style={styles.dataLabel}>ATH Change Percentage:</Text>
                  <Text style={styles.dataValue}>
                    {selectedCoin.ath_change_percentage}%
                  </Text>
                  <Text style={styles.dataLabel}>ATH Date:</Text>
                  <Text style={styles.dataValue}>{selectedCoin.ath_date}</Text>
                  <Text style={styles.dataLabel}>All-Time Low (ATL):</Text>
                  <Text style={styles.dataValue}>${selectedCoin.atl}</Text>
                  <Text style={styles.dataLabel}>ATL Change Percentage:</Text>
                  <Text style={styles.dataValue}>
                    {selectedCoin.atl_change_percentage}%
                  </Text>
                  <Text style={styles.dataLabel}>ATL Date:</Text>
                  <Text style={styles.dataValue}>{selectedCoin.atl_date}</Text>
                  <Text style={styles.dataLabel}>Last Updated:</Text>
                  <Text style={styles.dataValue}>
                    {new Date(selectedCoin.last_updated).toLocaleString()}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
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
    borderRadius: 6,
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 8,
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: "blue",
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 6,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dataContainer: {
    marginBottom: 20,
  },
  dataLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  dataValue: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
    fontStyle: "italic",
    backgroundColor: "#fff",
    borderWidth: 0.2,
    borderRadius: 6,
    padding: 5,
  },
});

export default CryptoTrackerApp;
