import { StyleSheet } from 'react-native';
import { COLORS } from './globalStyles';
import { DIMENSIONS } from './dimensions';

export const entryDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBg,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.darkBgSecondary,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    backgroundColor: COLORS.darkBgSecondary,
    borderTopLeftRadius: DIMENSIONS.borderRadius.lg,
    borderTopRightRadius: DIMENSIONS.borderRadius.lg,
    padding: DIMENSIONS.padding.container,
    marginTop: -DIMENSIONS.borderRadius.lg,
    paddingTop: DIMENSIONS.padding.container + DIMENSIONS.borderRadius.lg,
  },
  title: {
    fontSize: DIMENSIONS.fontSize.xxl,
    fontWeight: DIMENSIONS.fontWeight.bold,
    color: COLORS.white,
    marginBottom: DIMENSIONS.spacing.md,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMENSIONS.spacing.sm,
    marginBottom: DIMENSIONS.spacing.lg,
  },
  date: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.textMuted,
  },
  section: {
    marginBottom: DIMENSIONS.spacing.lg,
  },
  sectionTitle: {
    fontSize: DIMENSIONS.fontSize.md,
    fontWeight: DIMENSIONS.fontWeight.semibold,
    color: COLORS.white,
    marginBottom: DIMENSIONS.spacing.md,
  },
  description: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.textMuted,
    lineHeight: DIMENSIONS.fontSize.sm * DIMENSIONS.lineHeight.relaxed,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMENSIONS.spacing.sm,
    marginBottom: DIMENSIONS.spacing.md,
  },
  locationBox: {
    backgroundColor: COLORS.darkBg,
    borderRadius: DIMENSIONS.borderRadius.md,
    padding: DIMENSIONS.padding.card,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B6B',
  },
  locationText: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.white,
    marginBottom: DIMENSIONS.spacing.sm,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: DIMENSIONS.borderRadius.md,
    paddingVertical: DIMENSIONS.spacing.md,
    paddingHorizontal: DIMENSIONS.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: DIMENSIONS.spacing.sm,
    marginTop: DIMENSIONS.spacing.xl,
    marginBottom: DIMENSIONS.spacing.xl,
  },
  deleteButtonPressed: {
    opacity: 0.8,
  },
  deleteButtonDisabled: {
    opacity: 0.6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: DIMENSIONS.fontSize.md,
    fontWeight: DIMENSIONS.fontWeight.semibold,
  },
  errorText: {
    fontSize: DIMENSIONS.fontSize.lg,
    textAlign: 'center',
    marginTop: DIMENSIONS.spacing.xl,
  },
});
