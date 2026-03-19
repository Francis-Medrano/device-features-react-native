import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const DIMENSIONS = {
  // Device dimensions
  window: {
    width,
    height,
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },

  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Shadow
  shadow: {
    offset: { width: 0, height: 2 },
    opacity: 0.1,
    radius: 4,
  },

  // Padding/Margin
  padding: {
    container: 16,
    card: 20,
    screenVertical: 20,
    screenHorizontal: 20,
  },

  // Gap/spacing between items
  gap: {
    sm: 8,
    md: 12,
    lg: 16,
  },

  // Line height
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};
