import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import api from '../services/api';

import sessionConfig  from "react-native-config";

import mapImgMarker from '../images/map-marker.png';
import mapMarkerImgBorder from '../images/map-marker-border.png';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    sessionConfig.AtualizaMapaOrfanato = 'false';
    apiGetListOrphanages();
  }, []);

  useFocusEffect(() => {
    console.log(sessionConfig.AtualizaMapaOrfanato);
    if (sessionConfig.AtualizaMapaOrfanato == 'true') {
      sessionConfig.AtualizaMapaOrfanato = 'false';
      apiGetListOrphanages();
    }
  });

  function apiGetListOrphanages() {
    api.get('orphanages').then(response => {
      console.log(response); console.log(response.data);

      var data = [];
      if (!response.data.length) {
        data.push(response.data);
      } else {
        data = response.data;
      }
      setOrphanages(Array.from(data));
    })
    .catch(function (error) {
      console.log(error.response);
    });
  }

  function handleNavigationToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigationToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.97016855819092,
          longitude: -43.35986137390137,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012
        }}
        >
        {orphanages.map(orphanage => {
          return ( 
            <Marker 
              key={orphanage.id}
              icon={mapMarkerImgBorder}
              calloutAnchor={{
                x: 2.3,
                y: 0.8
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}
            >
              <Callout 
                tooltip={true}
                onPress={() => handleNavigationToOrphanageDetails(orphanage.id)}
                >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton style={styles.createOrphanageButton} 
          onPress={handleNavigationToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    justifyContent: 'center'
  },

  calloutText: {
    fontFamily: 'nunito700',
    color: '#0089a5',
    fontSize: 14
    // ,fontWeight: 'bold'
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    borderWidth: 1,
    borderColor: '#eee',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 1
  },

  footerText: {
    fontFamily: 'nunito700',
    color: '#8fa7b3'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
});