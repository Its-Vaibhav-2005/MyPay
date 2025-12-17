// styles/auth.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { scale, verticalScale, moderateScale } from "../../lib/responsive";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: moderateScale(20),
    justifyContent: "center",
  },
  illustration: {
    height: verticalScale(310),
    width: scale(300),
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: "bold",
    color: COLORS.text,
    marginVertical: verticalScale(15),
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: moderateScale(16),
    color: COLORS.text,
  },
  errorInput: {
    borderColor: COLORS.expense,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    alignItems: "center",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  buttonText: {
    color: COLORS.white,
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
  },
  footerText: {
    color: COLORS.text,
    fontSize: moderateScale(16),
  },
  linkText: {
    color: COLORS.primary,
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  verificationContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  verificationTitle: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: verticalScale(20),
    textAlign: "center",
  },
  verificationInput: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: moderateScale(16),
    color: COLORS.text,
    width: "100%",
    textAlign: "center",
    letterSpacing: scale(2),
  },

  // 🔴 Error styles
  errorBox: {
    backgroundColor: "#FFE5E5",
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    borderLeftWidth: 4,
    borderLeftColor: COLORS.expense,
    marginBottom: verticalScale(16),
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  errorText: {
    color: COLORS.text,
    marginLeft: scale(8),
    flex: 1,
    fontSize: moderateScale(14),
  },
});