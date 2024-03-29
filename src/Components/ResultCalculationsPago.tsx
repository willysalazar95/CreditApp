import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatoFecha, formatoMonedaPeruana } from "../utils/utils";

interface Props {
	nMontoCredito: number;
	nSaldoPendiente: number;
	nMontoInteres: number;
	nNuevoSaldo: number;
	nCantCuotas: number;
	nProxCuota: number;
	cModalidadPago: string;
	errorMessage: string;
	dCronoFechaVencimiento: string;
	nPagoCuota: number;
	nMontoPagado: number;
}

export default function ResultCalculations({
	nMontoCredito,
	nSaldoPendiente,
	nMontoInteres,
	nNuevoSaldo,
	nCantCuotas,
	nProxCuota,
	cModalidadPago,
	errorMessage,
	dCronoFechaVencimiento,
	nPagoCuota,
	nMontoPagado,
}: Props) {
	// console.log(props)
	return (
		<View style={styles.content}>
			{/* <View style={styles.boxResult}>
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
						</View> */}
			<View style={styles.boxResult}>
				<Text style={styles.title}>Crédito</Text>

				<DataResult
					title="Monto prestado:"
					value={formatoMonedaPeruana(nMontoCredito)}
				/>
				<DataResult
					title="Intereses:"
					value={formatoMonedaPeruana(nMontoInteres)}
				/>
				<View style={styles.hr} />
				<DataResult
					title="Total a Pagar:"
					value={formatoMonedaPeruana(nMontoCredito + nMontoInteres)}
				/>

				{/* <DataResult
								title="Nuevo saldo :"
								value={formatoMonedaPeruana(nNuevoSaldo)}
							/> */}
				<DataResult
					title="Total cuotas pagadas :"
					value={`${nProxCuota - 1} de ${nCantCuotas}`}
				/>
				<DataResult title="Modalidad de cobro :" value={`${cModalidadPago}`} />
			</View>
			<View style={styles.boxResult}>
				<Text style={styles.title}>{`Pagar Cuota ${nProxCuota}`}</Text>
				<DataResult
					title="Fecha Última Pago:"
					value={formatoFecha(dCronoFechaVencimiento)}
				/>
				<DataResult title="Pago Cuota:" value={formatoMonedaPeruana(nPagoCuota)} />
				<DataResult
					title="Próximo Saldo:"
					value={formatoMonedaPeruana(nSaldoPendiente)}
				/>
				<DataResult
					title="Total Pagado:"
					value={formatoMonedaPeruana(nMontoPagado)}
				/>
			</View>

			{/* <View>
				<Text style={styles.error}>{errorMessage}</Text>
			</View> */}
		</View>
	);
}

function DataResult(props: any) {
	const { title, value } = props;
	return (
		<View style={styles.value}>
			<Text style={styles.dato}>{title}</Text>
			<Text style={styles.dato2}>{value}</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	content: {
		paddingHorizontal: 20,
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
		marginBottom: 10,
	},
	title: {
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
		fontSize: 16,
	},
	dato2: {
		color: "gray",
		fontSize: 16,
	},
	value: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 7,
	},
	hr: {
		borderBottomColor: "gray",
		borderBottomWidth: 1,
		marginVertical: 5,
	},
});
