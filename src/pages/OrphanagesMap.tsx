import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';
import mapMarkerBorder from '../images/map-marker-border.png';

export default function OrphanagesMap() {
  const navigation = useNavigation();

  function handleNavigationToOrphanageDetails() {
    navigation.navigate('OrphanageDetails');
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.9752102,
          longitude: -43.3746088,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        <Marker 
          icon={mapMarkerBorder}
          calloutAnchor={{
            x: 2.3,
            y: 0.8
          }}
          coordinate={{
            latitude: -22.9752102,
            longitude: -43.3746088
          }}
        >
          <Callout 
            tooltip={true}
            onPress={handleNavigationToOrphanageDetails}
            >
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar das meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>

        <TouchableOpacity style={styles.createOrphanageButton} 
          onPress={() => {}}
        >
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>      
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