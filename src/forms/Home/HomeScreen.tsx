import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Touchable from "react-native-platform-touchable";
import Icon from "react-native-vector-icons/Ionicons";
// import { configData } from "../../../config";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.ContenedorPrincipal}>
        <View style={styles.CajaContenedor}>
          <Touchable style={styles.widgets1}>
            <View style={styles.ContenedorWidget}>
              <Icon name="person-outline" size={70} color="#FFF"></Icon>
              {/* <Text style={styles.TotalTitle}> 2023</Text> */}
              <Text style={styles.DetalleTitle}>CLIENTE</Text>
            </View>
          </Touchable>

          <Touchable style={styles.widgets2}>
            <View style={styles.ContenedorWidget}>
              <Icon name="cash-outline" size={70} color="#FFF"></Icon>
              {/* <Text style={styles.TotalTitle}> 2023</Text> */}
              <Text style={styles.DetalleTitle}>CREDITO</Text>
            </View>
          </Touchable>
        </View>

        <View style={styles.CajaContenedor}>
          <Touchable style={styles.widgets3}>
            <View style={styles.ContenedorWidget}>
              <Icon name="card-outline" size={70} color="#FFF"></Icon>
              {/* <Text style={styles.TotalTitle}> 2023</Text> */}
              <Text style={styles.DetalleTitle}>PAGO </Text>
            </View>
          </Touchable>

          <Touchable style={styles.widgets4}>
            <View style={styles.ContenedorWidget}>
              <Icon name="lock-closed-outline" size={70} color="#FFF"></Icon>
              {/* <Text style={styles.TotalTitle}> 2023</Text> */}
              <Text style={styles.DetalleTitle}>CIERRE</Text>
            </View>
          </Touchable>
        </View>

        <View style={styles.CajaContenedor}>
          <Touchable style={styles.widgets5}>
            <View style={styles.ContenedorWidget}>
              <Icon name="calculator-outline" size={70} color="#FFF"></Icon>
              {/* <Text style={styles.TotalTitle}> 2023</Text> */}
              <Text style={styles.DetalleTitle}>FLEX</Text>
            </View>
          </Touchable>

          <Touchable style={styles.widgets6}>
            <View style={styles.ContenedorWidget}>
              <Icon name="print-outline" size={70} color="#FFF"></Icon>
              {/* <Text style={styles.TotalTitle}> 2023</Text> */}
              <Text style={styles.DetalleTitle}>IMPRIMIR</Text>
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ContenedorPrincipal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  CajaContenedor: {
    flex: 1,
    flexDirection: "row",
    height: 120,
    marginTop: 15,
    marginBottom: 15,
  },
  widgets1: {
    backgroundColor: "#5cb85c",
    elevation: 2,
    width: "44%",
    marginLeft: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  widgets2: {
    backgroundColor: "#50E3C2",
    elevation: 2,
    width: "44%",
    marginLeft: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  widgets3: {
    backgroundColor: "#9013FE",
    elevation: 2,
    width: "44%",
    marginLeft: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  widgets4: {
    backgroundColor: "#F44336",
    elevation: 2,
    width: "44%",
    marginLeft: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  widgets5: {
    backgroundColor: "#5C6BC0",
    elevation: 2,
    width: "44%",
    marginLeft: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  widgets6: {
    backgroundColor: "#FF9800",
    elevation: 2,
    width: "44%",
    marginLeft: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  ContenedorWidget: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  //   TotalTitle: {
  //     fontSize: 24,
  //     fontWeight: "bold",
  //     color: "#FFF",
  //     textAlign: "right",
  //   },
  DetalleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFF",
    marginRight: 5,
  },
});
export default HomeScreen;
