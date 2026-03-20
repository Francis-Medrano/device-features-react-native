import { StyleSheet } from 'react-native';
import { COLORS } from './globalStyles';
import { DIMENSIONS } from './dimensions';

export const addEntryScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBg,
  },
  scrollContent: {
    padding: DIMENSIONS.padding.screenHorizontal,
    paddingBottom: DIMENSIONS.spacing.xl,
  },
  form: {
    gap: DIMENSIONS.gap.lg,
  },
  label: {
    fontSize: DIMENSIONS.fontSize.md,
    fontWeight: DIMENSIONS.fontWeight.semibold,
    color: COLORS.white,
    marginBottom: DIMENSIONS.spacing.md,
  },
  input: {
    backgroundColor: COLORS.darkBgSecondary,
    borderRadius: DIMENSIONS.borderRadius.md,
    paddingHorizontal: DIMENSIONS.spacing.lg,
    paddingVertical: DIMENSIONS.spacing.md,
    color: COLORS.white,
    fontSize: DIMENSIONS.fontSize.md,
    borderWidth: 1,
    borderColor: COLORS.darkBorder,
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: DIMENSIONS.spacing.md,
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: DIMENSIONS.spacing.lg,
    borderRadius: DIMENSIONS.borderRadius.md,
    alignItems: 'center',
    marginTop: DIMENSIONS.spacing.xl,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontSize.md,
    fontWeight: DIMENSIONS.fontWeight.semibold,
  },
  cancelButton: {
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
  footer: {
    marginTop: DIMENSIONS.spacing.xl,
    paddingTop: DIMENSIONS.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.darkBorder,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: DIMENSIONS.fontSize.sm,
  },
});
