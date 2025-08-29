import type React from "react"
import { View, StyleSheet } from "react-native"

const MatrixBackground: React.FC = () => {
  return <View style={styles.container}>{/* Matrix lines would be rendered here */}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.02, // Updated opacity value
  },
  line: {
    position: "absolute",
    backgroundColor: "green",
    opacity: 0.02, // Updated opacity value
  },
})

export default MatrixBackground
