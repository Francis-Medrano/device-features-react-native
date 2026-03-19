import { StyleSheet } from 'react-native';
import { COLORS } from './globalStyles';
import { DIMENSIONS } from './dimensions';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBg,
  },
  scrollContent: {
    paddingBottom: DIMENSIONS.spacing.xxxl,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: DIMENSIONS.spacing.xl,
    paddingHorizontal: DIMENSIONS.padding.screenHorizontal,
    marginBottom: DIMENSIONS.spacing.xxxl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: DIMENSIONS.gap.lg,
  },
  title: {
    fontSize: DIMENSIONS.fontSize.xxl,
    fontWeight: DIMENSIONS.fontWeight.bold,
    color: COLORS.white,
    marginBottom: DIMENSIONS.spacing.md,
  },
  subtitle: {
    fontSize: DIMENSIONS.fontSize.md,
    color: COLORS.primaryLight,
  },
  addButton: {
    backgroundColor: COLORS.white,
    paddingVertical: DIMENSIONS.spacing.sm,
    paddingHorizontal: DIMENSIONS.spacing.lg,
    borderRadius: DIMENSIONS.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: COLORS.primary,
    fontSize: DIMENSIONS.fontSize.md,
    fontWeight: DIMENSIONS.fontWeight.semibold,
  },
  cardsContainer: {
    paddingHorizontal: DIMENSIONS.padding.container,
    gap: DIMENSIONS.gap.lg,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: DIMENSIONS.borderRadius.lg,
    padding: DIMENSIONS.padding.card,
    shadowColor: '#000',
    shadowOffset: DIMENSIONS.shadow.offset,
    shadowOpacity: DIMENSIONS.shadow.opacity,
    shadowRadius: DIMENSIONS.shadow.radius,
    elevation: 3,
  },
  cardTitle: {
    fontSize: DIMENSIONS.fontSize.lg,
    fontWeight: DIMENSIONS.fontWeight.semibold,
    color: COLORS.text,
    marginBottom: DIMENSIONS.spacing.md,
  },
  cardDescription: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.textMuted,
    marginBottom: DIMENSIONS.spacing.lg,
    lineHeight: DIMENSIONS.fontSize.md * DIMENSIONS.lineHeight.normal,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: DIMENSIONS.spacing.sm,
    paddingHorizontal: DIMENSIONS.spacing.lg,
    borderRadius: DIMENSIONS.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontSize.sm,
    fontWeight: DIMENSIONS.fontWeight.semibold,
  },
  footer: {
    marginTop: DIMENSIONS.spacing.xxxl,
    paddingHorizontal: DIMENSIONS.padding.screenHorizontal,
    alignItems: 'center',
  },
  footerText: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
