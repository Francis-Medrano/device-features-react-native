import { ThemeType } from '../contexts/ThemeContext';
import { getThemeColors, ColorScheme } from './themes';

export const getThemeAwareStyles = (theme: ThemeType) => {
  const colors = getThemeColors(theme);

  return {
    container: {
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.headerBackground,
    },
    title: {
      color: colors.white,
    },
    subtitle: {
      color: colors.primaryLight,
    },
    text: {
      color: colors.text,
    },
    textMuted: {
      color: colors.textMuted,
    },
    textLight: {
      color: colors.textLight,
    },
    textSecondary: {
      color: colors.textSecondary,
    },
    card: {
      backgroundColor: colors.backgroundSecondary,
    },
    border: {
      borderColor: colors.border,
    },
    placeholder: {
      color: colors.placeholder,
    },
  };
};
