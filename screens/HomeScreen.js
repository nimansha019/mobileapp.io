
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ route }) => {
  const { userName } = route.params || {}; 
  const [vehicles, setVehicles] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isSelectionConfirmed, setIsSelectionConfirmed] = useState(false); 
  const [pickupDetails, setPickupDetails] = useState(null);  

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const vehiclesData = data.Results.slice(0, 10).map((item, index) => ({
        id: index + 1,
        make: item.Make_Name,
        thumbnail: `https://source.unsplash.com/800x600/?car,${item.Make_Name}`,
      }));
      setVehicles(vehiclesData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch vehicle data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (vehicleId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(vehicleId)
        ? prevFavorites.filter((id) => id !== vehicleId)
        : [...prevFavorites, vehicleId]
    );
  };

  const toggleSelection = (vehicleId) => {
    setSelectedVehicles((prevSelected) =>
      prevSelected.includes(vehicleId)
        ? prevSelected.filter((id) => id !== vehicleId)
        : [...prevSelected, vehicleId]
    );
  };

  const doneSelection = () => {
    if (selectedVehicles.length === 0) {
      Alert.alert('No selection', 'Please select at least one vehicle before confirming.');
    } else {
      const pickupTime = new Date().toLocaleTimeString(); 
      const venue = 'Vehicle Pickup Location: QuickRent Hub-Moratuwa'; 
      setPickupDetails({ pickupTime, venue });
      setIsSelectionConfirmed(true); 
    }
  };

  const renderVehicle = ({ item }) => {
    const isFavorite = favorites.includes(item.id);
    const isSelected = selectedVehicles.includes(item.id);

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <Text style={styles.title}>{item.make}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
          <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? 'red' : 'grey'} />
        </TouchableOpacity>
        
        {/* Add selection option for vehicle */}
        <TouchableOpacity onPress={() => toggleSelection(item.id)} style={styles.selectButton}>
          <Text style={styles.selectButtonText}>{isSelected ? 'Deselect' : 'Select for Rent'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header2}>Welcome, {userName || 'User'}</Text>
      </View>
      <Text style={styles.header1}>Available Vehicles</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0288d1" />
          <Text style={styles.loadingText}>Loading vehicles...</Text>
        </View>
      ) : (
        <FlatList data={vehicles} renderItem={renderVehicle} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.list} />
      )}

      {/* Show selected vehicles count */}
      {selectedVehicles.length > 0 && !isSelectionConfirmed && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>Selected Vehicles for Rent: {selectedVehicles.length}</Text>
        </View>
      )}

      {/* Done button to confirm selection */}
      {!isSelectionConfirmed && selectedVehicles.length > 0 && (
        <TouchableOpacity onPress={doneSelection} style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      )}

      {/* Show pickup details if selection is confirmed */}
      {isSelectionConfirmed && pickupDetails && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>Your selection is confirmed!</Text>
          <Text style={styles.confirmationText}>Pickup Time: {pickupDetails.pickupTime}</Text>
          <Text style={styles.confirmationText}>Venue: {pickupDetails.venue}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaf3f3' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },

  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#66697d',
    marginLeft: 10,
  },
  header2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#07d1f5',
    marginLeft: 10,},

  list: { paddingHorizontal: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  image: { width: '100%', height: 150, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333', marginVertical: 10 },
  favoriteButton: { position: 'absolute', top: 10, right: 10 },
  selectButton: {
    backgroundColor: '#0288d1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0288d1',
  },
  doneButton: {
    backgroundColor: '#66697d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmationContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7636b5',
    marginBottom: 5,
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 18, color: '#bbb', marginTop: 10 },
});

export default HomeScreen;
