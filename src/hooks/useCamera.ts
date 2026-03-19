import { useState } from 'react';
import CameraService, { CapturedImage } from '../services/CameraService';

interface UseCameraOptions {
  onSuccess?: (image: CapturedImage) => void;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for camera operations
 * Handles permission requests and image capture
 */
export function useCamera(options?: UseCameraOptions) {
  const [image, setImage] = useState<CapturedImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const takePicture = async () => {
    try {
      setLoading(true);
      setError(null);

      const capturedImage = await CameraService.captureImage();

      if (capturedImage) {
        setImage(capturedImage);
        options?.onSuccess?.(capturedImage);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown camera error');
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const takePictureWithOptions = async (cameraOptions: {
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const capturedImage = await CameraService.captureImageWithOptions(cameraOptions);

      if (capturedImage) {
        setImage(capturedImage);
        options?.onSuccess?.(capturedImage);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown camera error');
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const pickFromGallery = async () => {
    try {
      setLoading(true);
      setError(null);

      const pickedImage = await CameraService.pickImageFromGallery();

      if (pickedImage) {
        setImage(pickedImage);
        options?.onSuccess?.(pickedImage);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown gallery error');
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setError(null);
  };

  return {
    image,
    loading,
    error,
    takePicture,
    takePictureWithOptions,
    pickFromGallery,
    clearImage,
    imageUri: image?.uri || null,
  };
}

export default useCamera;
