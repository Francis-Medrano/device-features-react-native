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
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: DIMENSIONS.borderRadius.md,
    marginBottom: DIMENSIONS.spacing.md,
  },
  cardLocation: {
    marginBottom: DIMENSIONS.spacing.md,
  },
  cardLocationText: {
    color: COLORS.textSecondary,
    fontSize: DIMENSIONS.fontSize.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  emptyText: {
    fontSize: DIMENSIONS.fontSize.lg,
    color: COLORS.textSecondary,
    marginBottom: DIMENSIONS.spacing.md,
  },
  emptySubtext: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  flatListContent: {
    paddingHorizontal: DIMENSIONS.spacing.md,
    paddingVertical: DIMENSIONS.spacing.md,
    flexGrow: 1,
  },
  removeButton: {
    backgroundColor: COLORS.error || '#FF6B6B',
    paddingVertical: DIMENSIONS.spacing.sm,
    paddingHorizontal: DIMENSIONS.spacing.lg,
    borderRadius: DIMENSIONS.borderRadius.md,
    alignItems: 'center',
    marginTop: DIMENSIONS.spacing.md,
  },
  removeButtonText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontSize.sm,
    fontWeight: DIMENSIONS.fontWeight.semibold,
  },
});
