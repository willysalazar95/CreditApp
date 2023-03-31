import { formatCurrency } from "react-native-format-currency";

export const convertirFechaAAAAMMDD = (fecha: Date): string => {
	return fecha.toISOString().slice(0, 10).replace(/-/g, "");
};

export function formatoMonedaPeruana(moneda: number) {
	return "S/ " + moneda.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatoFecha(fecha: string): string {
	let fechaObj = new Date(fecha);
	let dia = fechaObj.getDate().toString().padStart(2, "0");
	let mes = (fechaObj.getMonth() + 1).toString().padStart(2, "0");
	let anio = fechaObj.getFullYear();
	return dia + "/" + mes + "/" + anio;
}

export function formatoTelefonoConCodigo(numero: string): string {
	let numeroFormateado = "";
	let longitud = numero.length;
	for (let i = 0; i < longitud; i++) {
		if (i == 0) {
			numeroFormateado += "+51 ";
		} else if (i == 3 || i == 6 || i == 9) {
			numeroFormateado += " ";
		}
		numeroFormateado += numero[i];
	}
	return numeroFormateado;
}
