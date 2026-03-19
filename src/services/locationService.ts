import * as Location from 'expo-location';
import { Alert } from 'react-native';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
}

export interface LocationAddress {
  formattedAddress: string;
  street?: string;
  streetNumber?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  district?: string;
  timezone?: string;
}

export interface CurrentLocation extends LocationCoordinates {
  address?: LocationAddress;
}

class LocationService {
  /**
   * Request foreground location permissions
   */
  static async requestLocationPermissions(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Denied',
          'Location permission is required to display your location. Please enable it in settings.',
          [{ text: 'OK' }]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      throw new Error('Failed to request location permissions');
    }
  }

  /**
   * Check if location permissions are granted
   */
  static async checkLocationPermissions(): Promise<boolean> {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error checking location permissions:', error);
      return false;
    }
  }

  /**
   * Get current device location
   */
  static async getCurrentLocation(
    includeAddress: boolean = false
  ): Promise<CurrentLocation | null> {
    try {
      const hasPermission = await this.checkLocationPermissions();

      if (!hasPermission) {
        const granted = await this.requestLocationPermissions();
        if (!granted) {
          return null;
        }
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords: LocationCoordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy || undefined,
        altitude: location.coords.altitude || undefined,
      };

      if (includeAddress) {
        const address = await this.reverseGeocode(coords);
        return {
          ...coords,
          address,
        };
      }

      return coords;
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  /**
   * Convert coordinates to readable address
   */
  static async reverseGeocode(
    coordinates: LocationCoordinates
  ): Promise<LocationAddress | null> {
    try {
      const geocodeResult = await Location.reverseGeocodeAsync({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });

      if (geocodeResult.length === 0) {
        return {
          formattedAddress: `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`,
        };
      }

      const result = geocodeResult[0];

      const addressParts: string[] = [];

      if (result.street || result.streetNumber) {
        addressParts.push(`${result.street || ''} ${result.streetNumber || ''}`.trim());
      }

      if (result.city) {
        addressParts.push(result.city);
      }

      if (result.region) {
        addressParts.push(result.region);
      }

      if (result.postalCode) {
        addressParts.push(result.postalCode);
      }

      if (result.country) {
        addressParts.push(result.country);
      }

      const formattedAddress = addressParts.filter(Boolean).join(', ');

      return {
        formattedAddress,
        street: result.street,
        streetNumber: result.streetNumber,
        city: result.city,
        region: result.region,
        postalCode: result.postalCode,
        country: result.country,
        district: result.district,
        timezone: result.timezone,
      };
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return null;
    }
  }

  /**
   * Get formatted address from coordinates
   */
  static async getFormattedAddress(
    coordinates: LocationCoordinates
  ): Promise<string> {
    const address = await this.reverseGeocode(coordinates);
    return address?.formattedAddress || 'Address not available';
  }

  /**
   * Get detailed address object from current location
   */
  static async getCurrentLocationWithAddress(): Promise<CurrentLocation | null> {
    return this.getCurrentLocation(true);
  }

  /**
   * Format address into different styles
   */
  static formatAddress(
    address: LocationAddress,
    style: 'full' | 'short' | 'multiline' = 'full'
  ): string {
    switch (style) {
      case 'short':
        return `${address.city}, ${address.region}`;

      case 'multiline':
        const lines: string[] = [];
        if (address.street || address.streetNumber) {
          lines.push(`${address.street || ''} ${address.streetNumber || ''}`.trim());
        }
        if (address.city || address.region) {
          const cityRegion = `${address.city || ''}, ${address.region || ''}`.trim();
          if (cityRegion) lines.push(cityRegion);
        }
        if (address.postalCode) {
          lines.push(address.postalCode);
        }
        if (address.country) {
          lines.push(address.country);
        }
        return lines.filter(Boolean).join('\n');

      case 'full':
      default:
        return address.formattedAddress;
    }
  }

  /**
   * Calculate distance between two coordinates (in kilometers)
   */
  static calculateDistance(
    coord1: LocationCoordinates,
    coord2: LocationCoordinates
  ): number {
    const R = 6371;
    const dLat = this.toRad(coord2.latitude - coord1.latitude);
    const dLon = this.toRad(coord2.longitude - coord1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(coord1.latitude)) *
        Math.cos(this.toRad(coord2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

export default LocationService;
