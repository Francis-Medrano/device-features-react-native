import { useState, useEffect } from 'react';
import LocationService, {
  LocationCoordinates,
  LocationAddress,
  CurrentLocation,
} from '../services/locationService';

interface UseLocationOptions {
  watchPosition?: boolean;
  includeAddress?: boolean;
  onSuccess?: (location: CurrentLocation) => void;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for location operations
 * Handles permissions and coordinate to address conversion
 */
export function useLocation(options?: UseLocationOptions) {
  const [location, setLocation] = useState<CurrentLocation | null>(null);
  const [address, setAddress] = useState<LocationAddress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Get current location on mount
  useEffect(() => {
    if (!options?.watchPosition) {
      getCurrentLocation();
    } else {
      startWatchingPosition();
    }
  }, [options?.watchPosition]);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const currentLocation = await LocationService.getCurrentLocation(
        options?.includeAddress ?? true
      );

      if (currentLocation) {
        setLocation(currentLocation);
        if (currentLocation.address) {
          setAddress(currentLocation.address);
        }
        options?.onSuccess?.(currentLocation);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown location error');
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const startWatchingPosition = async () => {
    try {
      setLoading(true);

      const subscription = await LocationService.getCurrentLocation(
        options?.includeAddress ?? true
      )
        .then((loc) => {
          if (loc) {
            setLocation(loc);
            if (loc.address) {
              setAddress(loc.address);
            }
            options?.onSuccess?.(loc);
          }
          setLoading(false);
          return null;
        })
        .catch((err) => {
          const error = err instanceof Error ? err : new Error('Unknown location error');
          setError(error);
          options?.onError?.(error);
          setLoading(false);
          return null;
        });

      return subscription;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown location error');
      setError(error);
      options?.onError?.(error);
      setLoading(false);
    }
  };

  const reverseGeocode = async (
    coordinates: LocationCoordinates
  ): Promise<LocationAddress | null> => {
    try {
      const addr = await LocationService.reverseGeocode(coordinates);
      if (addr) {
        setAddress(addr);
      }
      return addr;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Geocoding failed');
      setError(error);
      return null;
    }
  };

  const getFormattedAddress = (style: 'full' | 'short' | 'multiline' = 'full'): string => {
    if (!address) return 'No address available';
    return LocationService.formatAddress(address, style);
  };

  const calculateDistanceTo = (otherCoords: LocationCoordinates): number | null => {
    if (!location) return null;
    return LocationService.calculateDistance(location, otherCoords);
  };

  const refreshLocation = async () => {
    await getCurrentLocation();
  };

  return {
    location,
    address,
    loading,
    error,
    coordinates: location ? { latitude: location.latitude, longitude: location.longitude } : null,
    latitude: location?.latitude,
    longitude: location?.longitude,
    accuracy: location?.accuracy,
    altitude: location?.altitude,
    getCurrentLocation,
    reverseGeocode,
    getFormattedAddress,
    calculateDistanceTo,
    refreshLocation,
  };
}

export default useLocation;
