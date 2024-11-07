import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text,ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { useObra } from '../database/useObra';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const { list } = useObra();

  const loadAddressesWithCoordinates = useCallback(async () => {
    try {
      const { result } = await list();
      
      const validMarkers = result
        .filter((address) => address.latitude && address.longitude) // Filtra endereços com coordenadas válidas
        .map((address) => ({
          latitude: address.latitude,
          longitude: address.longitude,
          title: `${address.rua}, ${address.bairro}, ${address.cidade}`,
        }));
      

      setMarkers(validMarkers); // Atualiza os marcadores no estado
    } catch (error) {
      console.error('Erro ao carregar endereços do AsyncStorage', error);
    }
  }, []);

  const requestLocationAndLoadAddresses = useCallback(async () => {
    try {
      // Solicita permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização foi negada.');
        return;
      }

      // Obtém a localização atual
      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Carrega endereços do AsyncStorage e atualiza os marcadores
      await loadAddressesWithCoordinates();
    } catch (error) {
      console.error(
        'Erro ao solicitar localização ou carregar endereços:',
        error
      );
      setErrorMsg('Ocorreu um erro ao carregar a localização ou endereços.');
    }
  }, [loadAddressesWithCoordinates]);

  useFocusEffect(
    useCallback(() => {
      requestLocationAndLoadAddresses(); // Executa a função ao focar a tela
    }, [requestLocationAndLoadAddresses])
  );

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}>
          <Marker coordinate={location} title="Minha Localização" />
          {/* Exibe os marcadores no mapa */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
            />
          ))}
        </MapView>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center',flex:1}}>
        
        <ActivityIndicator size="large" color="#0000ff" style={styles.customSize} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  customSize: {
    transform: [{ scale: 2.5 }],
  }
});

export default MapScreen;
