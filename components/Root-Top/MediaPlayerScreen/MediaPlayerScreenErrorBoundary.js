import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class MediaPlayerScreenErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleBack = () => {
    this.setState({ hasError: false });
    this.props.onBack?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>Something went wrong.</Text>
          <TouchableOpacity style={styles.backBtn} onPress={this.handleBack}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  message: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  backBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
