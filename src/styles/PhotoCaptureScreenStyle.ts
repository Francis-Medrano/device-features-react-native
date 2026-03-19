import { StyleSheet } from 'react-native';
import { COLORS } from './globalStyles';
import { DIMENSIONS } from './dimensions';

export const photoCaptureScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBg,
  },
  scrollContent: {
    padding: DIMENSIONS.padding.screenHorizontal,
    paddingBottom: DIMENSIONS.spacing.xl,
  },
  header: {
    marginBottom: DIMENSIONS.spacing.xl,
  },
  headerTitle: {
    fontSize: DIMENSIONS.fontSize.xl,
    fontWeight: DIMENSIONS.fontWeight.bold,
    color: COLORS.white,
    marginBottom: DIMENSIONS.spacing.sm,
  },
  photoSection: {
    marginBottom: DIMENSIONS.spacing.xl,
  },
  photoContainer: {
    backgroundColor: COLORS.darkBgSecondary,
    borderRadius: DIMENSIONS.borderRadius.lg,
    overflow: 'hidden',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DIMENSIONS.spacing.lg,
    borderWidth: 2,
    borderColor: COLORS.darkBorder,
    borderStyle: 'dashed',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoPlaceholder: {
    fontSize: DIMENSIONS.fontSize.md,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  takePictureButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: DIMENSIONS.spacing.lg,
    borderRadius: DIMENSIONS.borderRadius.md,
    alignItems: 'center',
    marginBottom: DIMENSIONS.spacing.lg,
  },
  takePictureButtonText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontSize.md,
    fontWeight: DIMENSIONS.fontWeight.semibold,
  },
  removePictureButton: {
    backgroundColor: COLORS.darkBorder,
    paddingVertical: DIMENSIONS.spacing.md,
    borderRadius: DIMENSIONS.borderRadius.md,
    alignItems: 'center',
  },
  removePictureButtonText: {
    color: COLORS.textLight,
    fontSize: DIMENSIONS.fontSize.sm,
    fontWeight: DIMENSIONS.fontWeight.semibold,
  },
  addressSection: {
    marginBottom: DIMENSIONS.spacing.xl,
  },
  sectionLabel: {
    fontSize: DIMENSIONS.fontSize.md,
    fontWeight: DIMENSIONS.fontWeight.semibold,
    color: COLORS.white,
    marginBottom: DIMENSIONS.spacing.md,
  },
  addressContainer: {
    backgroundColor: COLORS.darkBgSecondary,
    borderRadius: DIMENSIONS.borderRadius.md,
    padding: DIMENSIONS.padding.card,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    minHeight: 100,
    justifyContent: 'center',
  },
  addressText: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.white,
    lineHeight: DIMENSIONS.fontSize.sm * DIMENSIONS.lineHeight.relaxed,
    fontWeight: DIMENSIONS.fontWeight.medium,
  },
  loadingText: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: DIMENSIONS.gap.lg,
    marginTop: DIMENSIONS.spacing.xl,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: DIMENSIONS.spacing.lg,
    borderRadius: DIMENSIONS.borderRadius.md,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontSize.md,
    fontWeight: DIMENSIONS.fontWeight.semibold,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.darkBorder,
    paddingVertical: DIMENSIONS.spacing.lg,
    borderRadius: DIMENSIONS.borderRadius.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontSize.md,
    fontWeight: DIMENSIONS.fontWeight.semibold,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
