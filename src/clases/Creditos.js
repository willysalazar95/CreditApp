import axios from "axios";
import { configData } from "../../config";
export class Creditos {
	static url = `${configData.API_URL}/api/Credito`;

	async ListarCreditos() {
		const BASE_URL = `${Creditos.url}/ListarCreditos`;
		try {
			const response = await axios.get(BASE_URL, {
				params: {
					nIdPers: 0,
				},
			});

			const Resp = response.data.code;
			const Lista = response.data.data;

			if (Resp === 200) {
				return { success: true, data: Lista };
			} else {
				return { success: false, error: "Datos incorrectos" };
			}
		} catch (error) {
			return { success: false, error: error.message };
		}
	}

	async RegistroCredito(
		nIdPers,
		dFechaCred,
		nIdPeriodo,
		nMonto,
		nInteres,
		nCuotas
	) {
		const BASE_URL = `${Creditos.url}/RegistrarCredito`;
		try {
			const response = await axios({
				method: "post",
				url: BASE_URL,
				params: {
					nIdPers: nIdPers,
					dFechaCred: dFechaCred,
					nIdPeriodo: nIdPeriodo,
					nMonto: nMonto,
					nInteres: nInteres,
					nCuotas: nCuotas,
				},
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 5000,
				withCredentials: true,
				responseType: "json",
			});

			const Resp = response.data.code;
			const Lista = response.data.data;
			// console.log(Lista);
			if (Resp == 200) {
				return { success: true, data: Lista[0] };
			} else {
				return { success: false, error: Resp + " " + response.data.error.message };
			}
		} catch (error) {
			return { success: false, error: error.message };
		}
	}

	async RegistroCreditoPago(nIdCredigo, nMonto) {
		const BASE_URL = `${Creditos.url}/RegistrarCreditoPago`;
		try {
			const response = await axios({
				method: "post",
				url: BASE_URL,
				params: {
					nIdCredigo: nIdCredigo,
					nMonto: nMonto,
				},
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 5000,
				withCredentials: true,
				responseType: "json",
			});

			const Resp = response.data.code;
			const Lista = response.data.data;
			// console.log(Lista);
			if (Resp == 200) {
				return { success: true, data: Lista };
			} else {
				return { success: false, error: Resp + " " + response.data.error.message };
			}
		} catch (error) {
			return { success: false, error: error.message };
		}
	}

	async ListarCreditosPeriodos() {
		const BASE_URL = `${Creditos.url}/ListarCreditosPeriodo`;
		try {
			const response = await axios.get(BASE_URL);

			const Resp = response.data.code;
			const Lista = response.data.data;
			if (Resp === 200) {
				return { success: true, data: Lista };
			} else {
				return { success: false, error: "Datos incorrectos" };
			}
		} catch (error) {
			return { success: false, error: error.message };
		}
	}
}
