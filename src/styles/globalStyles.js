import { StyleSheet } from "react-native";

const colors = {
  primary: "#871EFF", // Main purple color
  secondary: "#80C7F5", // Light blue color
  accent: "#FCAC98", // Peach color
  background: "#FFFFFF", // White background
  text: "#333333", // Dark text color
  border: "#CCCCCC", // Light gray for borders
  white: "#FFFFFF",
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: colors.text,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: colors.secondary,
    marginTop: 15,
    textAlign: "center",
  },
});

export { colors, globalStyles };
