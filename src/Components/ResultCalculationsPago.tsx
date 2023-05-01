import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatoFecha } from "../utils/utils";

export default function ResultCalculations(props: any) {
	const {
		nMontoCredito,
		nSaldoPendiente,
		nNuevoSaldo,
		nCantCuotas,
		nProxCuota,
		cModalidadPago,
		errorMessage,
		dCronoFechaVencimiento,
	} = props;
	// console.log(props)
	return (
		<View style={styles.content}>
			{nSaldoPendiente == null || nSaldoPendiente == 0 ? (
				<View>
					<Text style={styles.tilecancelado}>EL PRESTAMO FUE CANCELADO</Text>
				</View>
			) : (
				nSaldoPendiente && (
					<View style={styles.boxResult}>
						<Text style={styles.tile}>Cronograma</Text>
						<DataResult
							title="Fecha Pago:"
							value={formatoFecha(dCronoFechaVencimiento)}
						/>
						<DataResult title="Monto prestado:" value={`S/.${nMontoCredito}`} />
						<DataResult title="Saldo anterior:" value={`S/.${nSaldoPendiente}`} />
						<DataResult title="Nuevo saldo :" value={`S/.${nNuevoSaldo}`} />
						<DataResult
							title="Próxima cuota :"
							value={`${nProxCuota}` + ` de ` + `${nCantCuotas}`}
						/>
						<DataResult title="Modalidad de cobro :" value={`${cModalidadPago}`} />
					</View>
				)
			)}
			<View>
				<Text style={styles.error}>{errorMessage}</Text>
			</View>
		</View>
	);
}

function DataResult(props: any) {
	const { title, value } = props;
	return (
		<View style={styles.value}>
			<Text style={styles.dato}>{title}</Text>
			<Text style={styles.dato}>{value}</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	content: {
		marginHorizontal: 13,
	},
	error: {
		textAlign: "center",
		color: "black",
	},
	boxResult: {
		backgroundColor: "#f8f8f8",
		padding: 20,
		borderRadius: 5,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	tile: {
		color: "black",
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 10,
	},

	tilecancelado: {
		top: 20,
		color: "black",
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
		bottom: 20,
	},

	dato: {
		color: "black",
		fontSize: 17,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 10,
	},
	value: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
