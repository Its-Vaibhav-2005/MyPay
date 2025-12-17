// styles/create.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { scale, verticalScale, moderateScale } from "../../lib/responsive";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: COLORS.text,
  },
  backButton: {
    padding: moderateScale(5),
  },
  saveButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButton: {
    fontSize: moderateScale(16),
    color: COLORS.primary,
    fontWeight: "600",
  },
  card: {
    backgroundColor: COLORS.card,
    margin: moderateScale(16),
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 3,
  },
  typeSelector: {
    flexDirection: "row",
    marginBottom: verticalScale(20),
    gap: scale(10),
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(25),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeIcon: {
    marginRight: scale(8),
  },
  typeButtonText: {
    color: COLORS.text,
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
  typeButtonTextActive: {
    color: COLORS.white,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: verticalScale(16),
    marginBottom: verticalScale(20),
  },
  currencySymbol: {
    fontSize: moderateScale(32),
    fontWeight: "bold",
    color: COLORS.text,
    marginRight: scale(8),
  },
  amountInput: {
    flex: 1,
    fontSize: moderateScale(36),
    fontWeight: "bold",
    color: COLORS.text,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    padding: moderateScale(4),
    marginBottom: verticalScale(20),
    backgroundColor: COLORS.white,
  },
  inputIcon: {
    marginHorizontal: scale(12),
  },
  input: {
    flex: 1,
    padding: moderateScale(12),
    fontSize: moderateScale(16),
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: verticalScale(15),
    marginTop: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  categoryGrid: {
    flexDirection: "row",
    gap: scale(10),
  },
  masonryColumn: {
    flex: 1,
    gap: verticalScale(10),
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryIcon: {
    marginRight: scale(6),
  },
  categoryButtonText: {
    color: COLORS.text,
    fontSize: moderateScale(14),
  },
  categoryButtonTextActive: {
    color: COLORS.white,
  },
  loadingContainer: {
    padding: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
});