import { ThemeType } from '../contexts/ThemeContext';

export interface ColorScheme {
  primary: string;
  primaryLight: string;
  secondary: string;
  background: string;
  backgroundSecondary: string;
  border: string;
  lightBg: string;
  white: string;
  text: string;
  textMuted: string;
  textLight: string;
  textSecondary: string;
  placeholder: string;
  error: string;
  headerBackground: string;
}

export const lightTheme: ColorScheme = {
  primary: '#6366f1',
  primaryLight: '#e0e7ff',
  secondary: '#007AFF',
  background: '#f5f5f5',
  backgroundSecondary: '#ffffff',
  border: '#e5e7eb',
  lightBg: '#f5f5f5',
  white: '#1a1a1a',
  text: '#1f2937',
  textMuted: '#6b7280',
  textLight: '#9ca3af',
  textSecondary: '#6b7280',
  placeholder: '#d1d5db',
  error: '#FF6B6B',
  headerBackground: '#e8e9ff',
};

export const darkTheme: ColorScheme = {
  primary: '#6366f1',
  primaryLight: '#e0e7ff',
  secondary: '#007AFF',
  background: '#1a1a1a',
  backgroundSecondary: '#2a2a2a',
  border: '#3a3a3a',
  lightBg: '#2a2a2a',
  white: '#ffffff',
  text: '#ffffff',
  textMuted: '#9ca3af',
  textLight: '#6b7280',
  textSecondary: '#9ca3af',
  placeholder: '#4b5563',
  error: '#FF6B6B',
  headerBackground: '#4f46e5',
};

export const getThemeColors = (theme: ThemeType): ColorScheme => {
  return theme === 'light' ? lightTheme : darkTheme;
};
