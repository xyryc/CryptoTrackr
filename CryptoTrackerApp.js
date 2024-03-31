// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   RefreshControl,
//   StyleSheet,
// } from "react-native";
// import axios from "axios";

// const CryptoTrackerApp = () => {
//   const [cryptoData, setCryptoData] = useState([]);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     fetchCryptoData();
//   }, []);

//   const fetchCryptoData = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
//       );
//       setCryptoData(response.data);
//     } catch (error) {
//       console.error("Error fetching crypto data:", error);
//     } finally {
//       setIsRefreshing(false);
//     }
//   };

//   const onRefresh = () => {
//     setIsRefreshing(true);
//     setTimeout(fetchCryptoData, 5000);
//   };

//   const renderCryptoItem = ({ item }) => (
//     <View style={styles.cryptoItemContainer}>
//       <Image source={{ uri: item.image }} style={styles.cryptoItemImage} />
//       <View style={styles.cryptoItemDetails}>
//         <Text style={styles.cryptoItemName}>{item.name}</Text>
//         <Text style={styles.cryptoItemSymbol}>{item.symbol}</Text>
//       </View>
//       <Text style={styles.cryptoItemPrice}>
//         ${item.current_price.toFixed(2)}
//       </Text>

//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={cryptoData}
//         renderItem={renderCryptoItem}
//         keyExtractor={(item) => item.id}
//         style={styles.flatList}
//         refreshControl={
//           <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   flatList: {
//     flex: 1,
//   },
//   cryptoItemContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   cryptoItemImage: {
//     width: 40,
//     height: 40,
//     marginRight: 15,
//   },
//   cryptoItemDetails: {
//     flex: 1,
//   },
//   cryptoItemName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   cryptoItemSymbol: {
//     color: "#666",
//   },
//   cryptoItemPrice: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default CryptoTrackerApp;

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
} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const CryptoTrackerApp = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

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
            <View style={styles.modalContainer}>
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
                  Name: {selectedCoin.name}
                </Text>
                <Text style={styles.modalText}>
                  Symbol: {selectedCoin.symbol}
                </Text>
                <Text style={styles.modalText}>
                  Current Price: ${selectedCoin.current_price}
                </Text>
                <Text style={styles.modalText}>
                  Market Cap: ${selectedCoin.market_cap}
                </Text>
                <Text style={styles.modalText}>
                  Market Cap Rank: ${selectedCoin.market_cap_rank}
                </Text>
                <Text style={styles.modalText}>
                  Total Volume: ${selectedCoin.total_volume}
                </Text>
                <Text style={styles.modalText}>
                  high_24h: ${selectedCoin.high_24h}
                </Text>
                <Text style={styles.modalText}>
                  low_24h: ${selectedCoin.low_24h}
                </Text>
                <Text style={styles.modalText}>
                  price_change_24h: ${selectedCoin.price_change_24h}
                </Text>
                <Text style={styles.modalText}>
                  price_change_percentage_24h: $
                  {selectedCoin.price_change_percentage_24h}
                </Text>
                <Text style={styles.modalText}>
                  market_cap_change_24h: ${selectedCoin.market_cap_change_24h}
                </Text>
                <Text style={styles.modalText}>
                  market_cap_change_percentage_24h: $
                  {selectedCoin.market_cap_change_percentage_24h}
                </Text>
                <Text style={styles.modalText}>
                  circulating_supply: ${selectedCoin.circulating_supply}
                </Text>
                <Text style={styles.modalText}>
                  total_supply: ${selectedCoin.total_supply}
                </Text>
                <Text style={styles.modalText}>
                  max_supply: ${selectedCoin.max_supply}
                </Text>
                <Text style={styles.modalText}>ath: ${selectedCoin.ath}</Text>
                <Text style={styles.modalText}>
                  ath_change_percentage: ${selectedCoin.ath_change_percentage}
                </Text>
                <Text style={styles.modalText}>
                  ath_date: ${selectedCoin.ath_date}
                </Text>
                <Text style={styles.modalText}>atl: ${selectedCoin.atl}</Text>
                <Text style={styles.modalText}>
                  atl_change_percentage: ${selectedCoin.atl_change_percentage}
                </Text>
                <Text style={styles.modalText}>
                  atl_date: ${selectedCoin.atl_date}
                </Text>
                <Text style={styles.modalText}>
                  Last Updated: {selectedCoin.last_updated}
                </Text>
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
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: "blue",
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CryptoTrackerApp;
