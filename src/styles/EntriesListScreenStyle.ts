import { StyleSheet } from 'react-native';
import { COLORS } from './globalStyles';
import { DIMENSIONS } from './dimensions';

export const entriesListScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBg,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: DIMENSIONS.spacing.xl,
    paddingHorizontal: DIMENSIONS.padding.screenHorizontal,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: DIMENSIONS.fontSize.xxl,
    fontWeight: DIMENSIONS.fontWeight.bold,
    color: COLORS.white,
    marginBottom: DIMENSIONS.spacing.xs,
  },
  subtitle: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.primaryLight,
  },
  addButton: {
    backgroundColor: COLORS.white,
    paddingVertical: DIMENSIONS.spacing.md,
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
  listContent: {
    padding: DIMENSIONS.padding.container,
    paddingTop: DIMENSIONS.spacing.lg,
  },
  entryCard: {
    backgroundColor: COLORS.darkBgSecondary,
    borderRadius: DIMENSIONS.borderRadius.md,
    padding: DIMENSIONS.padding.card,
    marginBottom: DIMENSIONS.gap.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  entryTitle: {
    fontSize: DIMENSIONS.fontSize.lg,
    fontWeight: DIMENSIONS.fontWeight.semibold,
    color: COLORS.white,
    marginBottom: DIMENSIONS.spacing.sm,
  },
  entryDescription: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.textMuted,
    marginBottom: DIMENSIONS.spacing.md,
    lineHeight: DIMENSIONS.fontSize.sm * DIMENSIONS.lineHeight.normal,
  },
  entryDate: {
    fontSize: DIMENSIONS.fontSize.xs,
    color: COLORS.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: DIMENSIONS.padding.screenHorizontal,
  },
  emptyText: {
    fontSize: DIMENSIONS.fontSize.lg,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontWeight: DIMENSIONS.fontWeight.semibold,
    marginBottom: DIMENSIONS.spacing.md,
  },
  emptySubtext: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
