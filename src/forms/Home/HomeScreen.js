import React from "react";
import { Text, View } from "react-native";
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>Flex</Text> */}
    </View>
  );
}
export default HomeScreen;

// import { StatusBar } from "expo-status-bar";
// import { useNavigation } from "@react-navigation/native";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";

// export default function Home() {
//   const navigation = useNavigation();

//   const goToPrestamos = () => {
//     navigation.navigate("prestamos");
//   };

//   const goToPersonas = () => {
//     navigation.navigate("ListarPersonas");
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.container}>
//         <View style={styles.containers}>
//           <TouchableOpacity style={styles.box} onPress={goToPersonas}>
//             <Icon
//               name="user"
//               backgroundColor="02cbef"
//               size={90}
//               color="#007299"
//               style={styles.inner}
//             ></Icon>
//             <Text style={styles.texto}>Clientes</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.box} onPress={goToPrestamos}>
//             <Icon
//               name="calculator"
//               backgroundColor="02cbef"
//               size={90}
//               color="#007299"
//               style={styles.inner}
//             ></Icon>
//             <Text style={styles.texto}>Prestamos</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.box}>
//             <Icon
//               name="money"
//               backgroundColor="02cbef"
//               size={90}
//               color="#007299"
//               style={styles.inner}
//             ></Icon>
//             <Text style={styles.texto}>Pagos</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.box}>
//             <Icon
//               name="print"
//               backgroundColor="02cbef"
//               size={90}
//               color="#007299"
//               style={styles.inner}
//             ></Icon>
//             <Text style={styles.texto}>Imprimir</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.box}>
//             <Icon
//               name="clock-o"
//               backgroundColor="02cbef"
//               size={90}
//               color="#007299"
//               style={styles.inner}
//             ></Icon>
//             <Text style={styles.texto}>Cierre</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.box}>
//             <Icon
//               name="external-link"
//               backgroundColor="02cbef"
//               size={90}
//               color="#007299"
//               style={styles.inner}
//             ></Icon>
//             <Text style={styles.texto}>Flex</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.box}>
//             <Icon
//               name="cog"
//               backgroundColor="02cbef"
//               size={90}
//               color="#007299"
//               style={styles.inner}
//             ></Icon>
//             <Text style={styles.texto}>Configuracion</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ebebeb",
//   },
//   containers: {
//     width: "100%",
//     height: "85%",
//     padding: 5,
//     flexDirection: "column",
//     flexWrap: "wrap",
//   },
//   box: {
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     width: "50%",
//     height: "24%",
//     padding: 10,
//   },
//   texto: {
//     fontSize: 20,
//     textAlign: "center",
//     color: "black",
//     fontWeight: "bold",
//     marginTop: -50,
//   },
//   inner: {
//     flex: 1,
//     flexDirection: "column-reverse",
//     flexWrap: "wrap",
//     backgroundColor: "#fff",
//     paddingTop: 10,
//     marginTop: 20,
//     textAlign: "center",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 1,
//   },
//   header: {
//     backgroundColor: "#007299",
//     height: 80,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerText: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   scrollView: {
//     flex: 1,
//     marginTop: 10,
//   },
// });
